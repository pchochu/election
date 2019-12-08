'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _factory = require('../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

var _election = require('../ethereum/election');

var _election2 = _interopRequireDefault(_election);

var _CardUser = require('../components/CardUser');

var _CardUser2 = _interopRequireDefault(_CardUser);

var _CardUserProposal = require('../components/CardUserProposal');

var _CardUserProposal2 = _interopRequireDefault(_CardUserProposal);

var _CardClosed = require('../components/CardClosed');

var _CardClosed2 = _interopRequireDefault(_CardClosed);

var _Layout = require('../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'C:\\Users\\Peto\\Desktop\\election\\pages\\index.js?entry';


var constants = require('../helper/constants').default.constants;

var ElectionIndex = function (_Component) {
	(0, _inherits3.default)(ElectionIndex, _Component);

	function ElectionIndex() {
		(0, _classCallCheck3.default)(this, ElectionIndex);

		return (0, _possibleConstructorReturn3.default)(this, (ElectionIndex.__proto__ || (0, _getPrototypeOf2.default)(ElectionIndex)).apply(this, arguments));
	}

	(0, _createClass3.default)(ElectionIndex, [{
		key: 'renderFinishedEelections',
		value: function renderFinishedEelections() {
			var _this2 = this;

			var elections = this.props.elections.map(function (address, index) {
				if (address != undefined && _this2.props.electionInfo[index]['winnerId'] > 0) {
					return _react2.default.createElement(_CardClosed2.default, {
						key: index,
						id: index,
						name: _this2.props.electionInfo[index]['name'],
						address: address,
						winner: _this2.props.electionInfo[index]['winner'], __source: {
							fileName: _jsxFileName,
							lineNumber: 58
						}
					});
				}
			});

			var nothingToShow = true;
			for (var i = 0; i < elections.length; i++) {
				if (typeof elections[i] !== 'undefined') {
					nothingToShow = false;
				}
			}
			if (nothingToShow) {
				return _react2.default.createElement(_semanticUiReact.Message, {
					style: { width: '500px' },
					icon: 'coffee',
					header: '\u017Diadne vo\u013Eby e\u0161te neboli ukon\u010Den\xE9',
					__source: {
						fileName: _jsxFileName,
						lineNumber: 73
					}
				});
			} else {
				return elections;
			}
		}
	}, {
		key: 'renderElections',
		value: function renderElections() {
			var _this3 = this;

			var elections = this.props.elections.map(function (address, index) {
				if (address != undefined && _this3.props.electionInfo[index]['winnerId'] == 0 && _this3.props.electionInfo[index]['numStart'] == _this3.props.electionInfo[index]['numAdmin'] && _this3.props.electionInfo[index]['numStart'] != _this3.props.electionInfo[index]['numFinish']) {
					return _react2.default.createElement(_CardUser2.default, {
						key: index,
						id: index,
						name: _this3.props.electionInfo[index]['name'],
						address: address, __source: {
							fileName: _jsxFileName,
							lineNumber: 88
						}
					});
				}
			});

			var nothingToShow = true;
			for (var i = 0; i < elections.length; i++) {
				if (typeof elections[i] !== 'undefined') {
					nothingToShow = false;
				}
			}

			if (nothingToShow) {
				return _react2.default.createElement(_semanticUiReact.Message, {
					style: { width: '500px' },
					icon: 'coffee',
					header: '\u017Diadne vo\u013Eby nie s\xFA k dispoz\xEDcii',
					__source: {
						fileName: _jsxFileName,
						lineNumber: 104
					}
				});
			} else {
				return elections;
			}
		}
	}, {
		key: 'renderProposal',
		value: function renderProposal() {
			var _this4 = this;

			var elections = this.props.elections.map(function (address, index) {
				if (address != undefined && _this4.props.electionInfo[index]['proposalIsRunning'] == 1 && _this4.props.electionInfo[index]['numOfAdminStartProposal'] == _this4.props.electionInfo[index]['numAdmin'] && _this4.props.electionInfo[index]['numOfAdminStartProposal'] != _this4.props.electionInfo[index]['numOfAdminFinishProposal']) {
					return _react2.default.createElement(_CardUserProposal2.default, {
						key: index,
						id: index,
						name: _this4.props.electionInfo[index]['name'],
						address: address, __source: {
							fileName: _jsxFileName,
							lineNumber: 120
						}
					});
				}
			});

			var nothingToShow = true;
			for (var i = 0; i < elections.length; i++) {
				if (typeof elections[i] !== 'undefined') {
					nothingToShow = false;
				}
			}

			if (nothingToShow) {
				return _react2.default.createElement(_semanticUiReact.Message, {
					style: { width: '500px' },
					icon: 'coffee',
					header: '\u017Diadne vo\u013Eby nie s\xFA k dispoz\xEDcii',
					__source: {
						fileName: _jsxFileName,
						lineNumber: 136
					}
				});
			} else {
				return elections;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_Layout2.default, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 148
				}
			}, _react2.default.createElement('div', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 149
				}
			}, _react2.default.createElement('h2', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 150
				}
			}, 'Prebiehaj\xFAce vo\u013Eby'), this.renderElections(), _react2.default.createElement('h2', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 152
				}
			}, 'N\xE1vrhov\xE9 kolo'), this.renderProposal(), _react2.default.createElement('h2', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 154
				}
			}, 'Ukon\u010Den\xE9 vo\u013Eby'), this.renderFinishedEelections()));
		}
	}], [{
		key: 'getInitialProps',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
				var _this5 = this;

				var elections, electionInfo;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return _factory2.default.methods.getDeployedElections().call();

							case 2:
								elections = _context2.sent;
								_context2.next = 5;
								return _promise2.default.all(elections.map(function () {
									var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(address) {
										var election, approvalsToStart, approvalsToFinish, approvalsToStartProposal, approvalsToFinishProposal, propRunning, propSet, numOfAdmins, winnerId, winner, winnerEth, numOfVotesWinner, summary;
										return _regenerator2.default.wrap(function _callee$(_context) {
											while (1) {
												switch (_context.prev = _context.next) {
													case 0:
														election = (0, _election2.default)(address);
														_context.next = 3;
														return election.methods.approvalsToStartCount().call();

													case 3:
														approvalsToStart = _context.sent;
														_context.next = 6;
														return election.methods.approvalsToFinishCount().call();

													case 6:
														approvalsToFinish = _context.sent;
														_context.next = 9;
														return election.methods.approvalsToStartProposalCount().call();

													case 9:
														approvalsToStartProposal = _context.sent;
														_context.next = 12;
														return election.methods.approvalsToFinishProposalCount().call();

													case 12:
														approvalsToFinishProposal = _context.sent;
														_context.next = 15;
														return election.methods.proposalIsRunning().call();

													case 15:
														propRunning = _context.sent;
														_context.next = 18;
														return election.methods.proposalIsSet().call();

													case 18:
														propSet = _context.sent;
														_context.next = 21;
														return election.methods.administratorsCount().call();

													case 21:
														numOfAdmins = _context.sent;
														_context.next = 24;
														return election.methods.id_winner().call();

													case 24:
														winnerId = _context.sent;
														winner = {};

														if (!(winnerId > 0)) {
															_context.next = 34;
															break;
														}

														_context.next = 29;
														return election.methods.candidates(winnerId - 1).call();

													case 29:
														winnerEth = _context.sent;
														_context.next = 32;
														return election.methods.winner_num_of_votes().call();

													case 32:
														numOfVotesWinner = _context.sent;

														winner = {
															first_name: winnerEth['first_name'],
															last_name: winnerEth['last_name'],
															numOfVotesWinner: numOfVotesWinner
														};

													case 34:
														_context.next = 36;
														return election.methods.getSummary().call();

													case 36:
														summary = _context.sent;
														return _context.abrupt('return', {
															name: summary[3],
															numStart: approvalsToStart,
															numAdmin: numOfAdmins,
															numFinish: approvalsToFinish,
															winner: winner,
															winnerId: winnerId,
															numOfAdminStartProposal: approvalsToStartProposal,
															numOfAdminFinishProposal: approvalsToFinishProposal,
															proposalIsRunning: propRunning,
															proposalIsSet: propSet
														});

													case 38:
													case 'end':
														return _context.stop();
												}
											}
										}, _callee, _this5);
									}));

									return function (_x) {
										return _ref2.apply(this, arguments);
									};
								}()));

							case 5:
								electionInfo = _context2.sent;
								return _context2.abrupt('return', { elections: elections, electionInfo: electionInfo });

							case 7:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getInitialProps() {
				return _ref.apply(this, arguments);
			}

			return getInitialProps;
		}()
	}]);

	return ElectionIndex;
}(_react.Component);

exports.default = ElectionIndex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImZhY3RvcnkiLCJFbGVjdGlvbiIsIkNhcmRVc2VyIiwiQ2FyZFVzZXJQcm9wb3NhbCIsIkNhcmRDbG9zZWQiLCJMYXlvdXQiLCJNZXNzYWdlIiwiY29uc3RhbnRzIiwicmVxdWlyZSIsImRlZmF1bHQiLCJFbGVjdGlvbkluZGV4IiwiZWxlY3Rpb25zIiwicHJvcHMiLCJtYXAiLCJhZGRyZXNzIiwiaW5kZXgiLCJ1bmRlZmluZWQiLCJlbGVjdGlvbkluZm8iLCJub3RoaW5nVG9TaG93IiwiaSIsImxlbmd0aCIsIndpZHRoIiwicmVuZGVyRWxlY3Rpb25zIiwicmVuZGVyUHJvcG9zYWwiLCJyZW5kZXJGaW5pc2hlZEVlbGVjdGlvbnMiLCJtZXRob2RzIiwiZ2V0RGVwbG95ZWRFbGVjdGlvbnMiLCJjYWxsIiwiYWxsIiwiZWxlY3Rpb24iLCJhcHByb3ZhbHNUb1N0YXJ0Q291bnQiLCJhcHByb3ZhbHNUb1N0YXJ0IiwiYXBwcm92YWxzVG9GaW5pc2hDb3VudCIsImFwcHJvdmFsc1RvRmluaXNoIiwiYXBwcm92YWxzVG9TdGFydFByb3Bvc2FsQ291bnQiLCJhcHByb3ZhbHNUb1N0YXJ0UHJvcG9zYWwiLCJhcHByb3ZhbHNUb0ZpbmlzaFByb3Bvc2FsQ291bnQiLCJhcHByb3ZhbHNUb0ZpbmlzaFByb3Bvc2FsIiwicHJvcG9zYWxJc1J1bm5pbmciLCJwcm9wUnVubmluZyIsInByb3Bvc2FsSXNTZXQiLCJwcm9wU2V0IiwiYWRtaW5pc3RyYXRvcnNDb3VudCIsIm51bU9mQWRtaW5zIiwiaWRfd2lubmVyIiwid2lubmVySWQiLCJ3aW5uZXIiLCJjYW5kaWRhdGVzIiwid2lubmVyRXRoIiwid2lubmVyX251bV9vZl92b3RlcyIsIm51bU9mVm90ZXNXaW5uZXIiLCJmaXJzdF9uYW1lIiwibGFzdF9uYW1lIiwiZ2V0U3VtbWFyeSIsInN1bW1hcnkiLCJuYW1lIiwibnVtU3RhcnQiLCJudW1BZG1pbiIsIm51bUZpbmlzaCIsIm51bU9mQWRtaW5TdGFydFByb3Bvc2FsIiwibnVtT2ZBZG1pbkZpbmlzaFByb3Bvc2FsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPLEFBQWE7Ozs7QUFDcEIsQUFBTyxBQUFjOzs7O0FBQ3JCLEFBQU8sQUFBYzs7OztBQUNyQixBQUFPLEFBQXNCOzs7O0FBQzdCLEFBQU8sQUFBZ0I7Ozs7QUFDdkIsQUFBTyxBQUFZOzs7O0FBQ25CLEFBQVM7Ozs7Ozs7SUFDRixBLFlBQWEsUUFBQSxBQUFRLHVCLEFBQXVCLFEsQUFBNUM7O0lBRUQsQTs7Ozs7Ozs7Ozs7NkNBNENxQjtnQkFDekI7O09BQUksaUJBQVksQUFBSyxNQUFMLEFBQVcsVUFBWCxBQUFxQixJQUFJLFVBQUEsQUFBQyxTQUFELEFBQVUsT0FBVSxBQUM1RDtRQUFHLFdBQUEsQUFBVyxhQUFhLE9BQUEsQUFBSyxNQUFMLEFBQVcsYUFBWCxBQUF3QixPQUF4QixBQUErQixjQUExRCxBQUF3RSxHQUFFLEFBQ3pFOzRCQUFPLEFBQUM7V0FBRCxBQUNELEFBQ0w7VUFGTSxBQUVGLEFBQ0o7WUFBTSxPQUFBLEFBQUssTUFBTCxBQUFXLGFBQVgsQUFBd0IsT0FIeEIsQUFHQSxBQUErQixBQUNyQztlQUpNLEFBSUcsQUFDVDtjQUFRLE9BQUEsQUFBSyxNQUFMLEFBQVcsYUFBWCxBQUF3QixPQUwxQixBQUtFLEFBQStCO2lCQUxqQzttQkFBUCxBQUFPLEFBTVA7QUFOTztBQUNOLE1BRE07QUFNTjtBQVJILEFBQWdCLEFBVWYsSUFWZTs7T0FVWCxnQkFBSixBQUFvQixBQUNwQjtRQUFLLElBQUksSUFBVCxBQUFhLEdBQUcsSUFBSSxVQUFwQixBQUE4QixRQUE5QixBQUFzQyxLQUFLLEFBQzFDO1FBQUcsT0FBTyxVQUFQLEFBQU8sQUFBVSxPQUFwQixBQUEyQixhQUFZLEFBQ3RDO3FCQUFBLEFBQWdCLEFBQ2hCO0FBQ0Q7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QXBGO0FBTDhDLG1EQUFBOzhCQUFBO3FCQU0xQixTQUFBLEFBQVMsUUFBVCxBQUFpQixvQkFOUyxBQU0xQixBQUFxQzs7a0JBQXpEO0FBTjhDLHFDQUFBOzhCQUFBO3FCQU85QixTQUFBLEFBQVMsUUFBVCxBQUFpQixnQkFQYSxBQU85QixBQUFpQzs7a0JBQWpEO0FBUDhDLGlDQUFBOzhCQUFBO3FCQVExQixTQUFBLEFBQVMsUUFBVCxBQUFpQixzQkFSUyxBQVExQixBQUF1Qzs7a0JBQTNEO0FBUjhDLHFDQUFBOzhCQUFBO3FCQVM3QixTQUFBLEFBQVMsUUFBVCxBQUFpQixZQVRZLEFBUzdCLEFBQTZCOztrQkFBOUM7QUFUOEMsa0NBVWhEO0FBVmdELHVCQUFBLEFBVXZDOztvQkFDVixXQVhpRCxBQVd0QyxJQVhzQzsrQkFBQTtBQUFBO0FBQUE7OzhCQUFBO3FCQVkzQixTQUFBLEFBQVMsUUFBVCxBQUFpQixXQUFXLFdBQTVCLEFBQXVDLEdBWlosQUFZM0IsQUFBMEM7O2tCQUE1RDtBQVo2QyxtQ0FBQTs4QkFBQTtxQkFhcEIsU0FBQSxBQUFTLFFBQVQsQUFBaUIsc0JBYkcsQUFhcEIsQUFBdUM7O2tCQUFoRTtBQWI2QywwQ0FjbkQ7OzsyQkFDYSxVQURKLEFBQ0ksQUFBVSxBQUN0QjswQkFBVyxVQUZILEFBRUcsQUFBVSxBQUNyQjtpQ0FqQmtELEFBY25ELEFBQVMsQUFHVTtBQUhWLEFBQ1I7O2tCQWZrRDs4QkFBQTtxQkFxQjlCLFNBQUEsQUFBUyxRQUFULEFBQWlCLGFBckJhLEFBcUI5QixBQUE4Qjs7a0JBQTlDO0FBckI4QyxpQ0FBQTs7cUJBdUI5QyxRQURDLEFBQ0QsQUFBUSxBQUNiO3lCQUZNLEFBRUcsQUFDVDt5QkFITSxBQUdHLEFBQ1Q7MEJBSk0sQUFJSSxBQUNWO3VCQUxNLEFBS0UsQUFDUjt5QkFOTSxBQU1JLEFBQ1Y7d0NBUE0sQUFPbUIsQUFDekI7eUNBUk0sQUFRb0IsQUFDMUI7a0NBVE0sQUFTYSxBQUNuQjs4QkFoQ21ELEFBc0I3QyxBQVVTO0FBVlQsQUFDTjs7a0JBdkJtRDtrQkFBQTs4QkFBQTs7QUFBQTtzQkFBQTtBQUFkOzs4QkFBQTttQ0FBQTtBQUFBO0FBQVosQSxXQUFZLENBQVo7O1lBQXJCO0E7MENBb0NDLEVBQUUsV0FBRixXQUFhLGMsQUFBYjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXpDbUIsQSxBQXVKNUI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiaW5kZXguanM/ZW50cnkiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvUGV0by9EZXNrdG9wL2VsZWN0aW9uIn0=