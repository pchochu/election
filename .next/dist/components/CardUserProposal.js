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

var _jsxFileName = 'C:\\Users\\Peto\\Desktop\\election\\components\\CardUserProposal.js';


var CardUserProposal = function (_Component) {
    (0, _inherits3.default)(CardUserProposal, _Component);

    function CardUserProposal() {
        (0, _classCallCheck3.default)(this, CardUserProposal);

        return (0, _possibleConstructorReturn3.default)(this, (CardUserProposal.__proto__ || (0, _getPrototypeOf2.default)(CardUserProposal)).apply(this, arguments));
    }

    (0, _createClass3.default)(CardUserProposal, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

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
            }, this.props.name), _react2.default.createElement(_semanticUiReact.Card.Description, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 13
                }
            }, this.props.address)), _react2.default.createElement(_semanticUiReact.Card.Content, { extra: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 15
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { animated: true, onClick: function onClick() {
                    event.preventDefault();
                    _routes.Router.pushRoute('/elections/candidate/' + _this2.props.address + '/castVoteProposal/');
                }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 16
                }
            }, _react2.default.createElement(_semanticUiReact.Button.Content, { visible: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 20
                }
            }, 'Navrhni kandid\xE1ta'), _react2.default.createElement(_semanticUiReact.Button.Content, { hidden: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 21
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'road', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 22
                }
            }))))));
        }
    }]);

    return CardUserProposal;
}(_react.Component);

exports.default = CardUserProposal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXENhcmRVc2VyUHJvcG9zYWwuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJCdXR0b24iLCJDYXJkIiwiSWNvbiIsIlJvdXRlciIsIkNhcmRVc2VyUHJvcG9zYWwiLCJ3aWR0aCIsInByb3BzIiwibmFtZSIsImFkZHJlc3MiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwicHVzaFJvdXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUTs7OztBQUNmLEFBQVMsQUFBUSxBQUFNOztBQUN2QixBQUFRLEFBQWE7Ozs7Ozs7SSxBQUVmOzs7Ozs7Ozs7OztpQ0FFTTt5QkFDSjs7bUNBQ0ssY0FBRCxzQkFBQSxBQUFNOzs4QkFBTjtnQ0FBQSxBQUNJO0FBREo7QUFBQSxhQUFBLGtCQUNJLEFBQUMsdUNBQUssT0FBTyxFQUFDLE9BQWQsQUFBYSxBQUFPOzhCQUFwQjtnQ0FBQSxBQUNBO0FBREE7K0JBQ0MsY0FBRCxzQkFBQSxBQUFNOzs4QkFBTjtnQ0FBQSxBQUNJO0FBREo7QUFBQSwrQkFDSyxjQUFELHNCQUFBLEFBQU07OzhCQUFOO2dDQUFBLEFBQWM7QUFBZDtBQUFBLG9CQUFjLEFBQUssTUFEdkIsQUFDSSxBQUF5QixBQUN6Qix1QkFBQyxjQUFELHNCQUFBLEFBQU07OzhCQUFOO2dDQUFBLEFBQW1CO0FBQW5CO0FBQUEsb0JBQW1CLEFBQUssTUFINUIsQUFDQSxBQUVJLEFBQThCLEFBRWxDLDJCQUFDLGNBQUQsc0JBQUEsQUFBTSxXQUFRLE9BQWQ7OEJBQUE7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMseUNBQU8sVUFBUixNQUFpQixTQUFVLG1CQUFLLEFBQ3hCOzBCQUFBLEFBQU0sQUFDTjttQ0FBQSxBQUFPLG9DQUFrQyxPQUFBLEFBQUssTUFBOUMsQUFBb0QsVUFDdkQ7QUFITDs4QkFBQTtnQ0FBQSxBQUlBO0FBSkE7K0JBSUMsY0FBRCx3QkFBQSxBQUFRLFdBQVEsU0FBaEI7OEJBQUE7Z0NBQUE7QUFBQTtlQUpBLEFBSUEsQUFDQSx5Q0FBQyxjQUFELHdCQUFBLEFBQVEsV0FBUSxRQUFoQjs4QkFBQTtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyx1Q0FBSyxNQUFOLEFBQVc7OEJBQVg7Z0NBZGhCLEFBQ0ksQUFDSSxBQUtBLEFBQ0ksQUFLQSxBQUNJLEFBT25CO0FBUG1COzs7Ozs7QUFqQk8sQSxBQTJCL0I7O2tCQUFBLEFBQWUiLCJmaWxlIjoiQ2FyZFVzZXJQcm9wb3NhbC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9QZXRvL0Rlc2t0b3AvZWxlY3Rpb24ifQ==