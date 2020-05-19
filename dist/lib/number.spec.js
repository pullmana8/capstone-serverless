"use strict";

var _ava = _interopRequireDefault(require("ava"));

var _number = require("./number");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// tslint:disable:no-expression-statement
(0, _ava["default"])('double', function (t) {
  t.is((0, _number["double"])(2), 4);
});
(0, _ava["default"])('power', function (t) {
  t.is((0, _number.power)(2, 4), 16);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvbnVtYmVyLnNwZWMudHMiXSwibmFtZXMiOlsidCIsImlzIl0sIm1hcHBpbmdzIjoiOztBQUNBOztBQUNBOzs7O0FBRkE7QUFJQSxxQkFBSyxRQUFMLEVBQWUsVUFBQUEsQ0FBQyxFQUFJO0FBQ2xCQSxFQUFBQSxDQUFDLENBQUNDLEVBQUYsQ0FBSyx1QkFBTyxDQUFQLENBQUwsRUFBZ0IsQ0FBaEI7QUFDRCxDQUZEO0FBSUEscUJBQUssT0FBTCxFQUFjLFVBQUFELENBQUMsRUFBSTtBQUNqQkEsRUFBQUEsQ0FBQyxDQUFDQyxFQUFGLENBQUssbUJBQU0sQ0FBTixFQUFTLENBQVQsQ0FBTCxFQUFrQixFQUFsQjtBQUNELENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1leHByZXNzaW9uLXN0YXRlbWVudFxuaW1wb3J0IHRlc3QgZnJvbSAnYXZhJztcbmltcG9ydCB7IGRvdWJsZSwgcG93ZXIgfSBmcm9tICcuL251bWJlcic7XG5cbnRlc3QoJ2RvdWJsZScsIHQgPT4ge1xuICB0LmlzKGRvdWJsZSgyKSwgNCk7XG59KTtcblxudGVzdCgncG93ZXInLCB0ID0+IHtcbiAgdC5pcyhwb3dlcigyLCA0KSwgMTYpO1xufSk7XG4iXX0=