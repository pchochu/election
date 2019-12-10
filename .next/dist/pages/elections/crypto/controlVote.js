'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _Layout = require('../../../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _semanticUiReact = require('semantic-ui-react');

var _factory = require('../../../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

var _election = require('../../../ethereum/election');

var _election2 = _interopRequireDefault(_election);

var _routes = require('../../../routes');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/peter/Desktop/projects/election/pages/elections/crypto/controlVote.js?entry';


var constants = require('../../../helper/constants').default.constants;

var ControlVote = function (_Component) {
    (0, _inherits3.default)(ControlVote, _Component);

    function ControlVote() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, ControlVote);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ControlVote.__proto__ || (0, _getPrototypeOf2.default)(ControlVote)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            value: '',
            errorMessage: ''
        }, _this.onSubmit = function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:

                                if (_this.state.value == '') {
                                    _this.setState({ errorMessage: 'Nevybral si si žiadne volby' });
                                } else {
                                    _routes.Router.pushRoute('/elections/' + _this.state.value + '/crypto/controlVoteAtAddress');
                                }

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2);
            }));

            return function (_x) {
                return _ref2.apply(this, arguments);
            };
        }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(ControlVote, [{
        key: 'render',
        value: function render() {
            var _this3 = this,
                _React$createElement;

            return _react2.default.createElement(_Layout2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 67
                }
            }, _react2.default.createElement('h2', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 68
                }
            }, 'Kontrola hlasu'), _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 69
                }
            }, _react2.default.createElement(_semanticUiReact.Form, { onSubmit: this.onSubmit, error: !!this.state.errorMessage, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 70
                }
            }, _react2.default.createElement(_semanticUiReact.Dropdown, (_React$createElement = {
                placeholder: 'Vyber vo\u013Eby',
                onChange: this.handleSelectChange,
                fluid: true,
                selection: true,
                value: this.state.value,
                options: this.props.electionSelect
                //value={this.props.electionSelect['address']}
            }, (0, _defineProperty3.default)(_React$createElement, 'onChange', function onChange(e, _ref3) {
                var value = _ref3.value;
                return _this3.setState({ value: value });
            }), (0, _defineProperty3.default)(_React$createElement, '__source', {
                fileName: _jsxFileName,
                lineNumber: 71
            }), _React$createElement)), _react2.default.createElement(_semanticUiReact.Message, { style: { marginTop: '0.8rem' }, error: true, header: 'Ojoj, nie\u010Do sa pokazilo!', content: this.state.errorMessage, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 81
                }
            }), _react2.default.createElement(_semanticUiReact.Button, { style: { marginTop: '0.8rem' }, color: constants.COLOR, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 82
                }
            }, '\u010Ealej'))));
        }
    }], [{
        key: 'getInitialProps',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                var _this4 = this;

                var elections, electionSelect, endedElections, electionInfo;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return _factory2.default.methods.getDeployedElections().call();

                            case 2:
                                elections = _context4.sent;
                                electionSelect = void 0;

                                if (!(elections[0] != undefined)) {
                                    _context4.next = 14;
                                    break;
                                }

                                _context4.next = 7;
                                return _promise2.default.all(elections.map(function () {
                                    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(address) {
                                        var election, winnerId, closedElection;
                                        return _regenerator2.default.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        election = (0, _election2.default)(address);
                                                        _context2.next = 3;
                                                        return election.methods.id_winner().call();

                                                    case 3:
                                                        winnerId = _context2.sent;
                                                        closedElection = void 0;

                                                        if (winnerId != 0) {
                                                            closedElection = address;
                                                        }
                                                        return _context2.abrupt('return', closedElection);

                                                    case 7:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this4);
                                    }));

                                    return function (_x2) {
                                        return _ref5.apply(this, arguments);
                                    };
                                }()));

                            case 7:
                                endedElections = _context4.sent;
                                _context4.next = 10;
                                return _promise2.default.all(endedElections.filter(function (el) {
                                    if (el != undefined) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }).map(function () {
                                    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(address) {
                                        var election, summary;
                                        return _regenerator2.default.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        election = (0, _election2.default)(address);
                                                        _context3.next = 3;
                                                        return election.methods.getSummary().call();

                                                    case 3:
                                                        summary = _context3.sent;
                                                        return _context3.abrupt('return', { name: summary[3], address: address });

                                                    case 5:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this4);
                                    }));

                                    return function (_x3) {
                                        return _ref6.apply(this, arguments);
                                    };
                                }()));

                            case 10:
                                electionInfo = _context4.sent;

                                electionSelect = _lodash2.default.map(electionInfo, function (election) {
                                    return {
                                        key: election['address'],
                                        text: '' + election['name'] + '      ------->    ' + election['address'],
                                        value: election['address']
                                    };
                                });
                                _context4.next = 15;
                                break;

                            case 14:
                                electionSelect = null;

                            case 15:
                                return _context4.abrupt('return', { electionSelect: electionSelect });

                            case 16:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getInitialProps() {
                return _ref4.apply(this, arguments);
            }

            return getInitialProps;
        }()
    }]);

    return ControlVote;
}(_react.Component);

