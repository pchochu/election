'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'C:\\Users\\Peto\\Desktop\\election\\components\\CardClosed.js';


var CardFinished = function (_Component) {
    (0, _inherits3.default)(CardFinished, _Component);

    function CardFinished() {
        (0, _classCallCheck3.default)(this, CardFinished);

        return (0, _possibleConstructorReturn3.default)(this, (CardFinished.__proto__ || (0, _getPrototypeOf2.default)(CardFinished)).apply(this, arguments));
    }

    (0, _createClass3.default)(CardFinished, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_semanticUiReact.Card.Group, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 9
                }
            }, _react2.default.createElement(_semanticUiReact.Card, { style: { width: '500px' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 10
                }
            }, _react2.default.createElement(_semanticUiReact.Card.Content, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 11
                }
            }, _react2.default.createElement(_semanticUiReact.Card.Header, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 12
                }
            }, 'Uzavret\xE9 vo\u013Eby s n\xE1zvom: ', this.props.name), _react2.default.createElement(_semanticUiReact.Card.Description, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 13
                }
            }, this.props.address)), _react2.default.createElement(_semanticUiReact.Card.Content, { extra: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 15
                }
            }, _react2.default.createElement(_semanticUiReact.Message, { info: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 16
                }
            }, _react2.default.createElement(_semanticUiReact.Message.Header, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 17
                }
            }, 'V\xED\u0165az volieb'), _react2.default.createElement(_semanticUiReact.Message.List, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 18
                }
            }, _react2.default.createElement(_semanticUiReact.Message.Item, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 19
                }
            }, 'V\xED\u0165azom volieb je kandid\xE1t: ', this.props.winner['last_name']), _react2.default.createElement(_semanticUiReact.Message.Item, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 20
                }
            }, 'Po\u010Det hlasov: ', this.props.winner['numOfVotesWinner']))))));
        }
    }]);

    return CardFinished;
}(_react.Component);

exports.default = CardFinished;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXENhcmRDbG9zZWQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJCdXR0b24iLCJDYXJkIiwiSWNvbiIsIk1lc3NhZ2UiLCJSb3V0ZXIiLCJDYXJkRmluaXNoZWQiLCJ3aWR0aCIsInByb3BzIiwibmFtZSIsImFkZHJlc3MiLCJ3aW5uZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFROzs7O0FBQ2YsQUFBUyxBQUFRLEFBQU0sQUFBTTs7QUFDN0IsQUFBUSxBQUFhOzs7Ozs7O0lBRWYsQTs7Ozs7Ozs7Ozs7aUNBRU0sQUFDSjttQ0FDSyxjQUFELHNCQUFBLEFBQU07OzhCQUFOO2dDQUFBLEFBQ0k7QUFESjtBQUFBLGFBQUEsa0JBQ0ksQUFBQyx1Q0FBSyxPQUFPLEVBQUMsT0FBZCxBQUFhLEFBQU87OEJBQXBCO2dDQUFBLEFBQ0E7QUFEQTsrQkFDQyxjQUFELHNCQUFBLEFBQU07OzhCQUFOO2dDQUFBLEFBQ0k7QUFESjtBQUFBLCtCQUNLLGNBQUQsc0JBQUEsQUFBTTs7OEJBQU47Z0NBQUE7QUFBQTtBQUFBLGVBQXVDLDZDQUFBLEFBQUssTUFEaEQsQUFDSSxBQUFrRCxBQUNsRCx1QkFBQyxjQUFELHNCQUFBLEFBQU07OzhCQUFOO2dDQUFBLEFBQW1CO0FBQW5CO0FBQUEsb0JBQW1CLEFBQUssTUFINUIsQUFDQSxBQUVJLEFBQThCLEFBRWxDLDJCQUFDLGNBQUQsc0JBQUEsQUFBTSxXQUFRLE9BQWQ7OEJBQUE7Z0NBQUEsQUFDQTtBQURBOytCQUNBLEFBQUMsMENBQVEsTUFBVDs4QkFBQTtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ssY0FBRCx5QkFBQSxBQUFTOzs4QkFBVDtnQ0FBQTtBQUFBO0FBQUEsZUFESixBQUNJLEFBQ0EseUNBQUMsY0FBRCx5QkFBQSxBQUFTOzs4QkFBVDtnQ0FBQSxBQUNJO0FBREo7QUFBQSwrQkFDSyxjQUFELHlCQUFBLEFBQVM7OzhCQUFUO2dDQUFBO0FBQUE7QUFBQSxlQUEyQyxnREFBQSxBQUFLLE1BQUwsQUFBVyxPQUQxRCxBQUNJLEFBQTJDLEFBQWtCLEFBQzdELCtCQUFDLGNBQUQseUJBQUEsQUFBUzs7OEJBQVQ7Z0NBQUE7QUFBQTtBQUFBLGVBQTZCLDRCQUFBLEFBQUssTUFBTCxBQUFXLE9BWnhELEFBQ0ksQUFDSSxBQUtBLEFBQ0EsQUFFSSxBQUVJLEFBQTZCLEFBQWtCLEFBT2xFOzs7OztBQXRCc0IsQSxBQXlCM0I7O2tCQUFBLEFBQWUiLCJmaWxlIjoiQ2FyZENsb3NlZC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9QZXRvL0Rlc2t0b3AvZWxlY3Rpb24ifQ==