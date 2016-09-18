"use strict";

/* eslint-disable no-console */
/* eslint-disable import/default */

import tdf from "./tdf";
import co from "co";
import program from "commander";

program
  .option("-d --delimiter [delimiter]", "delimiter", String)
  .option("-f --format [stdin format]", "stdin format", String)
  .option("-q --quote [csv quote string]", "csv quote string", String)
  .option("-e --encoding [file encoding]", "file encoding", String)
  .option("-o --output [output format]", "output data format", String)
  .parse(process.argv);

program.on("--help", function(){
  console.log("  Examples:");
  console.log("");
  console.log("    $ tdf sample.csv");
  console.log("    $ cat sample.csv | tdf -f csv");
  console.log("");
});

if (process.stdin.isTTY) {
  if (!program.args[0]) {
    program.help();
  }
  co(function*() {
    try {
      const transformed = yield tdf(program.args[0], program, true);
      console.log(transformed);
    } catch (err) {
      console.log(err.stack || err);
    }
  });
} else {
  if (!program.format) {
    program.help();
  }
  let input = "";
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin
    .on("data", (chunk) => {
      input += chunk;
    })
    .on("end", () => {
      co(function*() {
        try {
          const transformed = yield tdf(input, program);
          console.log(transformed);
        } catch (err) {
          console.log(err.stack || err);
        }
      });
    });
}
