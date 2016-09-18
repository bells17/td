"use strict";

/* eslint-disable no-console */
/* eslint-disable import/default */

var _tdf = require("./tdf");

var _tdf2 = _interopRequireDefault(_tdf);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.option("-d --delimiter [delimiter]", "delimiter", String).option("-f --format [stdin format]", "stdin format", String).option("-q --quote [csv quote string]", "csv quote string", String).option("-e --encoding [file encoding]", "file encoding", String).option("-o --output [output format]", "output data format", String).parse(process.argv);

_commander2.default.on("--help", function () {
  console.log("  Examples:");
  console.log("");
  console.log("    $ tdf sample.csv");
  console.log("    $ cat sample.csv | tdf -f csv");
  console.log("");
});

if (process.stdin.isTTY) {
  if (!_commander2.default.args[0]) {
    _commander2.default.help();
  }
  (0, _co2.default)(function* () {
    const transformed = yield (0, _tdf2.default)(_commander2.default.args[0], _commander2.default, true);
    console.log(transformed);
  });
} else {
  if (!_commander2.default.format) {
    _commander2.default.help();
  }
  let input = "";
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", chunk => {
    input += chunk;
  }).on("end", () => {
    (0, _co2.default)(function* () {
      const transformed = yield (0, _tdf2.default)(input, _commander2.default);
      console.log(transformed);
    });
  });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGkuanMiXSwibmFtZXMiOlsib3B0aW9uIiwiU3RyaW5nIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsIm9uIiwiY29uc29sZSIsImxvZyIsInN0ZGluIiwiaXNUVFkiLCJhcmdzIiwiaGVscCIsInRyYW5zZm9ybWVkIiwiZm9ybWF0IiwiaW5wdXQiLCJyZXN1bWUiLCJzZXRFbmNvZGluZyIsImNodW5rIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsb0JBQ0dBLE1BREgsQ0FDVSw0QkFEVixFQUN3QyxXQUR4QyxFQUNxREMsTUFEckQsRUFFR0QsTUFGSCxDQUVVLDRCQUZWLEVBRXdDLGNBRnhDLEVBRXdEQyxNQUZ4RCxFQUdHRCxNQUhILENBR1UsK0JBSFYsRUFHMkMsa0JBSDNDLEVBRytEQyxNQUgvRCxFQUlHRCxNQUpILENBSVUsK0JBSlYsRUFJMkMsZUFKM0MsRUFJNERDLE1BSjVELEVBS0dELE1BTEgsQ0FLVSw2QkFMVixFQUt5QyxvQkFMekMsRUFLK0RDLE1BTC9ELEVBTUdDLEtBTkgsQ0FNU0MsUUFBUUMsSUFOakI7O0FBUUEsb0JBQVFDLEVBQVIsQ0FBVyxRQUFYLEVBQXFCLFlBQVU7QUFDN0JDLFVBQVFDLEdBQVIsQ0FBWSxhQUFaO0FBQ0FELFVBQVFDLEdBQVIsQ0FBWSxFQUFaO0FBQ0FELFVBQVFDLEdBQVIsQ0FBWSxzQkFBWjtBQUNBRCxVQUFRQyxHQUFSLENBQVksbUNBQVo7QUFDQUQsVUFBUUMsR0FBUixDQUFZLEVBQVo7QUFDRCxDQU5EOztBQVFBLElBQUlKLFFBQVFLLEtBQVIsQ0FBY0MsS0FBbEIsRUFBeUI7QUFDdkIsTUFBSSxDQUFDLG9CQUFRQyxJQUFSLENBQWEsQ0FBYixDQUFMLEVBQXNCO0FBQ3BCLHdCQUFRQyxJQUFSO0FBQ0Q7QUFDRCxvQkFBRyxhQUFZO0FBQ2IsVUFBTUMsY0FBYyxNQUFNLG1CQUFJLG9CQUFRRixJQUFSLENBQWEsQ0FBYixDQUFKLHVCQUE4QixJQUE5QixDQUExQjtBQUNBSixZQUFRQyxHQUFSLENBQVlLLFdBQVo7QUFDRCxHQUhEO0FBSUQsQ0FSRCxNQVFPO0FBQ0wsTUFBSSxDQUFDLG9CQUFRQyxNQUFiLEVBQXFCO0FBQ25CLHdCQUFRRixJQUFSO0FBQ0Q7QUFDRCxNQUFJRyxRQUFRLEVBQVo7QUFDQVgsVUFBUUssS0FBUixDQUFjTyxNQUFkO0FBQ0FaLFVBQVFLLEtBQVIsQ0FBY1EsV0FBZCxDQUEwQixNQUExQjtBQUNBYixVQUFRSyxLQUFSLENBQ0dILEVBREgsQ0FDTSxNQUROLEVBQ2VZLEtBQUQsSUFBVztBQUNyQkgsYUFBU0csS0FBVDtBQUNELEdBSEgsRUFJR1osRUFKSCxDQUlNLEtBSk4sRUFJYSxNQUFNO0FBQ2Ysc0JBQUcsYUFBWTtBQUNiLFlBQU1PLGNBQWMsTUFBTSxtQkFBSUUsS0FBSixzQkFBMUI7QUFDQVIsY0FBUUMsR0FBUixDQUFZSyxXQUFaO0FBQ0QsS0FIRDtBQUlELEdBVEg7QUFVRCIsImZpbGUiOiJjbGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L2RlZmF1bHQgKi9cblxuaW1wb3J0IHRkZiBmcm9tIFwiLi90ZGZcIjtcbmltcG9ydCBjbyBmcm9tIFwiY29cIjtcbmltcG9ydCBwcm9ncmFtIGZyb20gXCJjb21tYW5kZXJcIjtcblxucHJvZ3JhbVxuICAub3B0aW9uKFwiLWQgLS1kZWxpbWl0ZXIgW2RlbGltaXRlcl1cIiwgXCJkZWxpbWl0ZXJcIiwgU3RyaW5nKVxuICAub3B0aW9uKFwiLWYgLS1mb3JtYXQgW3N0ZGluIGZvcm1hdF1cIiwgXCJzdGRpbiBmb3JtYXRcIiwgU3RyaW5nKVxuICAub3B0aW9uKFwiLXEgLS1xdW90ZSBbY3N2IHF1b3RlIHN0cmluZ11cIiwgXCJjc3YgcXVvdGUgc3RyaW5nXCIsIFN0cmluZylcbiAgLm9wdGlvbihcIi1lIC0tZW5jb2RpbmcgW2ZpbGUgZW5jb2RpbmddXCIsIFwiZmlsZSBlbmNvZGluZ1wiLCBTdHJpbmcpXG4gIC5vcHRpb24oXCItbyAtLW91dHB1dCBbb3V0cHV0IGZvcm1hdF1cIiwgXCJvdXRwdXQgZGF0YSBmb3JtYXRcIiwgU3RyaW5nKVxuICAucGFyc2UocHJvY2Vzcy5hcmd2KTtcblxucHJvZ3JhbS5vbihcIi0taGVscFwiLCBmdW5jdGlvbigpe1xuICBjb25zb2xlLmxvZyhcIiAgRXhhbXBsZXM6XCIpO1xuICBjb25zb2xlLmxvZyhcIlwiKTtcbiAgY29uc29sZS5sb2coXCIgICAgJCB0ZGYgc2FtcGxlLmNzdlwiKTtcbiAgY29uc29sZS5sb2coXCIgICAgJCBjYXQgc2FtcGxlLmNzdiB8IHRkZiAtZiBjc3ZcIik7XG4gIGNvbnNvbGUubG9nKFwiXCIpO1xufSk7XG5cbmlmIChwcm9jZXNzLnN0ZGluLmlzVFRZKSB7XG4gIGlmICghcHJvZ3JhbS5hcmdzWzBdKSB7XG4gICAgcHJvZ3JhbS5oZWxwKCk7XG4gIH1cbiAgY28oZnVuY3Rpb24qKCkge1xuICAgIGNvbnN0IHRyYW5zZm9ybWVkID0geWllbGQgdGRmKHByb2dyYW0uYXJnc1swXSwgcHJvZ3JhbSwgdHJ1ZSk7XG4gICAgY29uc29sZS5sb2codHJhbnNmb3JtZWQpO1xuICB9KTtcbn0gZWxzZSB7XG4gIGlmICghcHJvZ3JhbS5mb3JtYXQpIHtcbiAgICBwcm9ncmFtLmhlbHAoKTtcbiAgfVxuICBsZXQgaW5wdXQgPSBcIlwiO1xuICBwcm9jZXNzLnN0ZGluLnJlc3VtZSgpO1xuICBwcm9jZXNzLnN0ZGluLnNldEVuY29kaW5nKFwidXRmOFwiKTtcbiAgcHJvY2Vzcy5zdGRpblxuICAgIC5vbihcImRhdGFcIiwgKGNodW5rKSA9PiB7XG4gICAgICBpbnB1dCArPSBjaHVuaztcbiAgICB9KVxuICAgIC5vbihcImVuZFwiLCAoKSA9PiB7XG4gICAgICBjbyhmdW5jdGlvbiooKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0geWllbGQgdGRmKGlucHV0LCBwcm9ncmFtKTtcbiAgICAgICAgY29uc29sZS5sb2codHJhbnNmb3JtZWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG59XG4iXX0=