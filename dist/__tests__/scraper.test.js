"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("../scraper");
describe("scrapelien", () => {
    test("should return something", async () => {
        const res = await (0, scraper_1.scrapelien)();
        expect(res).not.toBe(undefined);
    });
    test("should return an array", async () => {
        const res = await (0, scraper_1.scrapelien)();
        expect(Array.isArray(res)).toBe(true);
    });
    test("all objects in the array should contain the correct keys", async () => {
        const res = await (0, scraper_1.scrapelien)();
        res.forEach((sighting) => expect(sighting).toMatchObject({
            link: expect.any(String),
            occurred: expect.any(String),
            city: expect.any(String),
            state: expect.any(String),
            country: expect.any(String),
            shape: expect.any(String),
            summary: expect.any(String),
            reported: expect.any(String),
            posted: expect.any(String),
            image: expect.any(String),
        }));
    });
});
