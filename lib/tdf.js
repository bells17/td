"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _mime = require("mime");

var _mime2 = _interopRequireDefault(_mime);

var _sync = require("csv-parse/lib/sync");

var _sync2 = _interopRequireDefault(_sync);

var _csvStringify = require("csv-stringify");

var _csvStringify2 = _interopRequireDefault(_csvStringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transformToCSV = (parsed, delimiter) => {
  return new Promise((resolve, reject) => {
    (0, _csvStringify2.default)(parsed, { header: true, delimiter: delimiter }, (err, csv) => {
      if (err) {
        return reject(err);
      }
      resolve(csv);
    });
  });
};

const transform = (parsed, format) => {
  return (0, _co2.default)(function* () {
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
};

const tdf = (data, options, isFile) => {
  return new Promise((resolve, reject) => {
    (0, _co2.default)(function* () {
      if (isFile) {
        const file = _fs2.default.readFileSync(data, options.encoding || "utf8");
        switch (_mime2.default.lookup(data)) {
          case "application/json":
            try {
              const parsed = JSON.parse(file);
              const transformed = yield transform(parsed, options.output);
              return resolve(transformed);
            } catch (err) {
              return reject(err);
            }
          case "text/csv":
            try {
              const parsed = (0, _sync2.default)(file, {
                columns: true,
                trim: true,
                quote: options.quote || '"',
                delimiter: options.delimiter || ","
              });
              const transformed = yield transform(parsed, options.output || "json");
              return resolve(transformed);
            } catch (err) {
              return reject(err);
            }
          case "text/tab-separated-values":
            try {
              const parsed = (0, _sync2.default)(file, {
                columns: true,
                trim: true,
                quote: options.quote || '"',
                delimiter: options.delimiter || "\t"
              });
              const transformed = yield transform(parsed, options.output || "json");
              return resolve(transformed);
            } catch (err) {
              return reject(err);
            }
        }
      } else {
        switch (options.format) {
          case "json":
            try {
              const parsed = JSON.parse(data);
              const transformed = yield transform(parsed, options.output);
              return resolve(transformed);
            } catch (err) {
              return reject(err);
            }
          case "tsv":
            try {
              const parsed = (0, _sync2.default)(data, {
                columns: true,
                trim: true,
                quote: options.quote || '"',
                delimiter: options.delimiter || "\t"
              });
              const transformed = yield transform(parsed, options.output || "json");
              return resolve(transformed);
            } catch (err) {
              return reject(err);
            }
          case "csv":
          default:
            try {
              const parsed = (0, _sync2.default)(data, {
                columns: true,
                trim: true,
                quote: options.quote || '"',
                delimiter: options.delimiter || ","
              });
              const transformed = yield transform(parsed, options.output || "json");
              return resolve(transformed);
            } catch (err) {
              return reject(err);
            }
        }
      }
    });
  });
};

exports.default = tdf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZGYuanMiXSwibmFtZXMiOlsidHJhbnNmb3JtVG9DU1YiLCJwYXJzZWQiLCJkZWxpbWl0ZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImhlYWRlciIsImVyciIsImNzdiIsInRyYW5zZm9ybSIsImZvcm1hdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0ZGYiLCJkYXRhIiwib3B0aW9ucyIsImlzRmlsZSIsImZpbGUiLCJyZWFkRmlsZVN5bmMiLCJlbmNvZGluZyIsImxvb2t1cCIsInBhcnNlIiwidHJhbnNmb3JtZWQiLCJvdXRwdXQiLCJjb2x1bW5zIiwidHJpbSIsInF1b3RlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsaUJBQWlCLENBQUNDLE1BQUQsRUFBU0MsU0FBVCxLQUF1QjtBQUM1QyxTQUFPLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDdEMsZ0NBQWFKLE1BQWIsRUFBcUIsRUFBRUssUUFBUSxJQUFWLEVBQWdCSixXQUFXQSxTQUEzQixFQUFyQixFQUE2RCxDQUFDSyxHQUFELEVBQU1DLEdBQU4sS0FBYztBQUN6RSxVQUFJRCxHQUFKLEVBQVM7QUFDUCxlQUFPRixPQUFPRSxHQUFQLENBQVA7QUFDRDtBQUNESCxjQUFRSSxHQUFSO0FBQ0QsS0FMRDtBQU1ELEdBUE0sQ0FBUDtBQVFELENBVEQ7O0FBV0EsTUFBTUMsWUFBWSxDQUFDUixNQUFELEVBQVNTLE1BQVQsS0FBb0I7QUFDcEMsU0FBTyxrQkFBRyxhQUFZO0FBQ3BCLFlBQVFBLE1BQVI7QUFDRSxXQUFLLE1BQUw7QUFDRSxlQUFPQyxLQUFLQyxTQUFMLENBQWVYLE1BQWYsQ0FBUDtBQUNGLFdBQUssS0FBTDtBQUNFLGVBQU8sTUFBTUQsZUFBZUMsTUFBZixFQUF1QixJQUF2QixDQUFiO0FBQ0YsV0FBSyxLQUFMO0FBQ0E7QUFDRSxl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LENBQVA7QUFDRCxhQVRELENBU0UsT0FBT2YsR0FBUCxFQUFZO0FBQ1oscUJBQU9GLE9BQU9FLEdBQVAsQ0FBUDtBQUNEO0FBQ0gsZUFBSyxLQUFMO0FBQ0E7QUFDRSxnQkFBSTtBQUNGLG9CQUFNTixTQUFTLG9CQUFTYSxJQUFULEVBQWU7QUFDNUJVLHlCQUFTLElBRG1CO0FBRTVCQyxzQkFBTSxJQUZzQjtBQUc1QkMsdUJBQVNYLFFBQVFXLEtBQVIsSUFBaUIsR0FIRTtBQUk1QnhCLDJCQUFZYSxRQUFRYixTQUFSLElBQXFCO0FBSkwsZUFBZixDQUFmO0FBTUEsb0JBQU1vQixjQUFjLE1BQU1iLFVBQVVSLE1BQVYsRUFBbUJjLFFBQVFRLE1BQVIsSUFBa0IsTUFBckMsQ0FBMUI7QUFDQSxxQkFBT25CLFFBQVFrQixXQUFSLENBQVA7QUFDRCxhQVRELENBU0UsT0FBT2YsR0FBUCxFQUFZO0FBQ1oscUJBQU9GLE9BQU9FLEdBQVAsQ0FBUDtBQUNEO0FBbkNMO0FBcUNEO0FBQ0YsS0E5RUQ7QUErRUQsR0FoRk0sQ0FBUDtBQWlGRCxDQWxGRDs7a0JBb0ZlTSxHIiwiZmlsZSI6InRkZi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgY28gZnJvbSBcImNvXCI7XG5pbXBvcnQgbWltZSBmcm9tIFwibWltZVwiO1xuaW1wb3J0IGNzdlBhcnNlIGZyb20gXCJjc3YtcGFyc2UvbGliL3N5bmNcIjtcbmltcG9ydCBjc3ZTdHJpbmdpZnkgZnJvbSBcImNzdi1zdHJpbmdpZnlcIjtcblxuY29uc3QgdHJhbnNmb3JtVG9DU1YgPSAocGFyc2VkLCBkZWxpbWl0ZXIpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjc3ZTdHJpbmdpZnkocGFyc2VkLCB7IGhlYWRlcjogdHJ1ZSwgZGVsaW1pdGVyOiBkZWxpbWl0ZXIgfSwgKGVyciwgY3N2KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoY3N2KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5jb25zdCB0cmFuc2Zvcm0gPSAocGFyc2VkLCBmb3JtYXQpID0+IHtcbiAgcmV0dXJuIGNvKGZ1bmN0aW9uKigpIHtcbiAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgY2FzZSBcImpzb25cIjpcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHBhcnNlZCk7XG4gICAgICBjYXNlIFwidHN2XCI6XG4gICAgICAgIHJldHVybiB5aWVsZCB0cmFuc2Zvcm1Ub0NTVihwYXJzZWQsIFwiXFx0XCIpO1xuICAgICAgY2FzZSBcImNzdlwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHlpZWxkIHRyYW5zZm9ybVRvQ1NWKHBhcnNlZCwgXCIsXCIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCB0ZGYgPSAoZGF0YSwgb3B0aW9ucywgaXNGaWxlKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY28oZnVuY3Rpb24qKCkge1xuICAgICAgaWYgKGlzRmlsZSkge1xuICAgICAgICBjb25zdCBmaWxlID0gZnMucmVhZEZpbGVTeW5jKGRhdGEsIChvcHRpb25zLmVuY29kaW5nIHx8IFwidXRmOFwiKSk7XG4gICAgICAgIHN3aXRjaCAobWltZS5sb29rdXAoZGF0YSkpIHtcbiAgICAgICAgICBjYXNlIFwiYXBwbGljYXRpb24vanNvblwiOlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShmaWxlKTtcbiAgICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtZWQgPSB5aWVsZCB0cmFuc2Zvcm0ocGFyc2VkLCBvcHRpb25zLm91dHB1dCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRyYW5zZm9ybWVkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSBcInRleHQvY3N2XCI6XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBjc3ZQYXJzZShmaWxlLCB7XG4gICAgICAgICAgICAgICAgY29sdW1uczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cmltOiB0cnVlLFxuICAgICAgICAgICAgICAgIHF1b3RlOiAgKG9wdGlvbnMucXVvdGUgfHwgJ1wiJyksXG4gICAgICAgICAgICAgICAgZGVsaW1pdGVyOiAob3B0aW9ucy5kZWxpbWl0ZXIgfHwgXCIsXCIpXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IHlpZWxkIHRyYW5zZm9ybShwYXJzZWQsIChvcHRpb25zLm91dHB1dCB8fCBcImpzb25cIikpO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cmFuc2Zvcm1lZCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgXCJ0ZXh0L3RhYi1zZXBhcmF0ZWQtdmFsdWVzXCI6XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBjc3ZQYXJzZShmaWxlLCB7XG4gICAgICAgICAgICAgICAgY29sdW1uczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cmltOiB0cnVlLFxuICAgICAgICAgICAgICAgIHF1b3RlOiAgKG9wdGlvbnMucXVvdGUgfHwgJ1wiJyksXG4gICAgICAgICAgICAgICAgZGVsaW1pdGVyOiAob3B0aW9ucy5kZWxpbWl0ZXIgfHwgXCJcXHRcIilcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0geWllbGQgdHJhbnNmb3JtKHBhcnNlZCwgKG9wdGlvbnMub3V0cHV0IHx8IFwianNvblwiKSk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRyYW5zZm9ybWVkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaCAob3B0aW9ucy5mb3JtYXQpIHtcbiAgICAgICAgICBjYXNlIFwianNvblwiOlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtZWQgPSB5aWVsZCB0cmFuc2Zvcm0ocGFyc2VkLCBvcHRpb25zLm91dHB1dCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRyYW5zZm9ybWVkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSBcInRzdlwiOlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gY3N2UGFyc2UoZGF0YSwge1xuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRydWUsXG4gICAgICAgICAgICAgICAgdHJpbTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBxdW90ZTogIChvcHRpb25zLnF1b3RlIHx8ICdcIicpLFxuICAgICAgICAgICAgICAgIGRlbGltaXRlcjogKG9wdGlvbnMuZGVsaW1pdGVyIHx8IFwiXFx0XCIpXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IHlpZWxkIHRyYW5zZm9ybShwYXJzZWQsIChvcHRpb25zLm91dHB1dCB8fCBcImpzb25cIikpO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cmFuc2Zvcm1lZCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgXCJjc3ZcIjpcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gY3N2UGFyc2UoZGF0YSwge1xuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRydWUsXG4gICAgICAgICAgICAgICAgdHJpbTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBxdW90ZTogIChvcHRpb25zLnF1b3RlIHx8ICdcIicpLFxuICAgICAgICAgICAgICAgIGRlbGltaXRlcjogKG9wdGlvbnMuZGVsaW1pdGVyIHx8IFwiLFwiKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtZWQgPSB5aWVsZCB0cmFuc2Zvcm0ocGFyc2VkLCAob3B0aW9ucy5vdXRwdXQgfHwgXCJqc29uXCIpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodHJhbnNmb3JtZWQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRkZjtcbiJdfQ==