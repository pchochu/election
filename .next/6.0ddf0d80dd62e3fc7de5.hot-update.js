webpackHotUpdate(6,{

/***/ 935:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = __webpack_require__(85);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(86);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(41);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(42);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(46);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _Layout = __webpack_require__(925);

var _Layout2 = _interopRequireDefault(_Layout);

var _election = __webpack_require__(647);

var _election2 = _interopRequireDefault(_election);

var _semanticUiReact = __webpack_require__(414);

var _axios = __webpack_require__(936);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'C:\\Users\\Peto\\Desktop\\election\\pages\\elections\\candidate\\castVoteProposal.js?entry';


var constants = __webpack_require__(452).default.constants;

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "C:\\Users\\Peto\\Desktop\\election\\pages\\elections\\candidate\\castVoteProposal.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\Users\\Peto\\Desktop\\election\\pages\\elections\\candidate\\castVoteProposal.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(83)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/elections\\candidate\\castVoteProposal")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi4wZGRmMGQ4MGRkNjJlM2ZjN2RlNS5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvZWxlY3Rpb25zL2NhbmRpZGF0ZS9jYXN0Vm90ZVByb3Bvc2FsLmpzPzczODYwODAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IExheW91dCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0xheW91dCdcclxuaW1wb3J0IEVsZWN0aW9uIGZyb20gJy4uLy4uLy4uL2V0aGVyZXVtL2VsZWN0aW9uJ1xyXG5pbXBvcnQge0Zvcm0sIEJ1dHRvbiwgTWVzc2FnZSwgSW5wdXQsIEFjY29yZGlvbiwgTGFiZWx9IGZyb20gJ3NlbWFudGljLXVpLXJlYWN0J1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5jb25zdCB7Y29uc3RhbnRzfSA9IHJlcXVpcmUoJy4uLy4uLy4uL2hlbHBlci9jb25zdGFudHMnKS5kZWZhdWx0O1xyXG5cclxuY2xhc3MgQ2FzdFZvdGVQcm9wb3NhbCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZSA9IHtcclxuXHRcdGxvZ2luOiAnJyxcclxuXHRcdGVycm9yTWVzc2FnZTogJycsXHJcblx0XHRrZXk6ICcnLFxyXG4gICAgICAgIHBhc3N3b3JkOiAnJyxcclxuICAgICAgICB4bG9naW46ICcnXHJcblx0fTtcclxuXHJcblx0c3RhdGljIGFzeW5jIGdldEluaXRpYWxQcm9wcyhwcm9wcyl7XHJcblx0XHRjb25zdCB7YWRkcmVzc30gPSBwcm9wcy5xdWVyeTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRhZGRyZXNzOiBhZGRyZXNzLFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGRvd25sb2FkVHh0RmlsZSA9ICgpID0+IHtcclxuXHRcdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuXHRcdGNvbnN0IGZpbGUgPSBuZXcgQmxvYihbdGhpcy5zdGF0ZS5rZXldLCB7dHlwZTogJ3RleHQvcGxhaW4nfSk7XHJcblx0XHRlbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xyXG5cdFx0ZWxlbWVudC5kb3dubG9hZCA9IHRoaXMuc3RhdGUubG9naW4gKyBcIiBwcml2YXRlS2V5Rm9yVm90ZS50eHRcIjtcclxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7IC8vIFJlcXVpcmVkIGZvciB0aGlzIHRvIHdvcmsgaW4gRmlyZUZveFxyXG5cdFx0ZWxlbWVudC5jbGljaygpO1xyXG5cdH1cclxuXHRvblN1Ym1pdCA9IGFzeW5jIGV2ZW50ID0+IHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgZXJyb3JNZXNzYWdlOiAnJyB9KVxyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGtleTogJycgfSlcclxuXHJcblx0XHRpZiAodGhpcy5zdGF0ZS5sb2dpbiA9PT0gJycpIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGVycm9yTWVzc2FnZTogJ05ldnlwbG5lbsO9IGxvZ2luJyB9KVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zdGF0ZS5wYXNzd29yZCA9PT0gJycpIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGVycm9yTWVzc2FnZTogJ05ldnlwbG5lbmUgaGVzbG8nIH0pXHJcblx0XHRcdHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS54bG9naW4gPT09ICcnKSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyBlcnJvck1lc3NhZ2U6ICdOZXZ5cGxuZW55IHhsb2dpbiBrYW5kaWRhdGEnIH0pXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cclxuXHRcdHRyeXtcclxuXHJcblx0XHRcdC8qIGxldCBpc0F1dGggPSBhd2FpdCBheGlvcy5wb3N0KGNvbnN0YW50cy5BRERSRVNTICsgJy9hdXRoZW50aWNhdGUnLFxyXG5cdFx0XHR7IFxyXG5cdFx0XHRcdFx0dXNlcm5hbWU6dGhpcy5zdGF0ZS5sb2dpbixcclxuXHRcdFx0XHRcdHBhc3N3b3JkOiB0aGlzLnN0YXRlLnBhc3N3b3JkXHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHRpZihpc0F1dGguZGF0YS5yZXNwb25zZSA9PSAnbm90QXV0aCcpe1xyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2Vycm9yTWVzc2FnZTogJ05lc3Bhdm5lIHByaWhsYXNvdmFjaWUgdWRhamUnfSlcclxuXHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0fSAqL1xyXG5cclxuXHRcdFx0Ly8gb3Zlcm92YW5pZSDEjWkgamUgaGxhc3Vqw7pjaSB2IHpvem5hbWUgaGxhc3Vqw7pjaWNoIHByZSBkYW7DqSB2b8S+YnkuXHJcblx0XHRcdC8vIG5lb3ZlcnVqZW0geiBkw7R2b2R1LCDFvmUgbmV2aWVtLCBrdG8gYnVkZSB2IHRlc3RvdmFjw61jaCB2b8S+YsOhY2ggaGxhc292YcWlXHJcblx0XHRcdC8vIGNvbnN0IGlzTGlzdGVkID0gYXdhaXQgYXhpb3MuZ2V0KGNvbnN0YW50cy5BRERSRVNTICsgJy9nZXRVc2VySXNMaXN0ZWRJbkVsZWN0aW9uJyxcclxuXHRcdFx0Ly8geyBcclxuXHRcdFx0Ly8gXHRwYXJhbXM6IHtcclxuXHRcdFx0Ly8gXHRcdGVsZWN0aW9uX2FkZHJlc3M6dGhpcy5wcm9wcy5hZGRyZXNzLFxyXG5cdFx0XHQvLyBcdFx0aWRfdm90ZXI6dGhpcy5zdGF0ZS5sb2dpblxyXG5cdFx0XHQvLyBcdH1cclxuXHRcdFx0Ly8gfSk7XHJcblxyXG5cdFx0XHQvLyBpZihpc0xpc3RlZC5kYXRhLmxlbmd0aCA8IDEpe1xyXG5cdFx0XHQvLyBcdHRoaXMuc2V0U3RhdGUoeyBlcnJvck1lc3NhZ2U6IFwiTmVuYWNoYWR6YXMgc2EgdiB6b3puYW1lIGhsYXN1anVjaWNoXCJ9KVxyXG5cdFx0XHQvLyBcdHJldHVyblxyXG5cdFx0XHQvLyB9XHJcblxyXG5cdFx0XHRjb25zdCB2b3RlID0gYXdhaXQgYXhpb3MuZ2V0KGNvbnN0YW50cy5BRERSRVNTICsgJy9kaWRVc2VyVm90ZScsXHJcblx0XHRcdHsgXHJcblx0XHRcdFx0cGFyYW1zOiB7XHJcblx0XHRcdFx0XHRlbGVjdGlvbl9hZGRyZXNzOnRoaXMucHJvcHMuYWRkcmVzcyxcclxuXHRcdFx0XHRcdGlkX3ZvdGVyOnRoaXMuc3RhdGUubG9naW5cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHJcblx0XHRcdGlmKHZvdGUuZGF0YS5sZW5ndGggPiAwKXtcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHsgZXJyb3JNZXNzYWdlOiBcIlXFviBzaSBobGFzb3ZhbCwgbmVtw7TFvmVzIGhsYXNvdmHFpSB2aWFjIGtyw6F0XCJ9KVxyXG5cdFx0XHRcdHJldHVyblxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRjb25zdCBlbGVjdGlvbiA9IGF3YWl0IEVsZWN0aW9uKHRoaXMucHJvcHMuYWRkcmVzcylcclxuXHRcdFx0Y29uc3QgcnNhX3B1Yl9rZXkgPSBhd2FpdCBlbGVjdGlvbi5tZXRob2RzLlJTQV9wdWJfa2V5KCkuY2FsbCgpXHJcblxyXG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnB1dChjb25zdGFudHMuQUREUkVTUyArICAnL25ld1ZvdGUnLCBcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGFkZHJlc3M6IHRoaXMucHJvcHMuYWRkcmVzcyxcclxuXHRcdFx0XHRpZF9jYW5kaWRhdGU6IHRoaXMucHJvcHMuaWQsXHJcblx0XHRcdFx0aWRfdm90ZXI6IHRoaXMuc3RhdGUubG9naW4sXHJcblx0XHRcdFx0cnNhX3B1Yl9rZXk6IHJzYV9wdWJfa2V5XHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHQvLyBjb25zdCByZXNwb25zZUxEQVAgPSBhd2FpdCBheGlvcy5wdXQoY29uc3RhbnRzLkFERFJFU1MgKyAgJy9uZXdWb3RlTERBUCcsIFxyXG5cdFx0XHQvLyB7XHJcblx0XHRcdC8vIFx0YWRkcmVzczogdGhpcy5wcm9wcy5hZGRyZXNzLFxyXG5cdFx0XHQvLyBcdGlkX3ZvdGVyOiB0aGlzLnN0YXRlLmxvZ2luXHJcblx0XHRcdC8vIH0pXHJcblxyXG5cclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGtleTogcmVzcG9uc2UuZGF0YX0pXHJcblxyXG5cdFx0XHR0aGlzLmRvd25sb2FkVHh0RmlsZSgpXHJcblx0XHRcdGFsZXJ0KCdWeWJvcm5lLCB6YWhsYXNvdmFsIHNpIGEgc3RpYWhvbCBzYSB0aSBwcml2YXRueSBrbHVjJylcclxuXHJcbi8qIFx0XHRcdGF4aW9zLnB1dChjb25zdGFudHMuQUREUkVTUyArICcvYWRkVm90ZXNUb0NhbmRpZGF0ZXMnLCBcclxuXHRcdFx0e1xyXG5cdFx0XHRhZGRyZXNzOiB0aGlzLnByb3BzLmFkZHJlc3MsXHJcblx0XHRcdGlkX2NhbmRpZGF0ZTogdGhpcy5wcm9wcy5pZCxcclxuXHRcdFx0ZXRoX2NhbmRpZGF0ZXM6IHRoaXMucHJvcHMuZXRoQ2FuZGlkYXRlc1xyXG5cdFx0XHR9LFxyXG5cdFx0XHQpLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICB9KTtcdCAqL1xyXG4gICAgICB9Y2F0Y2ggKGUpe1xyXG5cdCAgfVxyXG5cclxuXHR9O1xyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybihcclxuXHRcdFx0PExheW91dD5cclxuXHRcdFx0XHQ8aDM+T2Rvc2xhbmllIGhsYXN1PC9oMz5cclxuXHRcdFx0XHRcdDxGb3JtIG9uU3VibWl0PXt0aGlzLm9uU3VibWl0fSBlcnJvcj17ISF0aGlzLnN0YXRlLmVycm9yTWVzc2FnZX0gc3VjY2Vzcz17ISF0aGlzLnN0YXRlLmtleX0+XHJcblx0XHRcdFx0XHRcdDxGb3JtLkZpZWxkIHJlcXVpcmVkPlxyXG5cdFx0XHRcdFx0XHRcdDxsYWJlbD5Mb2dpbjwvbGFiZWw+XHJcblx0XHRcdFx0XHRcdFx0PElucHV0IFxyXG5cdFx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9J0xvZ2luJ1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUubG9naW59XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17ZXZlbnQgPT57dGhpcy5zZXRTdGF0ZSh7ZXJyb3JNZXNzYWdlOicnfSksIHRoaXMuc2V0U3RhdGUoe2xvZ2luOiBldmVudC50YXJnZXQudmFsdWV9KX19XHJcblx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PC9Gb3JtLkZpZWxkPlxyXG5cclxuXHRcdFx0XHRcdFx0PEZvcm0uRmllbGQgcmVxdWlyZWQ+XHJcblx0XHRcdFx0XHRcdFx0PGxhYmVsPkhlc2xvPC9sYWJlbD5cclxuXHRcdFx0XHRcdFx0XHQ8SW5wdXQgXHJcblx0XHRcdFx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIlxyXG5cdFx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9J0hlc2xvJ1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17ZXZlbnQgPT57dGhpcy5zZXRTdGF0ZSh7ZXJyb3JNZXNzYWdlOicnfSksIHRoaXMuc2V0U3RhdGUoe3Bhc3N3b3JkOiBldmVudC50YXJnZXQudmFsdWV9KX19XHJcblx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PC9Gb3JtLkZpZWxkPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm0uRmllbGQgcmVxdWlyZWQ+XHJcblx0XHRcdFx0XHRcdFx0PGxhYmVsPnhsb2dpbiBrYW5kaWTDoXRhPC9sYWJlbD5cclxuXHRcdFx0XHRcdFx0XHQ8SW5wdXQgXHJcblx0XHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj0neGxvZ2luJ1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUueGxvZ2lufVxyXG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e2V2ZW50ID0+e3RoaXMuc2V0U3RhdGUoe2Vycm9yTWVzc2FnZTonJ30pLCB0aGlzLnNldFN0YXRlKHt4bG9naW46IGV2ZW50LnRhcmdldC52YWx1ZX0pfX1cclxuXHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8L0Zvcm0uRmllbGQ+XHJcblxyXG5cdFx0XHRcdFx0XHQ8TWVzc2FnZSBlcnJvciBoZWFkZXI9XCJPam9qLCBuaWXEjW8gc2EgcG9rYXppbG8hXCIgY29udGVudD17dGhpcy5zdGF0ZS5lcnJvck1lc3NhZ2V9IC8+XHJcblx0XHRcdFx0XHRcdDxNZXNzYWdlIHN1Y2Nlc3MgaGVhZGVyPSdWw71ib3JuZSEnIGNvbnRlbnQ9eydWeWJvcm5lIHphaGxhc292YWwgc2kgYSBzdGlhaG9sIHNhIHRpIGtsdWMhJ30vPlxyXG5cdFx0XHRcdFx0XHQ8QnV0dG9uIGNvbG9yPXtjb25zdGFudHMuQ09MT1J9ID5PZG/FoWxpIGhsYXM8L0J1dHRvbj5cdFxyXG5cdFx0XHRcdFx0PC9Gb3JtPlxyXG5cclxuXHRcdFx0XHRcdDxBY2NvcmRpb24gc3R5bGU9e3sgbWFyZ2luVG9wOiAnNTBweCcsIG1hcmdpbkJvdHRvbTogJzUwcHgnIH19PiBcclxuXHRcdFx0XHRcdFx0PExhYmVsIGNvbG9yPXtjb25zdGFudHMuQ09MT1J9IHNpemU9eydtZWRpdW0nfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByaXbDoXRueSBSU0Ega2zDusSNXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGFiZWw+IFxyXG5cdFx0XHRcdFx0XHQ8QnV0dG9uIGNvbG9yPXtjb25zdGFudHMuQ09MT1J9IG9uQ2xpY2s9e3RoaXMuZG93bmxvYWRUeHRGaWxlIH0+U3RpYWhuaTwvQnV0dG9uPlxyXG5cdFx0XHRcdDwvQWNjb3JkaW9uPlxyXG5cdFx0XHQ8L0xheW91dD5cclxuXHRcdFx0KTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhc3RWb3RlUHJvcG9zYWw7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFnZXMvZWxlY3Rpb25zL2NhbmRpZGF0ZS9jYXN0Vm90ZVByb3Bvc2FsLmpzP2VudHJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7QUFKQTtBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQUE7QUFNQTtBQUNBO0FBREE7QUFOQTtBQUNBO0FBREE7QUFVQTtBQVZBO0FBQUE7QUFXQTtBQUNBO0FBREE7QUFYQTtBQUNBO0FBREE7QUFlQTtBQWZBO0FBQUE7QUFnQkE7QUFDQTtBQURBO0FBaEJBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFnREE7O0FBR0E7QUFDQTtBQURBO0FBREE7QUFDQTtBQUhBO0FBaERBO0FBQ0E7QUF3REE7QUF6REE7QUFBQTtBQTBEQTtBQUNBO0FBREE7QUExREE7QUFDQTtBQURBO0FBQUE7QUE4REE7QUFDQTtBQURBO0FBOURBO0FBQUE7QUErREE7QUFDQTtBQURBO0FBL0RBO0FBQUE7QUFpRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFIQTtBQWpFQTtBQUNBO0FBeUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQXRGQTs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7QUFtR0E7QUFDQTtBQUNBO0FBQUE7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFIQTs7QUFBQTtBQU9BO0FBUEE7QUFDQTtBQU1BO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUpBOztBQUFBO0FBUUE7QUFSQTtBQUNBO0FBT0E7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUhBOztBQUFBO0FBT0E7QUFQQTtBQUNBO0FBTUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUlBOzs7Ozs7Ozs7O0FBaEtBO0FBQUE7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0pBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=