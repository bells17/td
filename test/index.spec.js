"use strict";

const fs = require("fs");
const co = require("co");
const assert = require("power-assert");
const tdf = require("../src/index");

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

      it(`transform to ${v.to} from ${v.from}`, (done) => {
        co(function*() {
          let options = {};
          if (v.output) {
            options.output = v.output
          }
          const transformed = yield tdf(`${filepath}.${v.from}`, options, true);
          const expected = fs.readFileSync(`${filepath}.${v.to}`, "utf8");
          assert(transformed === expected);
          done();
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

      it(`transform to ${v.to} from ${v.from}`, (done) => {
        co(function*() {
          let options = { format: v.from };
          if (v.output) {
            options.output = v.output
          }
          const transformed = yield tdf(fs.readFileSync(`${filepath}.${v.from}`, "utf8"), options);
          const expected = fs.readFileSync(`${filepath}.${v.to}`, "utf8");
          assert(transformed === expected);
          done();
        });
      });

    });

  });

});
