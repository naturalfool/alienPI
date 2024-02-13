"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapelien = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
async function scrapelien() {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto("https://nuforc.org/subndx/?id=all");
    const rows = await page.$$("tbody tr");
    const data = await Promise.all(rows.map(async (row) => {
        const cells = await row.$$eval("td", (tds) => tds.map((td) => td.innerText));
        const url = await row.$$eval("td a", (links) => links[0].href);
        return [url, ...cells];
    }));
    const records = data.map((row) => {
        return {
            link: row[0],
            occurred: row[2],
            city: row[3],
            state: row[4],
            country: row[5],
            shape: row[6],
            summary: row[7],
            reported: row[8],
            posted: row[9],
            image: row[10] === ("" || "N") ? false : "this will be where the image url goes honey",
        };
    });
    await browser.close();
    console.log(`🥫🥫🕳️🪵 scraper.ts line 40 >>>>> records >>>>> `, records);
    return records;
}
exports.scrapelien = scrapelien;
