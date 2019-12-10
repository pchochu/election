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

var _jsxFileName = '/home/peter/Desktop/projects/election/pages/elections/candidate/castVoteProposal.js?entry';


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
				var vote, election, rsa_pub_key, response, responseLDAP;
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
								return _axios2.default.get(constants.ADDRESS + '/didUserVoteProposal', {
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

								_this.setState({ errorMessage: "Už si navrhol kandidata, nemôžes navrhnut viac kandidatov" });
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
								return _axios2.default.put(constants.ADDRESS + '/newVoteProposal', {
									address: _this.props.address,
									id_candidate: _this.state.xlogin,
									id_voter: _this.state.login,
									rsa_pub_key: rsa_pub_key
								});

							case 27:
								response = _context.sent;
								_context.next = 30;
								return _axios2.default.put(constants.ADDRESS + '/newVoteLDAPProposal', {
									address: _this.props.address,
									id_voter: _this.state.login
								});

							case 30:
								responseLDAP = _context.sent;

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
								_context.next = 38;
								break;

							case 36:
								_context.prev = 36;
								_context.t0 = _context['catch'](12);

							case 38:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this2, [[12, 36]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2VsZWN0aW9ucy9jYW5kaWRhdGUvY2FzdFZvdGVQcm9wb3NhbC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkxheW91dCIsIkVsZWN0aW9uIiwiRm9ybSIsIkJ1dHRvbiIsIk1lc3NhZ2UiLCJJbnB1dCIsIkFjY29yZGlvbiIsIkxhYmVsIiwiYXhpb3MiLCJjb25zdGFudHMiLCJyZXF1aXJlIiwiZGVmYXVsdCIsIkNhc3RWb3RlUHJvcG9zYWwiLCJzdGF0ZSIsImxvZ2luIiwiZXJyb3JNZXNzYWdlIiwia2V5IiwicGFzc3dvcmQiLCJ4bG9naW4iLCJkb3dubG9hZFR4dEZpbGUiLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZmlsZSIsIkJsb2IiLCJ0eXBlIiwiaHJlZiIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImRvd25sb2FkIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xpY2siLCJvblN1Ym1pdCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzZXRTdGF0ZSIsImdldCIsIkFERFJFU1MiLCJwYXJhbXMiLCJlbGVjdGlvbl9hZGRyZXNzIiwicHJvcHMiLCJhZGRyZXNzIiwiaWRfdm90ZXIiLCJ2b3RlIiwiZGF0YSIsImxlbmd0aCIsImVsZWN0aW9uIiwibWV0aG9kcyIsIlJTQV9wdWJfa2V5IiwiY2FsbCIsInJzYV9wdWJfa2V5IiwicHV0IiwiaWRfY2FuZGlkYXRlIiwicmVzcG9uc2UiLCJyZXNwb25zZUxEQVAiLCJhbGVydCIsInRhcmdldCIsInZhbHVlIiwiQ09MT1IiLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJxdWVyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUTs7OztBQUNmLEFBQU8sQUFBWTs7OztBQUNuQixBQUFPLEFBQWM7Ozs7QUFDckIsQUFBUSxBQUFNLEFBQVEsQUFBUyxBQUFPLEFBQVc7O0FBQ2pELEFB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QkFBUSxBQUFDO1lBQUEsQUFBSyxTQUFTLEVBQUMsY0FBZixBQUFjLEFBQWMsT0FBTSxPQUFBLEFBQUssU0FBUyxFQUFDLFVBQVUsTUFBQSxBQUFNLE9BQWpFLEFBQWtDLEFBQWMsQUFBd0IsQUFBUTtBQUpwRzs7ZUFBQTtpQkFaRixBQVVDLEFBRUMsQUFRaUI7QUFSakI7QUFDQyx3QkFPaUIsY0FBRCxzQkFBQSxBQUFNLFNBQU0sVUFBWjtlQUFBO2lCQUFBLEFBQ2pCO0FBRGlCO3NCQUNqQixjQUFBOztlQUFBO2lCQUFBO0FBQUE7QUFBQSxNQURpQixBQUNqQixBQUNBLHdDQUFBLEFBQUM7aUJBQUQsQUFDYSxBQUNaO1dBQU8sS0FBQSxBQUFLLE1BRmIsQUFFbUIsQUFDbEI7Y0FBVSx5QkFBUSxBQUFDO1lBQUEsQUFBSyxTQUFTLEVBQUMsY0FBZixBQUFjLEFBQWMsT0FBTSxPQUFBLEFBQUssU0FBUyxFQUFDLFFBQVEsTUFBQSxBQUFNLE9BQS9ELEFBQWtDLEFBQWMsQUFBc0IsQUFBUTtBQUhsRzs7ZUFBQTtpQkF0QkYsQUFvQm1CLEFBRWpCLEFBT0Q7QUFQQztBQUNDLHdCQU1GLEFBQUMsMENBQVEsT0FBVCxNQUFlLFFBQWYsQUFBc0IsaUNBQTJCLFNBQVMsS0FBQSxBQUFLLE1BQS9ELEFBQXFFO2VBQXJFO2lCQTdCRCxBQTZCQyxBQUNBO0FBREE7dUJBQ0EsQUFBQywwQ0FBUSxTQUFULE1BQWlCLFFBQWpCLEFBQXdCLGVBQVcsU0FBbkMsQUFBNEM7ZUFBNUM7aUJBOUJELEFBOEJDLEFBQ0E7QUFEQTt1QkFDQSxBQUFDLHlDQUFPLE9BQU8sVUFBZixBQUF5QjtlQUF6QjtpQkFBQTtBQUFBO01BakNILEFBRUUsQUErQkMsQUFHRCxzQ0FBQSxBQUFDLDRDQUFVLE9BQU8sRUFBRSxXQUFGLEFBQWEsUUFBUSxjQUF2QyxBQUFrQixBQUFtQztlQUFyRDtpQkFBQSxBQUNDO0FBREQ7c0JBQ0MsQUFBQyx3Q0FBTSxPQUFPLFVBQWQsQUFBd0IsT0FBTyxNQUEvQixBQUFxQztlQUFyQztpQkFBQTtBQUFBO01BREQsQUFDQyxBQUdBLGlEQUFBLEFBQUMseUNBQU8sT0FBTyxVQUFmLEFBQXlCLE9BQU8sU0FBUyxLQUF6QyxBQUE4QztlQUE5QztpQkFBQTtBQUFBO01BekNKLEFBQ0MsQUFvQ0UsQUFJQyxBQUlKOzs7OzswR0FqSzRCLEE7Ozs7O1lBQ3JCO0Esa0JBQVcsTUFBTSxBLE1BQWpCLEE7O2tCQUVBLEFBQ0csQTtBQURILEFBQ047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFiNEIsQSxBQTZLL0I7O2tCQUFBLEFBQWUiLCJmaWxlIjoiY2FzdFZvdGVQcm9wb3NhbC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvaG9tZS9wZXRlci9EZXNrdG9wL3Byb2plY3RzL2VsZWN0aW9uIn0=