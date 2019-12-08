'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'C:\\Users\\Peto\\Desktop\\election\\components\\Header.js';


var constants = require('../helper/constants').default.constants;

exports.default = function () {
	return _react2.default.createElement(_semanticUiReact.Menu, { fixed: 'top', inverted: true, color: constants.COLOR, borderless: true, __source: {
			fileName: _jsxFileName,
			lineNumber: 8
		}
	}, _react2.default.createElement(_semanticUiReact.Container, {
		__source: {
			fileName: _jsxFileName,
			lineNumber: 9
		}
	}, _react2.default.createElement(_routes.Link, { route: '/', __source: {
			fileName: _jsxFileName,
			lineNumber: 10
		}
	}, _react2.default.createElement(_semanticUiReact.Menu.Item, { as: 'a', header: true, __source: {
			fileName: _jsxFileName,
			lineNumber: 11
		}
	}, _react2.default.createElement(_semanticUiReact.Image, { size: 'mini', src: 'https://procesy.pef.mendelu.cz/images/logo.png', style: { marginRight: '1.5em' }, __source: {
			fileName: _jsxFileName,
			lineNumber: 12
		}
	}), 'Hlavn\xE1 str\xE1nka')), _react2.default.createElement(_routes.Link, { route: '/elections/crypto/controlVote', __source: {
			fileName: _jsxFileName,
			lineNumber: 17
		}
	}, _react2.default.createElement(_semanticUiReact.Menu.Item, { as: 'a', header: true, __source: {
			fileName: _jsxFileName,
			lineNumber: 18
		}
	}, _react2.default.createElement(_semanticUiReact.Image, { size: 'mini', src: 'https://images.vexels.com/media/users/3/129762/isolated/preview/b8013d3077f62d29bce2664db694246b-check-flat-icon-by-vexels.png', style: { marginRight: '1.5em' }, __source: {
			fileName: _jsxFileName,
			lineNumber: 19
		}
	}), 'Skontroluj hlas')), _react2.default.createElement(_semanticUiReact.Menu.Menu, { position: 'right', __source: {
			fileName: _jsxFileName,
			lineNumber: 24
		}
	}, _react2.default.createElement(_routes.Link, { route: '/elections/administration/authenticationElection', __source: {
			fileName: _jsxFileName,
			lineNumber: 25
		}
	}, _react2.default.createElement('a', { className: 'item', __source: {
			fileName: _jsxFileName,
			lineNumber: 26
		}
	}, _react2.default.createElement(_semanticUiReact.Icon, { name: 'settings', __source: {
			fileName: _jsxFileName,
			lineNumber: 27
		}
	}), 'Spr\xE1va volieb')), _react2.default.createElement(_routes.Link, { route: '/elections/administration/authentication', __source: {
			fileName: _jsxFileName,
			lineNumber: 31
		}
	}, _react2.default.createElement('a', { className: 'item', __source: {
			fileName: _jsxFileName,
			lineNumber: 32
		}
	}, _react2.default.createElement(_semanticUiReact.Icon, { name: 'settings', __source: {
			fileName: _jsxFileName,
			lineNumber: 33
		}
	}), 'Administr\xE1cia volieb')))));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXEhlYWRlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIk1lbnUiLCJDb250YWluZXIiLCJJbWFnZSIsIkRyb3Bkb3duIiwiSWNvbiIsIkxpbmsiLCJjb25zdGFudHMiLCJyZXF1aXJlIiwiZGVmYXVsdCIsIkNPTE9SIiwibWFyZ2luUmlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFRLEFBQU0sQUFBVyxBQUFPLEFBQVU7O0FBQzFDLEFBQVEsQUFBVzs7Ozs7OztJQUNaLEEsWUFBYSxRQUFBLEFBQVEsdUIsQUFBdUIsUUFFbkQsQSxBQUZPOztrQkFFUSxZQUFNLEFBQ3BCO3dCQUNDLEFBQUMsdUNBQUssT0FBTixBQUFZLE9BQU0sVUFBbEIsTUFBMkIsT0FBTyxVQUFsQyxBQUE0QyxPQUFPLFlBQW5EO2FBQUE7ZUFBQSxBQUNDO0FBREQ7RUFBQSxrQkFDQyxBQUFDOzthQUFEO2VBQUEsQUFDQztBQUREO0FBQUEsb0JBQ0MsQUFBQyw4QkFBSyxPQUFOLEFBQVk7YUFBWjtlQUFBLEFBQ0U7QUFERjtvQkFDRyxjQUFELHNCQUFBLEFBQU0sUUFBSyxJQUFYLEFBQWMsS0FBSSxRQUFsQjthQUFBO2VBQUEsQUFDQztBQUREO29CQUNDLEFBQUMsd0NBQU0sTUFBUCxBQUFZLFFBQU8sS0FBbkIsQUFBdUIsa0RBQWlELE9BQU8sRUFBRSxhQUFqRixBQUErRSxBQUFlO2FBQTlGO2VBREQsQUFDQztBQUFBO0tBSEosQUFDQyxBQUNFLEFBTUYsMENBQUEsQUFBQyw4QkFBSyxPQUFOLEFBQVk7YUFBWjtlQUFBLEFBQ0U7QUFERjtvQkFDRyxjQUFELHNCQUFBLEFBQU0sUUFBSyxJQUFYLEFBQWMsS0FBSSxRQUFsQjthQUFBO2VBQUEsQUFDQztBQUREO29CQUNDLEFBQUMsd0NBQU0sTUFBUCxBQUFZLFFBQU8sS0FBbkIsQUFBdUIsa0lBQWlJLE9BQU8sRUFBRSxhQUFqSyxBQUErSixBQUFlO2FBQTlLO2VBREQsQUFDQztBQUFBO0tBVkosQUFRQyxBQUNFLEFBTUgscUNBQUMsY0FBRCxzQkFBQSxBQUFNLFFBQUssVUFBWCxBQUFvQjthQUFwQjtlQUFBLEFBQ0M7QUFERDtvQkFDQyxBQUFDLDhCQUFLLE9BQU4sQUFBWTthQUFaO2VBQUEsQUFDQztBQUREO29CQUNDLGNBQUEsT0FBRyxXQUFILEFBQWE7YUFBYjtlQUFBLEFBQ0E7QUFEQTtvQkFDQSxBQUFDLHVDQUFLLE1BQU4sQUFBVzthQUFYO2VBREEsQUFDQTtBQUFBO0tBSEYsQUFDQyxBQUNDLEFBS0Qsc0NBQUEsQUFBQyw4QkFBSyxPQUFOLEFBQVk7YUFBWjtlQUFBLEFBQ0M7QUFERDtvQkFDQyxjQUFBLE9BQUcsV0FBSCxBQUFhO2FBQWI7ZUFBQSxBQUNBO0FBREE7b0JBQ0EsQUFBQyx1Q0FBSyxNQUFOLEFBQVc7YUFBWDtlQURBLEFBQ0E7QUFBQTtLQTFCSixBQUNDLEFBQ0MsQUFlQSxBQU9DLEFBQ0MsQUFVSjtBQXBDRCIsImZpbGUiOiJIZWFkZXIuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvUGV0by9EZXNrdG9wL2VsZWN0aW9uIn0=