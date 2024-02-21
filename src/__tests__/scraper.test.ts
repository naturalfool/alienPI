import { scrapelien } from "../scraper";

describe("scrapelien", () => {
  test("should return something", async () => {
    const res = await scrapelien();
    expect(res).not.toBe(undefined);
  }, 10000000);
  test("should return an array", async () => {
    const res = await scrapelien();
    expect(Array.isArray(res)).toBe(true);
  }, 10000000);
  test("all objects in the array should contain the correct keys", async () => {
    const res = await scrapelien();
    res.forEach((sighting: any) =>
      expect(sighting).toMatchObject({
        link: expect.any(String),
        occurred: expect.any(String),
        city: expect.any(String),
        state: expect.any(String),
        country: expect.any(String),
        shape: expect.any(String),
        summary: expect.any(String),
        reported: expect.any(String),
        posted: expect.any(String),
        image: expect.any(Array),
      })
    );
  }, 10000000);
});
