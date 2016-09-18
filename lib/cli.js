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
    try {
      const transformed = yield (0, _tdf2.default)(_commander2.default.args[0], _commander2.default, true);
      console.log(transformed);
    } catch (err) {
      console.log(err.stack || err);
    }
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
      try {
        const transformed = yield (0, _tdf2.default)(input, _commander2.default);
        console.log(transformed);
      } catch (err) {
        console.log(err.stack || err);
      }
    });
  });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGkuanMiXSwibmFtZXMiOlsib3B0aW9uIiwiU3RyaW5nIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsIm9uIiwiY29uc29sZSIsImxvZyIsInN0ZGluIiwiaXNUVFkiLCJhcmdzIiwiaGVscCIsInRyYW5zZm9ybWVkIiwiZXJyIiwic3RhY2siLCJmb3JtYXQiLCJpbnB1dCIsInJlc3VtZSIsInNldEVuY29kaW5nIiwiY2h1bmsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxvQkFDR0EsTUFESCxDQUNVLDRCQURWLEVBQ3dDLFdBRHhDLEVBQ3FEQyxNQURyRCxFQUVHRCxNQUZILENBRVUsNEJBRlYsRUFFd0MsY0FGeEMsRUFFd0RDLE1BRnhELEVBR0dELE1BSEgsQ0FHVSwrQkFIVixFQUcyQyxrQkFIM0MsRUFHK0RDLE1BSC9ELEVBSUdELE1BSkgsQ0FJVSwrQkFKVixFQUkyQyxlQUozQyxFQUk0REMsTUFKNUQsRUFLR0QsTUFMSCxDQUtVLDZCQUxWLEVBS3lDLG9CQUx6QyxFQUsrREMsTUFML0QsRUFNR0MsS0FOSCxDQU1TQyxRQUFRQyxJQU5qQjs7QUFRQSxvQkFBUUMsRUFBUixDQUFXLFFBQVgsRUFBcUIsWUFBVTtBQUM3QkMsVUFBUUMsR0FBUixDQUFZLGFBQVo7QUFDQUQsVUFBUUMsR0FBUixDQUFZLEVBQVo7QUFDQUQsVUFBUUMsR0FBUixDQUFZLHNCQUFaO0FBQ0FELFVBQVFDLEdBQVIsQ0FBWSxtQ0FBWjtBQUNBRCxVQUFRQyxHQUFSLENBQVksRUFBWjtBQUNELENBTkQ7O0FBUUEsSUFBSUosUUFBUUssS0FBUixDQUFjQyxLQUFsQixFQUF5QjtBQUN2QixNQUFJLENBQUMsb0JBQVFDLElBQVIsQ0FBYSxDQUFiLENBQUwsRUFBc0I7QUFDcEIsd0JBQVFDLElBQVI7QUFDRDtBQUNELG9CQUFHLGFBQVk7QUFDYixRQUFJO0FBQ0YsWUFBTUMsY0FBYyxNQUFNLG1CQUFJLG9CQUFRRixJQUFSLENBQWEsQ0FBYixDQUFKLHVCQUE4QixJQUE5QixDQUExQjtBQUNBSixjQUFRQyxHQUFSLENBQVlLLFdBQVo7QUFDRCxLQUhELENBR0UsT0FBT0MsR0FBUCxFQUFZO0FBQ1pQLGNBQVFDLEdBQVIsQ0FBWU0sSUFBSUMsS0FBSixJQUFhRCxHQUF6QjtBQUNEO0FBQ0YsR0FQRDtBQVFELENBWkQsTUFZTztBQUNMLE1BQUksQ0FBQyxvQkFBUUUsTUFBYixFQUFxQjtBQUNuQix3QkFBUUosSUFBUjtBQUNEO0FBQ0QsTUFBSUssUUFBUSxFQUFaO0FBQ0FiLFVBQVFLLEtBQVIsQ0FBY1MsTUFBZDtBQUNBZCxVQUFRSyxLQUFSLENBQWNVLFdBQWQsQ0FBMEIsTUFBMUI7QUFDQWYsVUFBUUssS0FBUixDQUNHSCxFQURILENBQ00sTUFETixFQUNlYyxLQUFELElBQVc7QUFDckJILGFBQVNHLEtBQVQ7QUFDRCxHQUhILEVBSUdkLEVBSkgsQ0FJTSxLQUpOLEVBSWEsTUFBTTtBQUNmLHNCQUFHLGFBQVk7QUFDYixVQUFJO0FBQ0YsY0FBTU8sY0FBYyxNQUFNLG1CQUFJSSxLQUFKLHNCQUExQjtBQUNBVixnQkFBUUMsR0FBUixDQUFZSyxXQUFaO0FBQ0QsT0FIRCxDQUdFLE9BQU9DLEdBQVAsRUFBWTtBQUNaUCxnQkFBUUMsR0FBUixDQUFZTSxJQUFJQyxLQUFKLElBQWFELEdBQXpCO0FBQ0Q7QUFDRixLQVBEO0FBUUQsR0FiSDtBQWNEIiwiZmlsZSI6ImNsaS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvZGVmYXVsdCAqL1xuXG5pbXBvcnQgdGRmIGZyb20gXCIuL3RkZlwiO1xuaW1wb3J0IGNvIGZyb20gXCJjb1wiO1xuaW1wb3J0IHByb2dyYW0gZnJvbSBcImNvbW1hbmRlclwiO1xuXG5wcm9ncmFtXG4gIC5vcHRpb24oXCItZCAtLWRlbGltaXRlciBbZGVsaW1pdGVyXVwiLCBcImRlbGltaXRlclwiLCBTdHJpbmcpXG4gIC5vcHRpb24oXCItZiAtLWZvcm1hdCBbc3RkaW4gZm9ybWF0XVwiLCBcInN0ZGluIGZvcm1hdFwiLCBTdHJpbmcpXG4gIC5vcHRpb24oXCItcSAtLXF1b3RlIFtjc3YgcXVvdGUgc3RyaW5nXVwiLCBcImNzdiBxdW90ZSBzdHJpbmdcIiwgU3RyaW5nKVxuICAub3B0aW9uKFwiLWUgLS1lbmNvZGluZyBbZmlsZSBlbmNvZGluZ11cIiwgXCJmaWxlIGVuY29kaW5nXCIsIFN0cmluZylcbiAgLm9wdGlvbihcIi1vIC0tb3V0cHV0IFtvdXRwdXQgZm9ybWF0XVwiLCBcIm91dHB1dCBkYXRhIGZvcm1hdFwiLCBTdHJpbmcpXG4gIC5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuXG5wcm9ncmFtLm9uKFwiLS1oZWxwXCIsIGZ1bmN0aW9uKCl7XG4gIGNvbnNvbGUubG9nKFwiICBFeGFtcGxlczpcIik7XG4gIGNvbnNvbGUubG9nKFwiXCIpO1xuICBjb25zb2xlLmxvZyhcIiAgICAkIHRkZiBzYW1wbGUuY3N2XCIpO1xuICBjb25zb2xlLmxvZyhcIiAgICAkIGNhdCBzYW1wbGUuY3N2IHwgdGRmIC1mIGNzdlwiKTtcbiAgY29uc29sZS5sb2coXCJcIik7XG59KTtcblxuaWYgKHByb2Nlc3Muc3RkaW4uaXNUVFkpIHtcbiAgaWYgKCFwcm9ncmFtLmFyZ3NbMF0pIHtcbiAgICBwcm9ncmFtLmhlbHAoKTtcbiAgfVxuICBjbyhmdW5jdGlvbiooKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0geWllbGQgdGRmKHByb2dyYW0uYXJnc1swXSwgcHJvZ3JhbSwgdHJ1ZSk7XG4gICAgICBjb25zb2xlLmxvZyh0cmFuc2Zvcm1lZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIuc3RhY2sgfHwgZXJyKTtcbiAgICB9XG4gIH0pO1xufSBlbHNlIHtcbiAgaWYgKCFwcm9ncmFtLmZvcm1hdCkge1xuICAgIHByb2dyYW0uaGVscCgpO1xuICB9XG4gIGxldCBpbnB1dCA9IFwiXCI7XG4gIHByb2Nlc3Muc3RkaW4ucmVzdW1lKCk7XG4gIHByb2Nlc3Muc3RkaW4uc2V0RW5jb2RpbmcoXCJ1dGY4XCIpO1xuICBwcm9jZXNzLnN0ZGluXG4gICAgLm9uKFwiZGF0YVwiLCAoY2h1bmspID0+IHtcbiAgICAgIGlucHV0ICs9IGNodW5rO1xuICAgIH0pXG4gICAgLm9uKFwiZW5kXCIsICgpID0+IHtcbiAgICAgIGNvKGZ1bmN0aW9uKigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IHlpZWxkIHRkZihpbnB1dCwgcHJvZ3JhbSk7XG4gICAgICAgICAgY29uc29sZS5sb2codHJhbnNmb3JtZWQpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIuc3RhY2sgfHwgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG59XG4iXX0=