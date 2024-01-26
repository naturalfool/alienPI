import puppeteer from "puppeteer";

export async function scrapelien() {
  function formatRow(headers: string[], row: string) {
    const columns = row.split("\n");
    const formattedRow: any = {};
    columns.forEach((column, index) => {
      formattedRow.headers[index] = column[index];
    });
    return formattedRow;
  }

  const browser = await puppeteer.launch();
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
  console.log(
    `🥫🥫🕳️🪵 scraper.ts line 25 >>>>> formattedHeaders >>>>> `,
    formattedHeaders
  );

  return [{}];
}
