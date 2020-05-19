"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncABC = asyncABC;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * A sample async function (to demo Typescript's es7 async/await downleveling).
 *
 * ### Example (es imports)
 * ```js
 * import { asyncABC } from 'typescript-starter'
 * console.log(await asyncABC())
 * // => ['a','b','c']
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var double = require('typescript-starter').asyncABC;
 * asyncABC().then(console.log);
 * // => ['a','b','c']
 * ```
 *
 * @returns       a Promise which should contain `['a','b','c']`
 */
function asyncABC() {
  return _asyncABC.apply(this, arguments);
}

function _asyncABC() {
  _asyncABC = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var somethingSlow, a, b, c;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            somethingSlow = function _somethingSlow(index) {
              var storage = 'abc'.charAt(index);
              return new Promise(function (resolve) {
                return (// later...
                  resolve(storage)
                );
              });
            };

            _context.next = 3;
            return somethingSlow(0);

          case 3:
            a = _context.sent;
            _context.next = 6;
            return somethingSlow(1);

          case 6:
            b = _context.sent;
            _context.next = 9;
            return somethingSlow(2);

          case 9:
            c = _context.sent;
            return _context.abrupt("return", [a, b, c]);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _asyncABC.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvYXN5bmMudHMiXSwibmFtZXMiOlsiYXN5bmNBQkMiLCJzb21ldGhpbmdTbG93IiwiaW5kZXgiLCJzdG9yYWdlIiwiY2hhckF0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJhIiwiYiIsImMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FtQnNCQSxROzs7OztzRUFBZjtBQUFBLFFBQ0lDLGFBREo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNJQSxZQUFBQSxhQURKLDJCQUNrQkMsS0FEbEIsRUFDcUQ7QUFDeEQsa0JBQU1DLE9BQU8sR0FBRyxNQUFNQyxNQUFOLENBQWFGLEtBQWIsQ0FBaEI7QUFDQSxxQkFBTyxJQUFJRyxPQUFKLENBQW9CLFVBQUFDLE9BQU87QUFBQSx1QkFDaEM7QUFDQUEsa0JBQUFBLE9BQU8sQ0FBQ0gsT0FBRDtBQUZ5QjtBQUFBLGVBQTNCLENBQVA7QUFJRCxhQVBJOztBQUFBO0FBQUEsbUJBUVdGLGFBQWEsQ0FBQyxDQUFELENBUnhCOztBQUFBO0FBUUNNLFlBQUFBLENBUkQ7QUFBQTtBQUFBLG1CQVNXTixhQUFhLENBQUMsQ0FBRCxDQVR4Qjs7QUFBQTtBQVNDTyxZQUFBQSxDQVREO0FBQUE7QUFBQSxtQkFVV1AsYUFBYSxDQUFDLENBQUQsQ0FWeEI7O0FBQUE7QUFVQ1EsWUFBQUEsQ0FWRDtBQUFBLDZDQVdFLENBQUNGLENBQUQsRUFBSUMsQ0FBSixFQUFPQyxDQUFQLENBWEY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBzYW1wbGUgYXN5bmMgZnVuY3Rpb24gKHRvIGRlbW8gVHlwZXNjcmlwdCdzIGVzNyBhc3luYy9hd2FpdCBkb3dubGV2ZWxpbmcpLlxuICpcbiAqICMjIyBFeGFtcGxlIChlcyBpbXBvcnRzKVxuICogYGBganNcbiAqIGltcG9ydCB7IGFzeW5jQUJDIH0gZnJvbSAndHlwZXNjcmlwdC1zdGFydGVyJ1xuICogY29uc29sZS5sb2coYXdhaXQgYXN5bmNBQkMoKSlcbiAqIC8vID0+IFsnYScsJ2InLCdjJ11cbiAqIGBgYFxuICpcbiAqICMjIyBFeGFtcGxlIChjb21tb25qcylcbiAqIGBgYGpzXG4gKiB2YXIgZG91YmxlID0gcmVxdWlyZSgndHlwZXNjcmlwdC1zdGFydGVyJykuYXN5bmNBQkM7XG4gKiBhc3luY0FCQygpLnRoZW4oY29uc29sZS5sb2cpO1xuICogLy8gPT4gWydhJywnYicsJ2MnXVxuICogYGBgXG4gKlxuICogQHJldHVybnMgICAgICAgYSBQcm9taXNlIHdoaWNoIHNob3VsZCBjb250YWluIGBbJ2EnLCdiJywnYyddYFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXN5bmNBQkMoKTogUHJvbWlzZTxyZWFkb25seSBzdHJpbmdbXT4ge1xuICBmdW5jdGlvbiBzb21ldGhpbmdTbG93KGluZGV4OiAwIHwgMSB8IDIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHN0b3JhZ2UgPSAnYWJjJy5jaGFyQXQoaW5kZXgpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KHJlc29sdmUgPT5cbiAgICAgIC8vIGxhdGVyLi4uXG4gICAgICByZXNvbHZlKHN0b3JhZ2UpXG4gICAgKTtcbiAgfVxuICBjb25zdCBhID0gYXdhaXQgc29tZXRoaW5nU2xvdygwKTtcbiAgY29uc3QgYiA9IGF3YWl0IHNvbWV0aGluZ1Nsb3coMSk7XG4gIGNvbnN0IGMgPSBhd2FpdCBzb21ldGhpbmdTbG93KDIpO1xuICByZXR1cm4gW2EsIGIsIGNdO1xufVxuIl19