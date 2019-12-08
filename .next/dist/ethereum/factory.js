'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _ElectionFactory = require('./build/ElectionFactory.json');

var _ElectionFactory2 = _interopRequireDefault(_ElectionFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var constants = require('../helper/constants').default.constants;

var instance = new _web2.default.eth.Contract(JSON.parse(_ElectionFactory2.default.interface), constants.FACTORY_ADDRESS);

exports.default = instance;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtXFxmYWN0b3J5LmpzIl0sIm5hbWVzIjpbIndlYjMiLCJFbGVjdGlvbkZhY3RvcnkiLCJjb25zdGFudHMiLCJyZXF1aXJlIiwiZGVmYXVsdCIsImluc3RhbmNlIiwiZXRoIiwiQ29udHJhY3QiLCJKU09OIiwicGFyc2UiLCJpbnRlcmZhY2UiLCJGQUNUT1JZX0FERFJFU1MiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQU8sQUFBUCxBQUFpQixBQUFqQjs7OztBQUNBLEFBQU8sQUFBUCxBQUE0QixBQUE1Qjs7Ozs7O0lBQ08sQSxZQUFhLFFBQVEsQUFBUix1QkFBK0IsQSxRQUE1QyxBOztBQUVQLElBQU0sV0FBVyxJQUFJLGNBQUssQUFBTCxJQUFTLEFBQWIsU0FDaEIsS0FBSyxBQUFMLE1BQVcsMEJBQWdCLEFBQTNCLEFBRGdCLFlBRWhCLFVBQVUsQUFGTSxBQUFqQixBQUtBOztrQkFBZSxBQUFmIiwiZmlsZSI6ImZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvUGV0by9EZXNrdG9wL2VsZWN0aW9uIn0=