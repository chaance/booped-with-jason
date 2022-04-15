const express = require("express");
const path = require("path");

const app = express();
const port = 8080;
const ROOT_DIR = path.join(__dirname, ".");

if (require.main === module) {
  serve(process.argv.slice(2));
}

function serve() {
  app.use(express.static(path.join(ROOT_DIR, "public")));

  app.get("*", (req, res, next) => {
    res.sendFile(path.join(ROOT_DIR, "index.html"));
  });

  app.listen(port);
  console.log(`
----------------------------------------------------
Boop! http://localhost:${port}
----------------------------------------------------
`);
}

module.exports = serve;
