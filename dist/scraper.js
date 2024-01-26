"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapelien = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
async function scrapelien() {
    function formatRow(headers, row) {
        const columns = row.split("\n");
        const formattedRow = {};
        columns.forEach((column, index) => {
            formattedRow.headers[index] = column[index];
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
    const formattedHeaders = unformattedHeaders
        ? unformattedHeaders.match(/[A-Z][a-z]+/g)
        : null;
    console.log(`🥫🥫🕳️🪵 scraper.ts line 25 >>>>> formattedHeaders >>>>> `, formattedHeaders);
    return [{}];
}
exports.scrapelien = scrapelien;
