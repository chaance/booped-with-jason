const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "..");

const boopPlugin = {
  name: "boop",
  setup(build) {
    build.onResolve({ filter: /\.boop$/ }, async (args) => {
      return {
        path: path.join(
          ROOT_DIR,
          "boops",
          path.basename(args.path).replace(/\.boop$/, ".json")
        ),
        namespace: "boop-namespace",
      };
    });

    build.onLoad(
      { filter: /corgi.json$/, namespace: "boop-namespace" },
      async (args) => {
        try {
          let json = JSON.parse(await fs.promises.readFile(args.path, "utf8"));
          let { src, alt } = json;
          let contents = `
import * as React from "react";
export default () => <img src="${src}" alt="${alt}" />
`;
          return {
            contents,
            loader: "jsx",
            resolveDir: ROOT_DIR,
          };
        } catch (err) {
          return {
            errors: [{ text: err.message }],
          };
        }
      }
    );
  },
};

module.exports = boopPlugin;
