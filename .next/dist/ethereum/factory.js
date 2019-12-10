'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _ElectionFactory = require('./build/ElectionFactory.json');

var _ElectionFactory2 = _interopRequireDefault(_ElectionFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var constants = require('../helper/constants').default.constants;

var instance = new _web2.default.eth.Contract(JSON.parse(_ElectionFactory2.default.interface), constants.FACTORY_ADDRESS);

exports.default = instance;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2ZhY3RvcnkuanMiXSwibmFtZXMiOlsid2ViMyIsIkVsZWN0aW9uRmFjdG9yeSIsImNvbnN0YW50cyIsInJlcXVpcmUiLCJkZWZhdWx0IiwiaW5zdGFuY2UiLCJldGgiLCJDb250cmFjdCIsIkpTT04iLCJwYXJzZSIsImludGVyZmFjZSIsIkZBQ1RPUllfQUREUkVTUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTyxBQUFQLEFBQWlCLEFBQWpCOzs7O0FBQ0EsQUFBTyxBQUFQLEFBQTRCLEFBQTVCOzs7Ozs7SUFDTyxBLFlBQWEsUUFBUSxBQUFSLHVCQUErQixBLFFBQTVDLEE7O0FBRVAsSUFBTSxXQUFXLElBQUksY0FBSyxBQUFMLElBQVMsQUFBYixTQUNoQixLQUFLLEFBQUwsTUFBVywwQkFBZ0IsQUFBM0IsQUFEZ0IsWUFFaEIsVUFBVSxBQUZNLEFBQWpCLEFBS0E7O2tCQUFlLEFBQWYiLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9wZXRlci9EZXNrdG9wL3Byb2plY3RzL2VsZWN0aW9uIn0=