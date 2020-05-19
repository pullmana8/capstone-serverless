"use strict";

var _ava = _interopRequireDefault(require("ava"));

var _async = require("./async");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _ava["default"])('getABC', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = t;
            _context.next = 3;
            return (0, _async.asyncABC)();

          case 3:
            _context.t1 = _context.sent;
            _context.t2 = ['a', 'b', 'c'];

            _context.t0.deepEqual.call(_context.t0, _context.t1, _context.t2);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvYXN5bmMuc3BlYy50cyJdLCJuYW1lcyI6WyJ0IiwiZGVlcEVxdWFsIl0sIm1hcHBpbmdzIjoiOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLHFCQUFLLFFBQUw7QUFBQSxxRUFBZSxpQkFBTUEsQ0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQ2JBLENBRGE7QUFBQTtBQUFBLG1CQUNLLHNCQURMOztBQUFBO0FBQUE7QUFBQSwwQkFDaUIsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsQ0FEakI7O0FBQUEsd0JBQ1hDLFNBRFc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBZjs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLWV4cHJlc3Npb24tc3RhdGVtZW50XG5pbXBvcnQgdGVzdCBmcm9tICdhdmEnO1xuaW1wb3J0IHsgYXN5bmNBQkMgfSBmcm9tICcuL2FzeW5jJztcblxudGVzdCgnZ2V0QUJDJywgYXN5bmMgdCA9PiB7XG4gIHQuZGVlcEVxdWFsKGF3YWl0IGFzeW5jQUJDKCksIFsnYScsICdiJywgJ2MnXSk7XG59KTtcbiJdfQ==