"use strict";

import fs from "fs";
import co from "co";
import assert from "power-assert";
import tdf from "../src/tdf";

const filepath = `${__dirname}/data/sample`;

describe("tdf", () => {

  describe("flename", () => {

    [
      {
        from: "json",
        to: "csv"
      },
      {
        from: "csv",
        to: "json"
      },
      {
        from: "tsv",
        to: "json"
      },
      {
        from: "json",
        to: "tsv",
        output: "tsv"
      },
      {
        from: "tsv",
        to: "csv",
        output: "csv"
      },
    ].forEach((v) => {

      it(`transform to ${v.to} from ${v.from}`, () => {
        co(function*() {
          let options = {};
          if (v.output) {
            options.output = v.output;
          }
          const transformed = yield tdf(`${filepath}.${v.from}`, options, true);
          const expected = fs.readFileSync(`${filepath}.${v.to}`, "utf8");
          assert(transformed === expected);
        });
      });

    });

  });

  describe("data string", () => {

    [
      {
        from: "json",
        to: "csv"
      },
      {
        from: "csv",
        to: "json"
      },
      {
        from: "tsv",
        to: "json"
      },
      {
        from: "json",
        to: "tsv",
        output: "tsv"
      },
      {
        from: "tsv",
        to: "csv",
        output: "csv"
      },
    ].forEach((v) => {

      it(`transform to ${v.to} from ${v.from}`, () => {
        co(function*() {
          let options = { format: v.from };
          if (v.output) {
            options.output = v.output;
          }
          const transformed = yield tdf(fs.readFileSync(`${filepath}.${v.from}`, "utf8"), options);
          const expected = fs.readFileSync(`${filepath}.${v.to}`, "utf8");
          assert(transformed === expected);
        });
      });

    });

  });

});
