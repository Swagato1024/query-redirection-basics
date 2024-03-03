const { readFile } = require("fs");

const serveHomePage = (req, res) => {
  readFile("./public/pages/index.html", (err, content) => {
    if (err) {
      res.writeHeader(500);
      res.end();
      return;
    }

    res
      .writeHeader(200, {
        "content-type": "text/html",
        "content-length": content.length,
      })
      .end(content);
  });
};

const getSearchParams = (req) => {
  const queryParam = req.url.split("?").pop();
  return new URLSearchParams(queryParam);
};

const greet = (req, res) => {
  const searchParams = getSearchParams(req);
  console.log(searchParams.getAll("Interest"));

  const name = searchParams.get("person-name");

  readFile("./public/pages/welcome-page.html", "utf-8", (err, data) => {
    const content = data.replace("%name", name);

    res.writeHeader(200, {
      "content-type": "text/html",
      "content-size": content.length,
    });

    res.end(content);
  });
};

const handler = (req, res) => {
  console.log(req.url);

  if (req.url.startsWith("/favicon")) {
    res.end();
    return;
  }

  if (req.url === "/") {
    serveHomePage(req, res);
    return;
  }

  if (req.url.startsWith("/greet")) {
    greet(req, res);
    return;
  }

  res.writeHeader(400, { "content-type": "text/plain" });
  res.end("page not found");
};

module.exports = { handler };