exports.default = ControlVote;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2VsZWN0aW9ucy9jcnlwdG8vY29udHJvbFZvdGUuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJMYXlvdXQiLCJGb3JtIiwiQnV0dG9uIiwiTWVzc2FnZSIsIkRyb3Bkb3duIiwiZmFjdG9yeSIsIkVsZWN0aW9uIiwiUm91dGVyIiwiXyIsImNvbnN0YW50cyIsInJlcXVpcmUiLCJkZWZhdWx0IiwiQ29udHJvbFZvdGUiLCJzdGF0ZSIsInZhbHVlIiwiZXJyb3JNZXNzYWdlIiwib25TdWJtaXQiLCJldmVudCIsInNldFN0YXRlIiwicHVzaFJvdXRlIiwiaGFuZGxlU2VsZWN0Q2hhbmdlIiwicHJvcHMiLCJlbGVjdGlvblNlbGVjdCIsImUiLCJtYXJnaW5Ub3AiLCJDT0xPUiIsIm1ldGhvZHMiLCJnZXREZXBsb3llZEVsZWN0aW9ucyIsImNhbGwiLCJlbGVjdGlvbnMiLCJ1bmRlZmluZWQiLCJhbGwiLCJtYXAiLCJhZGRyZXNzIiwiZWxlY3Rpb24iLCJpZF93aW5uZXIiLCJ3aW5uZXJJZCIsImNsb3NlZEVsZWN0aW9uIiwiZW5kZWRFbGVjdGlvbnMiLCJmaWx0ZXIiLCJlbCIsImdldFN1bW1hcnkiLCJzdW1tYXJ5IiwibmFtZSIsImVsZWN0aW9uSW5mbyIsImtleSIsInRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBUyxBQUFNLEFBQVEsQUFBUzs7QUFDaEMsQUFBTyxBQUFhOzs7O0FBQ3BCLEFBQU8sQUFBYzs7OztBQUNyQixBQUFTLEFBQWM7O0FBQ3ZCLEFBQU87Ozs7Ozs7OztJLEFBQ0EsWUFBYSxRQUFBLEFBQVEsNkIsQUFBNkIsUSxBQUFsRDs7SSxBQUVEOzs7Ozs7Ozs7Ozs7Ozs7ME5BRUYsQTttQkFBUSxBQUNHLEFBQ1A7MEJBRkksQUFFVSxBO0FBRlYsQUFDSixpQkEyQ0osQTtp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QUFJLFNBSHJCLEFBR0csQUFBMEI7O3lEQUg3Qjt5REFBQTt5RUFBQTs7QUFBQTtxREFBQTtBQUwyQjs7MERBQUE7aUVBQUE7QUFBQTtBLEFBQVosb0NBQUE7O2lDQUFyQjtBLHlEQVdOOztrRUFBaUIsQUFBRSxJQUFGLEFBQU0sY0FBYyxvQkFBQTs7NkNBQzVCLFNBRHlDLEFBQ3pDLEFBQVMsQUFDZDs4Q0FBTSxLQUFLLFNBQUwsQUFBSyxBQUFTLFVBQWQsQUFBd0IsdUJBQXVCLFNBRlAsQUFFTyxBQUFTLEFBQzlEOytDQUFPLFNBSDBCLEFBQWEsQUFHdkMsQUFBUztBQUg4QixBQUM5QztBQURKLEFBQWlCLGlDQUFBOzs7O2lDQU1qQjtpREFBQSxBQUFpQjs7O2tFQUdwQixFQUFFLGdCQUFGLEE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEzQ2lCLEEsQUFnRjFCOztrQkFBQSxBQUFlIiwiZmlsZSI6ImNvbnRyb2xWb3RlLmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9ob21lL3BldGVyL0Rlc2t0b3AvcHJvamVjdHMvZWxlY3Rpb24ifQ==