"use strict";

const fs = require("fs");
const csvParse = require("csv-parse");

const program = require("commander");
program
  .option("-f --file <filepath>", "parse filepath")
  .option("-v --verbose ", "verbose mode")
  .parse(process.argv)

if (!program.file) {
  program.outputHelp()
  process.exit(2);
}

let data = [];
fs.createReadStream(program.file)
  .on("error", (err) => {
    console.error(err.stack || err);
    process.exit(1);
  })
  .pipe(csvParse({ columns: true, trim: true }))
  .on("error", (err) => {
    console.error(err.stack || err);
    process.exit(1);
  })
  .on("end", ()=> {
    console.log(JSON.stringify(data));
    process.exit(0);
  })
  .on("data", (row) => {
    data.push(row);
  });
