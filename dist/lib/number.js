"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["double"] = _double;
exports.power = power;

/**
 * Multiplies a value by 2. (Also a full example of Typedoc's functionality.)
 *
 * ### Example (es module)
 * ```js
 * import { double } from 'typescript-starter'
 * console.log(double(4))
 * // => 8
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var double = require('typescript-starter').double;
 * console.log(double(4))
 * // => 8
 * ```
 *
 * @param value   Comment describing the `value` parameter.
 * @returns       Comment describing the return type.
 * @anotherNote   Some other value.
 */
function _double(value) {
  return value * 2;
}
/**
 * Raise the value of the first parameter to the power of the second using the es7 `**` operator.
 *
 * ### Example (es module)
 * ```js
 * import { power } from 'typescript-starter'
 * console.log(power(2,3))
 * // => 8
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var power = require('typescript-starter').power;
 * console.log(power(2,3))
 * // => 8
 * ```
 */


function power(base, exponent) {
  // This is a proposed es7 operator, which should be transpiled by Typescript
  return Math.pow(base, exponent);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvbnVtYmVyLnRzIl0sIm5hbWVzIjpbImRvdWJsZSIsInZhbHVlIiwicG93ZXIiLCJiYXNlIiwiZXhwb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCTyxTQUFTQSxPQUFULENBQWdCQyxLQUFoQixFQUF1QztBQUM1QyxTQUFPQSxLQUFLLEdBQUcsQ0FBZjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQk8sU0FBU0MsS0FBVCxDQUFlQyxJQUFmLEVBQTZCQyxRQUE3QixFQUF1RDtBQUM1RDtBQUNBLGtCQUFPRCxJQUFQLEVBQWVDLFFBQWY7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTXVsdGlwbGllcyBhIHZhbHVlIGJ5IDIuIChBbHNvIGEgZnVsbCBleGFtcGxlIG9mIFR5cGVkb2MncyBmdW5jdGlvbmFsaXR5LilcbiAqXG4gKiAjIyMgRXhhbXBsZSAoZXMgbW9kdWxlKVxuICogYGBganNcbiAqIGltcG9ydCB7IGRvdWJsZSB9IGZyb20gJ3R5cGVzY3JpcHQtc3RhcnRlcidcbiAqIGNvbnNvbGUubG9nKGRvdWJsZSg0KSlcbiAqIC8vID0+IDhcbiAqIGBgYFxuICpcbiAqICMjIyBFeGFtcGxlIChjb21tb25qcylcbiAqIGBgYGpzXG4gKiB2YXIgZG91YmxlID0gcmVxdWlyZSgndHlwZXNjcmlwdC1zdGFydGVyJykuZG91YmxlO1xuICogY29uc29sZS5sb2coZG91YmxlKDQpKVxuICogLy8gPT4gOFxuICogYGBgXG4gKlxuICogQHBhcmFtIHZhbHVlICAgQ29tbWVudCBkZXNjcmliaW5nIHRoZSBgdmFsdWVgIHBhcmFtZXRlci5cbiAqIEByZXR1cm5zICAgICAgIENvbW1lbnQgZGVzY3JpYmluZyB0aGUgcmV0dXJuIHR5cGUuXG4gKiBAYW5vdGhlck5vdGUgICBTb21lIG90aGVyIHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZG91YmxlKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gdmFsdWUgKiAyO1xufVxuXG4vKipcbiAqIFJhaXNlIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIHRoZSBwb3dlciBvZiB0aGUgc2Vjb25kIHVzaW5nIHRoZSBlczcgYCoqYCBvcGVyYXRvci5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoZXMgbW9kdWxlKVxuICogYGBganNcbiAqIGltcG9ydCB7IHBvd2VyIH0gZnJvbSAndHlwZXNjcmlwdC1zdGFydGVyJ1xuICogY29uc29sZS5sb2cocG93ZXIoMiwzKSlcbiAqIC8vID0+IDhcbiAqIGBgYFxuICpcbiAqICMjIyBFeGFtcGxlIChjb21tb25qcylcbiAqIGBgYGpzXG4gKiB2YXIgcG93ZXIgPSByZXF1aXJlKCd0eXBlc2NyaXB0LXN0YXJ0ZXInKS5wb3dlcjtcbiAqIGNvbnNvbGUubG9nKHBvd2VyKDIsMykpXG4gKiAvLyA9PiA4XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBvd2VyKGJhc2U6IG51bWJlciwgZXhwb25lbnQ6IG51bWJlcik6IG51bWJlciB7XG4gIC8vIFRoaXMgaXMgYSBwcm9wb3NlZCBlczcgb3BlcmF0b3IsIHdoaWNoIHNob3VsZCBiZSB0cmFuc3BpbGVkIGJ5IFR5cGVzY3JpcHRcbiAgcmV0dXJuIGJhc2UgKiogZXhwb25lbnQ7XG59XG4iXX0=