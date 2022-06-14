const cheerio = require("cheerio");
const request = require("request-promise");

async function scrape() {
  for (let index = 1; index <= 7; index = index + 1) {
    const html = await request.get(
      "https://lubimyczytac.pl/top100?page=" + index
    );
    const $ = await cheerio.load(html);
    const results = $(".authorAllBooks__singleText")
      .map((index, element) => {
        const titleElement = $(element).find(
          ".authorAllBooks__singleTextTitle.float-left"
        );
        const authorElement = $(element).find(
          ".authorAllBooks__singleTextAuthor"
        );
        const title = $(titleElement)
          .text()
          .replace(/(\r\n|\r|\n)/g, "");
        const url = "https://lubimyczytac.pl" + $(titleElement).attr("href");
        const author = $(authorElement).text();

        return { title, author, url };
      })
      .get();
    console.log(results);
  }
}

scrape();