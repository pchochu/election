'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _election = require('../../../ethereum/election');

var _election2 = _interopRequireDefault(_election);

var _semanticUiReact = require('semantic-ui-react');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'C:\\Users\\Peto\\Desktop\\election\\pages\\elections\\candidate\\castVoteProposal.js?entry';


var constants = require('../../../helper/constants').default.constants;

var CastVoteProposal = function (_Component) {
	(0, _inherits3.default)(CastVoteProposal, _Component);

	function CastVoteProposal() {
		var _ref,
		    _this2 = this;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, CastVoteProposal);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CastVoteProposal.__proto__ || (0, _getPrototypeOf2.default)(CastVoteProposal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			login: '',
			errorMessage: '',
			key: '',
			password: '',
			xlogin: ''
		}, _this.downloadTxtFile = function () {
			var element = document.createElement("a");
			var file = new Blob([_this.state.key], { type: 'text/plain' });
			element.href = URL.createObjectURL(file);
			element.download = _this.state.login + " privateKeyForVote.txt";
			document.body.appendChild(element); // Required for this to work in FireFox
			element.click();
		}, _this.onSubmit = function () {
			var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
				var vote, election, rsa_pub_key, response;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								event.preventDefault();
								_this.setState({ errorMessage: '' });
								_this.setState({ key: '' });

								if (!(_this.state.login === '')) {
									_context.next = 6;
									break;
								}

								_this.setState({ errorMessage: 'Nevyplnený login' });
								return _context.abrupt('return');

							case 6:
								if (!(_this.state.password === '')) {
									_context.next = 9;
									break;
								}

								_this.setState({ errorMessage: 'Nevyplnene heslo' });
								return _context.abrupt('return');

							case 9:
								if (!(_this.state.xlogin === '')) {
									_context.next = 12;
									break;
								}

								_this.setState({ errorMessage: 'Nevyplneny xlogin kandidata' });
								return _context.abrupt('return');

							case 12:
								_context.prev = 12;
								_context.next = 15;
								return _axios2.default.get(constants.ADDRESS + '/didUserVote', {
									params: {
										election_address: _this.props.address,
										id_voter: _this.state.login
									}
								});

							case 15:
								vote = _context.sent;

								if (!(vote.data.length > 0)) {
									_context.next = 19;
									break;
								}

								_this.setState({ errorMessage: "Už si hlasoval, nemôžes hlasovať viac krát" });
								return _context.abrupt('return');

							case 19:
								_context.next = 21;
								return (0, _election2.default)(_this.props.address);

							case 21:
								election = _context.sent;
								_context.next = 24;
								return election.methods.RSA_pub_key().call();

							case 24:
								rsa_pub_key = _context.sent;
								_context.next = 27;
								return _axios2.default.put(constants.ADDRESS + '/newVote', {
									address: _this.props.address,
									id_candidate: _this.props.id,
									id_voter: _this.state.login,
									rsa_pub_key: rsa_pub_key
								});

							case 27:
								response = _context.sent;

								// const responseLDAP = await axios.put(constants.ADDRESS +  '/newVoteLDAP', 
								// {
								// 	address: this.props.address,
								// 	id_voter: this.state.login
								// })


								_this.setState({ key: response.data });

								_this.downloadTxtFile();
								alert('Vyborne, zahlasoval si a stiahol sa ti privatny kluc');

								/* 			axios.put(constants.ADDRESS + '/addVotesToCandidates', 
        			{
        			address: this.props.address,
        			id_candidate: this.props.id,
        			eth_candidates: this.props.ethCandidates
        			},
        			).catch(function (error) {
        			console.log(error);
                  });	 */
								_context.next = 35;
								break;

							case 33:
								_context.prev = 33;
								_context.t0 = _context['catch'](12);

							case 35:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this2, [[12, 33]]);
			}));

			return function (_x) {
				return _ref2.apply(this, arguments);
			};
		}(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(CastVoteProposal, [{
		key: 'render',
		value: function render() {
			var _this3 = this;

			return _react2.default.createElement(_Layout2.default, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 134
				}
			}, _react2.default.createElement('h3', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 135
				}
			}, 'Odoslanie hlasu'), _react2.default.createElement(_semanticUiReact.Form, { onSubmit: this.onSubmit, error: !!this.state.errorMessage, success: !!this.state.key, __source: {
					fileName: _jsxFileName,
					lineNumber: 136
				}
			}, _react2.default.createElement(_semanticUiReact.Form.Field, { required: true, __source: {
					fileName: _jsxFileName,
					lineNumber: 137
				}
			}, _react2.default.createElement('label', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 138
				}
			}, 'Login'), _react2.default.createElement(_semanticUiReact.Input, {
				placeholder: 'Login',
				value: this.state.login,
				onChange: function onChange(event) {
					_this3.setState({ errorMessage: '' }), _this3.setState({ login: event.target.value });
				},
				__source: {
					fileName: _jsxFileName,
					lineNumber: 139
				}
			})), _react2.default.createElement(_semanticUiReact.Form.Field, { required: true, __source: {
					fileName: _jsxFileName,
					lineNumber: 146
				}
			}, _react2.default.createElement('label', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 147
				}
			}, 'Heslo'), _react2.default.createElement(_semanticUiReact.Input, {
				type: 'password',
				placeholder: 'Heslo',
				value: this.state.password,
				onChange: function onChange(event) {
					_this3.setState({ errorMessage: '' }), _this3.setState({ password: event.target.value });
				},
				__source: {
					fileName: _jsxFileName,
					lineNumber: 148
				}
			})), _react2.default.createElement(_semanticUiReact.Form.Field, { required: true, __source: {
					fileName: _jsxFileName,
					lineNumber: 156
				}
			}, _react2.default.createElement('label', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 157
				}
			}, 'xlogin kandid\xE1ta'), _react2.default.createElement(_semanticUiReact.Input, {
				placeholder: 'xlogin',
				value: this.state.xlogin,
				onChange: function onChange(event) {
					_this3.setState({ errorMessage: '' }), _this3.setState({ xlogin: event.target.value });
				},
				__source: {
					fileName: _jsxFileName,
					lineNumber: 158
				}
			})), _react2.default.createElement(_semanticUiReact.Message, { error: true, header: 'Ojoj, nie\u010Do sa pokazilo!', content: this.state.errorMessage, __source: {
					fileName: _jsxFileName,
					lineNumber: 165
				}
			}), _react2.default.createElement(_semanticUiReact.Message, { success: true, header: 'V\xFDborne!', content: 'Vyborne zahlasoval si a stiahol sa ti kluc!', __source: {
					fileName: _jsxFileName,
					lineNumber: 166
				}
			}), _react2.default.createElement(_semanticUiReact.Button, { color: constants.COLOR, __source: {
					fileName: _jsxFileName,
					lineNumber: 167
				}
			}, 'Odo\u0161li hlas')), _react2.default.createElement(_semanticUiReact.Accordion, { style: { marginTop: '50px', marginBottom: '50px' }, __source: {
					fileName: _jsxFileName,
					lineNumber: 170
				}
			}, _react2.default.createElement(_semanticUiReact.Label, { color: constants.COLOR, size: 'medium', __source: {
					fileName: _jsxFileName,
					lineNumber: 171
				}
			}, 'Priv\xE1tny RSA kl\xFA\u010D'), _react2.default.createElement(_semanticUiReact.Button, { color: constants.COLOR, onClick: this.downloadTxtFile, __source: {
					fileName: _jsxFileName,
					lineNumber: 174
				}
			}, 'Stiahni')));
		}
	}], [{
		key: 'getInitialProps',
		value: function () {
			var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(props) {
				var address;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								address = props.query.address;
								return _context2.abrupt('return', {
									address: address
								});

							case 2:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getInitialProps(_x2) {
				return _ref3.apply(this, arguments);
			}

			return getInitialProps;
		}()
	}]);

	return CastVoteProposal;
}(_react.Component);

