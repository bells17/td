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
      resolve(csv.trim());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZGYuanMiXSwibmFtZXMiOlsidHJhbnNmb3JtVG9DU1YiLCJwYXJzZWQiLCJkZWxpbWl0ZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImhlYWRlciIsImVyciIsImNzdiIsInRyaW0iLCJ0cmFuc2Zvcm0iLCJmb3JtYXQiLCJKU09OIiwic3RyaW5naWZ5IiwidGRmIiwiZGF0YSIsIm9wdGlvbnMiLCJpc0ZpbGUiLCJmaWxlIiwicmVhZEZpbGVTeW5jIiwiZW5jb2RpbmciLCJsb29rdXAiLCJwYXJzZSIsInRyYW5zZm9ybWVkIiwib3V0cHV0IiwiY29sdW1ucyIsInF1b3RlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsaUJBQWlCLENBQUNDLE1BQUQsRUFBU0MsU0FBVCxLQUF1QjtBQUM1QyxTQUFPLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDdEMsZ0NBQWFKLE1BQWIsRUFBcUIsRUFBRUssUUFBUSxJQUFWLEVBQWdCSixXQUFXQSxTQUEzQixFQUFyQixFQUE2RCxDQUFDSyxHQUFELEVBQU1DLEdBQU4sS0FBYztBQUN6RSxVQUFJRCxHQUFKLEVBQVM7QUFDUCxlQUFPRixPQUFPRSxHQUFQLENBQVA7QUFDRDtBQUNESCxjQUFRSSxJQUFJQyxJQUFKLEVBQVI7QUFDRCxLQUxEO0FBTUQsR0FQTSxDQUFQO0FBUUQsQ0FURDs7QUFXQSxNQUFNQyxZQUFZLENBQUNULE1BQUQsRUFBU1UsTUFBVCxLQUFvQjtBQUNwQyxTQUFPLGtCQUFHLGFBQVk7QUFDcEIsWUFBUUEsTUFBUjtBQUNFLFdBQUssTUFBTDtBQUNFLGVBQU9DLEtBQUtDLFNBQUwsQ0FBZVosTUFBZixDQUFQO0FBQ0YsV0FBSyxLQUFMO0FBQ0UsZUFBTyxNQUFNRCxlQUFlQyxNQUFmLEVBQXVCLElBQXZCLENBQWI7QUFDRixXQUFLLEtBQUw7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QSxxQkFBT3BCLFFBQVFtQixXQUFSLENBQVA7QUFDRCxhQVRELENBU0UsT0FBT2hCLEdBQVAsRUFBWTtBQUNaLHFCQUFPRixPQUFPRSxHQUFQLENBQVA7QUFDRDtBQUNILGVBQUssS0FBTDtBQUNBO0FBQ0UsZ0JBQUk7QUFDRixvQkFBTU4sU0FBUyxvQkFBU2MsSUFBVCxFQUFlO0FBQzVCVSx5QkFBUyxJQURtQjtBQUU1QmhCLHNCQUFNLElBRnNCO0FBRzVCaUIsdUJBQVNWLFFBQVFVLEtBQVIsSUFBaUIsR0FIRTtBQUk1QnhCLDJCQUFZYyxRQUFRZCxTQUFSLElBQXFCO0FBSkwsZUFBZixDQUFmO0FBTUEsb0JBQU1xQixjQUFjLE1BQU1iLFVBQVVULE1BQVYsRUFBbUJlLFFBQVFRLE1BQVIsSUFBa0IsTUFBckMsQ0FBMUI7QUFDQSxxQkFBT3BCLFFBQVFtQixXQUFSLENBQVA7QUFDRCxhQVRELENBU0UsT0FBT2hCLEdBQVAsRUFBWTtBQUNaLHFCQUFPRixPQUFPRSxHQUFQLENBQVA7QUFDRDtBQW5DTDtBQXFDRDtBQUNGLEtBOUVEO0FBK0VELEdBaEZNLENBQVA7QUFpRkQsQ0FsRkQ7O2tCQW9GZU8sRyIsImZpbGUiOiJ0ZGYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IGNvIGZyb20gXCJjb1wiO1xuaW1wb3J0IG1pbWUgZnJvbSBcIm1pbWVcIjtcbmltcG9ydCBjc3ZQYXJzZSBmcm9tIFwiY3N2LXBhcnNlL2xpYi9zeW5jXCI7XG5pbXBvcnQgY3N2U3RyaW5naWZ5IGZyb20gXCJjc3Ytc3RyaW5naWZ5XCI7XG5cbmNvbnN0IHRyYW5zZm9ybVRvQ1NWID0gKHBhcnNlZCwgZGVsaW1pdGVyKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY3N2U3RyaW5naWZ5KHBhcnNlZCwgeyBoZWFkZXI6IHRydWUsIGRlbGltaXRlcjogZGVsaW1pdGVyIH0sIChlcnIsIGNzdikgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKGNzdi50cmltKCkpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IHRyYW5zZm9ybSA9IChwYXJzZWQsIGZvcm1hdCkgPT4ge1xuICByZXR1cm4gY28oZnVuY3Rpb24qKCkge1xuICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICBjYXNlIFwianNvblwiOlxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocGFyc2VkKTtcbiAgICAgIGNhc2UgXCJ0c3ZcIjpcbiAgICAgICAgcmV0dXJuIHlpZWxkIHRyYW5zZm9ybVRvQ1NWKHBhcnNlZCwgXCJcXHRcIik7XG4gICAgICBjYXNlIFwiY3N2XCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4geWllbGQgdHJhbnNmb3JtVG9DU1YocGFyc2VkLCBcIixcIik7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHRkZiA9IChkYXRhLCBvcHRpb25zLCBpc0ZpbGUpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjbyhmdW5jdGlvbiooKSB7XG4gICAgICBpZiAoaXNGaWxlKSB7XG4gICAgICAgIGNvbnN0IGZpbGUgPSBmcy5yZWFkRmlsZVN5bmMoZGF0YSwgKG9wdGlvbnMuZW5jb2RpbmcgfHwgXCJ1dGY4XCIpKTtcbiAgICAgICAgc3dpdGNoIChtaW1lLmxvb2t1cChkYXRhKSkge1xuICAgICAgICAgIGNhc2UgXCJhcHBsaWNhdGlvbi9qc29uXCI6XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKGZpbGUpO1xuICAgICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IHlpZWxkIHRyYW5zZm9ybShwYXJzZWQsIG9wdGlvbnMub3V0cHV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodHJhbnNmb3JtZWQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIFwidGV4dC9jc3ZcIjpcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IGNzdlBhcnNlKGZpbGUsIHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRyaW06IHRydWUsXG4gICAgICAgICAgICAgICAgcXVvdGU6ICAob3B0aW9ucy5xdW90ZSB8fCAnXCInKSxcbiAgICAgICAgICAgICAgICBkZWxpbWl0ZXI6IChvcHRpb25zLmRlbGltaXRlciB8fCBcIixcIilcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0geWllbGQgdHJhbnNmb3JtKHBhcnNlZCwgKG9wdGlvbnMub3V0cHV0IHx8IFwianNvblwiKSk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRyYW5zZm9ybWVkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSBcInRleHQvdGFiLXNlcGFyYXRlZC12YWx1ZXNcIjpcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IGNzdlBhcnNlKGZpbGUsIHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRyaW06IHRydWUsXG4gICAgICAgICAgICAgICAgcXVvdGU6ICAob3B0aW9ucy5xdW90ZSB8fCAnXCInKSxcbiAgICAgICAgICAgICAgICBkZWxpbWl0ZXI6IChvcHRpb25zLmRlbGltaXRlciB8fCBcIlxcdFwiKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtZWQgPSB5aWVsZCB0cmFuc2Zvcm0ocGFyc2VkLCAob3B0aW9ucy5vdXRwdXQgfHwgXCJqc29uXCIpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodHJhbnNmb3JtZWQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChvcHRpb25zLmZvcm1hdCkge1xuICAgICAgICAgIGNhc2UgXCJqc29uXCI6XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IHlpZWxkIHRyYW5zZm9ybShwYXJzZWQsIG9wdGlvbnMub3V0cHV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodHJhbnNmb3JtZWQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIFwidHN2XCI6XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBjc3ZQYXJzZShkYXRhLCB7XG4gICAgICAgICAgICAgICAgY29sdW1uczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cmltOiB0cnVlLFxuICAgICAgICAgICAgICAgIHF1b3RlOiAgKG9wdGlvbnMucXVvdGUgfHwgJ1wiJyksXG4gICAgICAgICAgICAgICAgZGVsaW1pdGVyOiAob3B0aW9ucy5kZWxpbWl0ZXIgfHwgXCJcXHRcIilcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0geWllbGQgdHJhbnNmb3JtKHBhcnNlZCwgKG9wdGlvbnMub3V0cHV0IHx8IFwianNvblwiKSk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRyYW5zZm9ybWVkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSBcImNzdlwiOlxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBjc3ZQYXJzZShkYXRhLCB7XG4gICAgICAgICAgICAgICAgY29sdW1uczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cmltOiB0cnVlLFxuICAgICAgICAgICAgICAgIHF1b3RlOiAgKG9wdGlvbnMucXVvdGUgfHwgJ1wiJyksXG4gICAgICAgICAgICAgICAgZGVsaW1pdGVyOiAob3B0aW9ucy5kZWxpbWl0ZXIgfHwgXCIsXCIpXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IHlpZWxkIHRyYW5zZm9ybShwYXJzZWQsIChvcHRpb25zLm91dHB1dCB8fCBcImpzb25cIikpO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cmFuc2Zvcm1lZCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdGRmO1xuIl19