'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _Election = require('./build/Election.json');

var _Election2 = _interopRequireDefault(_Election);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (address) {
	return new _web2.default.eth.Contract(JSON.parse(_Election2.default.interface), address);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2VsZWN0aW9uLmpzIl0sIm5hbWVzIjpbIndlYjMiLCJFbGVjdGlvbiIsImFkZHJlc3MiLCJldGgiLCJDb250cmFjdCIsIkpTT04iLCJwYXJzZSIsImludGVyZmFjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTyxBQUFQLEFBQWlCLEFBQWpCOzs7O0FBQ0EsQUFBTyxBQUFQLEFBQXFCLEFBQXJCLEFBRUE7Ozs7OztrQkFBZSxVQUFDLEFBQUQsU0FBYSxBQUMzQjtRQUFPLElBQUksY0FBSyxBQUFMLElBQVMsQUFBYixTQUNOLEtBQUssQUFBTCxNQUFXLG1CQUFTLEFBQXBCLEFBRE0sWUFFTixBQUZNLEFBQVAsQUFJQTtBQUxEIiwiZmlsZSI6ImVsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3BldGVyL0Rlc2t0b3AvcHJvamVjdHMvZWxlY3Rpb24ifQ==