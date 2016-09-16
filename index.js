"use strict";

const fs = require("fs");
const co = require('co');
const mime = require("mime");
const csvParse = require("csv-parse/lib/sync");
const csvStringify = require("csv-stringify");


const transformToCSV = (parsed, delimiter) => {
  return new Promise((resolve, reject) => {
    csvStringify(parsed, { header: true, delimiter: delimiter }, (err, csv) => {
      if (err) {
        return reject(err);
      }
      resolve(csv);
    });
  });
}

const transform = (parsed, format) => {
  return co(function*() {
    switch (format) {
      case "json":
        return JSON.stringify(parsed);
      case "tsv":
        return yield transformToCSV(parsed, "\t");
      case "csv":
      default:
        return yield transformToCSV(parsed, ",");
    }
  });
}


const tdf = (data, options, isFile) => {
  co(function*() {
    if (isFile) {
      const file = fs.readFileSync(data, "UTF8");
      switch (mime.lookup(data)) {
        case "application/json":
          try {
            const parsed = JSON.parse(file);
            const transformed = yield transform(parsed, options.output);
            console.log(transformed);
          } catch (err) {
            return err;
          }
          break;
        case "text/csv":
          const parsed = csvParse(file, {
            columns: true,
            trim: true,
            quote:  (options.quote || "'"),
            delimiter: (options.delimiter || ",")
          });
          const transformed = yield transform(parsed, options.output);
          console.log(transformed);
      }
    } else {
      switch (options.format) {
        case "json":
          try {
            const parsed = JSON.parse(data);
            const transformed = yield transform(parsed, options.output);
            console.log(transformed);
          } catch (err) {
            return err;
          }
        case "tsv":
        case "csv":
        default:
          const parsed = csvParse(data, {
            columns: true,
            trim: true,
            quote:  (options.quote || "'"),
            delimiter: (options.delimiter || ",")
          });
          const transformed = yield transform(parsed, options.output);
          console.log(transformed);
      }
    }
  });
}

module.exports = tdf;
