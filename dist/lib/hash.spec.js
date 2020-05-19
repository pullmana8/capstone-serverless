"use strict";

var _ava = _interopRequireDefault(require("ava"));

var _hash = require("./hash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// tslint:disable:no-expression-statement no-object-mutation
(0, _ava["default"])('sha256', function (t, input, expected) {
  t.is((0, _hash.sha256)(input), expected);
  t.is((0, _hash.sha256Native)(input), expected);
}, 'test', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvaGFzaC5zcGVjLnRzIl0sIm5hbWVzIjpbInQiLCJpbnB1dCIsImV4cGVjdGVkIiwiaXMiXSwibWFwcGluZ3MiOiI7O0FBQ0E7O0FBQ0E7Ozs7QUFGQTtBQUlBLHFCQUNFLFFBREYsRUFFRSxVQUFDQSxDQUFELEVBQUlDLEtBQUosRUFBbUJDLFFBQW5CLEVBQXdDO0FBQ3RDRixFQUFBQSxDQUFDLENBQUNHLEVBQUYsQ0FBSyxrQkFBT0YsS0FBUCxDQUFMLEVBQW9CQyxRQUFwQjtBQUNBRixFQUFBQSxDQUFDLENBQUNHLEVBQUYsQ0FBSyx3QkFBYUYsS0FBYixDQUFMLEVBQTBCQyxRQUExQjtBQUNELENBTEgsRUFNRSxNQU5GLEVBT0Usa0VBUEYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1leHByZXNzaW9uLXN0YXRlbWVudCBuby1vYmplY3QtbXV0YXRpb25cbmltcG9ydCB0ZXN0IGZyb20gJ2F2YSc7XG5pbXBvcnQgeyBzaGEyNTYsIHNoYTI1Nk5hdGl2ZSB9IGZyb20gJy4vaGFzaCc7XG5cbnRlc3QoXG4gICdzaGEyNTYnLFxuICAodCwgaW5wdXQ6IHN0cmluZywgZXhwZWN0ZWQ6IHN0cmluZykgPT4ge1xuICAgIHQuaXMoc2hhMjU2KGlucHV0KSwgZXhwZWN0ZWQpO1xuICAgIHQuaXMoc2hhMjU2TmF0aXZlKGlucHV0KSwgZXhwZWN0ZWQpO1xuICB9LFxuICAndGVzdCcsXG4gICc5Zjg2ZDA4MTg4NGM3ZDY1OWEyZmVhYTBjNTVhZDAxNWEzYmY0ZjFiMmIwYjgyMmNkMTVkNmMxNWIwZjAwYTA4J1xuKTtcbiJdfQ==