const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");
const boopPlugin = require("./boopPlugin");

const ROOT_DIR = path.join(__dirname, "..");

if (require.main === module) {
  build(process.argv.slice(2));
}

async function build(args) {
  await Promise.all([
    buildJs()
      .then(() => {
        console.log("✅ Build JS complete");
      })
      .catch((err) => {
        console.error("💣 Error building JS");
        if (args.includes("--debug")) {
          console.log("----------------------------------------------------");
          console.error(err);
        }
      }),
    buildCss()
      .then(() => {
        console.log("✅ Build CSS complete");
      })
      .catch(() => {
        console.error("💣 Error building CSS");
        if (args.includes("--debug")) {
          console.log("----------------------------------------------------");
          console.error(err);
        }
      }),
  ]);

  console.log("🎉 Build complete");
}

async function buildJs() {
  esbuild.build({
    entryPoints: ["src/index.jsx"],
    bundle: true,
    outfile: "public/dist/index.js",
  });
}

async function buildCss() {
  let distDir = path.join(ROOT_DIR, "public/dist");
  if (!fs.existsSync(distDir)) {
    await fs.promises.mkdir(distDir);
  }

  let css = await fs.promises.readFile(
    path.join(ROOT_DIR, "src/index.css"),
    "utf8"
  );
  await fs.promises.writeFile(path.join(distDir, "index.css"), css);
}

module.exports = build;
