"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sha256 = sha256;
exports.sha256Native = sha256Native;

var _crypto = require("crypto");

var _sha = _interopRequireDefault(require("sha.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Calculate the sha256 digest of a string.
 *
 * ### Example (es imports)
 * ```js
 * import { sha256 } from 'typescript-starter'
 * sha256('test')
 * // => '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
 * ```
 *
 * @returns sha256 message digest
 */
function sha256(message) {
  return (0, _sha["default"])('sha256').update(message).digest('hex');
}
/**
 * A faster implementation of [[sha256]] which requires the native Node.js module. Browser consumers should use [[sha256]], instead.
 *
 * ### Example (es imports)
 * ```js
 * import { sha256Native as sha256 } from 'typescript-starter'
 * sha256('test')
 * // => '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
 * ```
 *
 * @returns sha256 message digest
 */


function sha256Native(message) {
  return (0, _crypto.createHash)('sha256').update(message).digest('hex');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvaGFzaC50cyJdLCJuYW1lcyI6WyJzaGEyNTYiLCJtZXNzYWdlIiwidXBkYXRlIiwiZGlnZXN0Iiwic2hhMjU2TmF0aXZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQVlPLFNBQVNBLE1BQVQsQ0FBZ0JDLE9BQWhCLEVBQXlDO0FBQzlDLFNBQU8scUJBQU0sUUFBTixFQUNKQyxNQURJLENBQ0dELE9BREgsRUFFSkUsTUFGSSxDQUVHLEtBRkgsQ0FBUDtBQUdEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7O0FBWU8sU0FBU0MsWUFBVCxDQUFzQkgsT0FBdEIsRUFBK0M7QUFDcEQsU0FBTyx3QkFBVyxRQUFYLEVBQ0pDLE1BREksQ0FDR0QsT0FESCxFQUVKRSxNQUZJLENBRUcsS0FGSCxDQUFQO0FBR0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVIYXNoIH0gZnJvbSAnY3J5cHRvJztcbmltcG9ydCBzaGFKcyBmcm9tICdzaGEuanMnO1xuXG4vKipcbiAqIENhbGN1bGF0ZSB0aGUgc2hhMjU2IGRpZ2VzdCBvZiBhIHN0cmluZy5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoZXMgaW1wb3J0cylcbiAqIGBgYGpzXG4gKiBpbXBvcnQgeyBzaGEyNTYgfSBmcm9tICd0eXBlc2NyaXB0LXN0YXJ0ZXInXG4gKiBzaGEyNTYoJ3Rlc3QnKVxuICogLy8gPT4gJzlmODZkMDgxODg0YzdkNjU5YTJmZWFhMGM1NWFkMDE1YTNiZjRmMWIyYjBiODIyY2QxNWQ2YzE1YjBmMDBhMDgnXG4gKiBgYGBcbiAqXG4gKiBAcmV0dXJucyBzaGEyNTYgbWVzc2FnZSBkaWdlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNoYTI1NihtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc2hhSnMoJ3NoYTI1NicpXG4gICAgLnVwZGF0ZShtZXNzYWdlKVxuICAgIC5kaWdlc3QoJ2hleCcpO1xufVxuXG4vKipcbiAqIEEgZmFzdGVyIGltcGxlbWVudGF0aW9uIG9mIFtbc2hhMjU2XV0gd2hpY2ggcmVxdWlyZXMgdGhlIG5hdGl2ZSBOb2RlLmpzIG1vZHVsZS4gQnJvd3NlciBjb25zdW1lcnMgc2hvdWxkIHVzZSBbW3NoYTI1Nl1dLCBpbnN0ZWFkLlxuICpcbiAqICMjIyBFeGFtcGxlIChlcyBpbXBvcnRzKVxuICogYGBganNcbiAqIGltcG9ydCB7IHNoYTI1Nk5hdGl2ZSBhcyBzaGEyNTYgfSBmcm9tICd0eXBlc2NyaXB0LXN0YXJ0ZXInXG4gKiBzaGEyNTYoJ3Rlc3QnKVxuICogLy8gPT4gJzlmODZkMDgxODg0YzdkNjU5YTJmZWFhMGM1NWFkMDE1YTNiZjRmMWIyYjBiODIyY2QxNWQ2YzE1YjBmMDBhMDgnXG4gKiBgYGBcbiAqXG4gKiBAcmV0dXJucyBzaGEyNTYgbWVzc2FnZSBkaWdlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNoYTI1Nk5hdGl2ZShtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gY3JlYXRlSGFzaCgnc2hhMjU2JylcbiAgICAudXBkYXRlKG1lc3NhZ2UpXG4gICAgLmRpZ2VzdCgnaGV4Jyk7XG59XG4iXX0=