"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapelien = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
async function scrapelien() {
    function formatRow(headers, row) {
        if (!row) {
            console.log('also something');
            throw 'no row';
        }
        const columns = row.split("\n");
        console.log(columns, 'columns');
        const formattedRow = {};
        columns.forEach((column, index) => {
            console.log(column[index], 'individual column');
            formattedRow.headers[index] = column;
        });
        return formattedRow;
    }
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto("https://nuforc.org/subndx/?id=all");
    const selector = "tr";
    await page.waitForSelector(selector);
    const data = await page.evaluate((selector) => {
        const elements = Array.from(document.querySelectorAll(selector));
        return elements.map((element) => element.textContent);
    }, selector);
    await browser.close();
    const unformattedHeaders = data.shift();
    // console.log(data[0], 'data')
    if (!unformattedHeaders) {
        throw 'no headers';
    }
    const formattedHeaders = unformattedHeaders.match(/[A-Z][a-z]+/g);
    console.log(formatRow(formattedHeaders, data[0]), 'thing to be returned');
    return [];
}
exports.scrapelien = scrapelien;