exports.default = CastVoteProposal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxlbGVjdGlvbnNcXGNhbmRpZGF0ZVxcY2FzdFZvdGVQcm9wb3NhbC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkxheW91dCIsIkVsZWN0aW9uIiwiRm9ybSIsIkJ1dHRvbiIsIk1lc3NhZ2UiLCJJbnB1dCIsIkFjY29yZGlvbiIsIkxhYmVsIiwiYXhpb3MiLCJjb25zdGFudHMiLCJyZXF1aXJlIiwiZGVmYXVsdCIsIkNhc3RWb3RlUHJvcG9zYWwiLCJzdGF0ZSIsImxvZ2luIiwiZXJyb3JNZXNzYWdlIiwia2V5IiwicGFzc3dvcmQiLCJ4bG9naW4iLCJkb3dubG9hZFR4dEZpbGUiLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZmlsZSIsIkJsb2IiLCJ0eXBlIiwiaHJlZiIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImRvd25sb2FkIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xpY2siLCJvblN1Ym1pdCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzZXRTdGF0ZSIsImdldCIsIkFERFJFU1MiLCJwYXJhbXMiLCJlbGVjdGlvbl9hZGRyZXNzIiwicHJvcHMiLCJhZGRyZXNzIiwiaWRfdm90ZXIiLCJ2b3RlIiwiZGF0YSIsImxlbmd0aCIsImVsZWN0aW9uIiwibWV0aG9kcyIsIlJTQV9wdWJfa2V5IiwiY2FsbCIsInJzYV9wdWJfa2V5IiwicHV0IiwiaWRfY2FuZGlkYXRlIiwiaWQiLCJyZXNwb25zZSIsImFsZXJ0IiwidGFyZ2V0IiwidmFsdWUiLCJDT0xPUiIsIm1hcmdpblRvcCIsIm1hcmdpbkJvdHRvbSIsInF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFROzs7O0FBQ2YsQUFBTyxBQUFZOzs7O0FBQ25CLEFBQU8sQUFBYzs7OztBQUNyQixBQUFRLEFBQU0sQUFBUSxBQUFTLEFBQU8sQUFBVzs7QUFDakQsQUFBTzs7Ozs7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QUVDLEFBUWlCO0FBUmpCO0FBQ0Msd0JBT2lCLGNBQUQsc0JBQUEsQUFBTSxTQUFNLFVBQVo7ZUFBQTtpQkFBQSxBQUNqQjtBQURpQjtzQkFDakIsY0FBQTs7ZUFBQTtpQkFBQTtBQUFBO0FBQUEsTUFEaUIsQUFDakIsQUFDQSx3Q0FBQSxBQUFDO2lCQUFELEFBQ2EsQUFDWjtXQUFPLEtBQUEsQUFBSyxNQUZiLEFBRW1CLEFBQ2xCO2NBQVUseUJBQVEsQUFBQztZQUFBLEFBQUssU0FBUyxFQUFDLGNBQWYsQUFBYyxBQUFjLE9BQU0sT0FBQSxBQUFLLFNBQVMsRUFBQyxRQUFRLE1BQUEsQUFBTSxPQUEvRCxBQUFrQyxBQUFjLEFBQXNCLEFBQVE7QUFIbEc7O2VBQUE7aUJBdEJGLEFBb0JtQixBQUVqQixBQU9EO0FBUEM7QUFDQyx3QkFNRixBQUFDLDBDQUFRLE9BQVQsTUFBZSxRQUFmLEFBQXNCLGlDQUEyQixTQUFTLEtBQUEsQUFBSyxNQUEvRCxBQUFxRTtlQUFyRTtpQkE3QkQsQUE2QkMsQUFDQTtBQURBO3VCQUNBLEFBQUMsMENBQVEsU0FBVCxNQUFpQixRQUFqQixBQUF3QixlQUFXLFNBQW5DLEFBQTRDO2VBQTVDO2lCQTlCRCxBQThCQyxBQUNBO0FBREE7dUJBQ0EsQUFBQyx5Q0FBTyxPQUFPLFVBQWYsQUFBeUI7ZUFBekI7aUJBQUE7QUFBQTtNQWpDSCxBQUVFLEFBK0JDLEFBR0Qsc0NBQUEsQUFBQyw0Q0FBVSxPQUFPLEVBQUUsV0FBRixBQUFhLFFBQVEsY0FBdkMsQUFBa0IsQUFBbUM7ZUFBckQ7aUJBQUEsQUFDQztBQUREO3NCQUNDLEFBQUMsd0NBQU0sT0FBTyxVQUFkLEFBQXdCLE9BQU8sTUFBL0IsQUFBcUM7ZUFBckM7aUJBQUE7QUFBQTtNQURELEFBQ0MsQUFHQSxpREFBQSxBQUFDLHlDQUFPLE9BQU8sVUFBZixBQUF5QixPQUFPLFNBQVMsS0FBekMsQUFBOEM7ZUFBOUM7aUJBQUE7QUFBQTtNQXpDSixBQUNDLEFBb0NFLEFBSUMsQUFJSjs7Ozs7MEdBaks0QixBOzs7OztZQUNyQjtBLGtCQUFXLE1BQU0sQSxNQUFqQixBOztrQkFFQSxBQUNHLEE7QUFESCxBQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYjRCLEEsQUE2Sy9COztrQkFBQSxBQUFlIiwiZmlsZSI6ImNhc3RWb3RlUHJvcG9zYWwuanM/ZW50cnkiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvUGV0by9EZXNrdG9wL2VsZWN0aW9uIn0=