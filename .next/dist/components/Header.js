'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/peter/Desktop/projects/election/components/Header.js';


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvSGVhZGVyLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiTWVudSIsIkNvbnRhaW5lciIsIkltYWdlIiwiRHJvcGRvd24iLCJJY29uIiwiTGluayIsImNvbnN0YW50cyIsInJlcXVpcmUiLCJkZWZhdWx0IiwiQ09MT1IiLCJtYXJnaW5SaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQVEsQUFBTSxBQUFXLEFBQU8sQUFBVTs7QUFDMUMsQUFBUSxBQUFXOzs7Ozs7O0lBQ1osQSxZQUFhLFFBQUEsQUFBUSx1QixBQUF1QixRQUVuRCxBLEFBRk87O2tCQUVRLFlBQU0sQUFDcEI7d0JBQ0MsQUFBQyx1Q0FBSyxPQUFOLEFBQVksT0FBTSxVQUFsQixNQUEyQixPQUFPLFVBQWxDLEFBQTRDLE9BQU8sWUFBbkQ7YUFBQTtlQUFBLEFBQ0M7QUFERDtFQUFBLGtCQUNDLEFBQUM7O2FBQUQ7ZUFBQSxBQUNDO0FBREQ7QUFBQSxvQkFDQyxBQUFDLDhCQUFLLE9BQU4sQUFBWTthQUFaO2VBQUEsQUFDRTtBQURGO29CQUNHLGNBQUQsc0JBQUEsQUFBTSxRQUFLLElBQVgsQUFBYyxLQUFJLFFBQWxCO2FBQUE7ZUFBQSxBQUNDO0FBREQ7b0JBQ0MsQUFBQyx3Q0FBTSxNQUFQLEFBQVksUUFBTyxLQUFuQixBQUF1QixrREFBaUQsT0FBTyxFQUFFLGFBQWpGLEFBQStFLEFBQWU7YUFBOUY7ZUFERCxBQUNDO0FBQUE7S0FISixBQUNDLEFBQ0UsQUFNRiwwQ0FBQSxBQUFDLDhCQUFLLE9BQU4sQUFBWTthQUFaO2VBQUEsQUFDRTtBQURGO29CQUNHLGNBQUQsc0JBQUEsQUFBTSxRQUFLLElBQVgsQUFBYyxLQUFJLFFBQWxCO2FBQUE7ZUFBQSxBQUNDO0FBREQ7b0JBQ0MsQUFBQyx3Q0FBTSxNQUFQLEFBQVksUUFBTyxLQUFuQixBQUF1QixrSUFBaUksT0FBTyxFQUFFLGFBQWpLLEFBQStKLEFBQWU7YUFBOUs7ZUFERCxBQUNDO0FBQUE7S0FWSixBQVFDLEFBQ0UsQUFNSCxxQ0FBQyxjQUFELHNCQUFBLEFBQU0sUUFBSyxVQUFYLEFBQW9CO2FBQXBCO2VBQUEsQUFDQztBQUREO29CQUNDLEFBQUMsOEJBQUssT0FBTixBQUFZO2FBQVo7ZUFBQSxBQUNDO0FBREQ7b0JBQ0MsY0FBQSxPQUFHLFdBQUgsQUFBYTthQUFiO2VBQUEsQUFDQTtBQURBO29CQUNBLEFBQUMsdUNBQUssTUFBTixBQUFXO2FBQVg7ZUFEQSxBQUNBO0FBQUE7S0FIRixBQUNDLEFBQ0MsQUFLRCxzQ0FBQSxBQUFDLDhCQUFLLE9BQU4sQUFBWTthQUFaO2VBQUEsQUFDQztBQUREO29CQUNDLGNBQUEsT0FBRyxXQUFILEFBQWE7YUFBYjtlQUFBLEFBQ0E7QUFEQTtvQkFDQSxBQUFDLHVDQUFLLE1BQU4sQUFBVzthQUFYO2VBREEsQUFDQTtBQUFBO0tBMUJKLEFBQ0MsQUFDQyxBQWVBLEFBT0MsQUFDQyxBQVVKO0FBcENEIiwiZmlsZSI6IkhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9wZXRlci9EZXNrdG9wL3Byb2plY3RzL2VsZWN0aW9uIn0=