"use strict";

const fs = require("fs");
const co = require("co");
const assert = require("power-assert");
const tdf = require("../src/index");


describe("tdf", () => {
  describe("flename", () => {
    it("transform to csv from json", (done) => {
      co(function*() {
        const filepath = "./sample/sample";
        const transformed = yield tdf(`${filepath}.json`, {}, true);
        const csv = fs.readFileSync(`${filepath}.csv`, "UTF8");
        assert(transformed === csv);
        done();
      });
    });
  });
});
