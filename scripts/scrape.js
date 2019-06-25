// Dependencies
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// var shortcuts
var cl = console.log;

// Set up the scrape function
var scrape = function () {
    return axios.get("https://www.nytimes.com/").then(function (res) {
        var $ = cheerio.load(res.data);
        cl("Let's scrape");

        var articles = [];
        $("article").each(function (i, element) {
            var head = $(this)
                .find('h2')
                .text()
                .trim();

            var url = $(this)
                .find('a')
                .attr('href');

            var sum = $(this)
                .find('p')
                .text()
                .trim();

            if (head && sum && url) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, ' ').trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, ' ').trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat,
                    url: url
                };
                console.log(articles)
                articles.push(dataToAdd);
            }
        });
        return articles;
    });
};

// Export scrape function
module.exports = scrape;