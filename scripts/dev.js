const build = require("./build");
const serve = require("../server");

if (require.main === module) {
  dev(process.argv.slice(2));
}

async function dev(args) {
  try {
    await build(args);
    console.log("🤖 Starting the server");
    serve(args);
  } catch (err) {
    console.error("💣 Error running dev");
    if (args.includes("--debug")) {
      console.log("----------------------------------------------------");
      console.error(err);
    }
  }
}

module.exports = dev;
