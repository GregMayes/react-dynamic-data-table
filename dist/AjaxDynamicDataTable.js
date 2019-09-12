"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DynamicDataTable = _interopRequireDefault(require("./DynamicDataTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var AjaxDynamicDataTable =
/*#__PURE__*/
function (_Component) {
  _inherits(AjaxDynamicDataTable, _Component);

  function AjaxDynamicDataTable(props) {
    var _this;

    _classCallCheck(this, AjaxDynamicDataTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AjaxDynamicDataTable).call(this, props));
    var defaultOrderByField = props.defaultOrderByField,
        defaultOrderByDirection = props.defaultOrderByDirection;
    _this.state = {
      rows: [],
      currentPage: 1,
      totalPages: 1,
      orderByField: defaultOrderByField,
      orderByDirection: defaultOrderByDirection,
      disallowOrderingBy: [],
      loading: false
    };
    _this.reload = _this.reload.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.changePage = _this.changePage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.changeOrder = _this.changeOrder.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(AjaxDynamicDataTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadPage(1);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (JSON.stringify(prevProps.params) !== JSON.stringify(this.props.params)) {
        this.loadPage(1);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          rows = _this$state.rows,
          currentPage = _this$state.currentPage,
          totalPages = _this$state.totalPages,
          orderByField = _this$state.orderByField,
          orderByDirection = _this$state.orderByDirection,
          loading = _this$state.loading;

      var _this$props = this.props,
          disallowOrderingBy = _this$props.disallowOrderingBy,
          props = _objectWithoutProperties(_this$props, ["disallowOrderingBy"]);

      return _react.default.createElement(_DynamicDataTable.default, _extends({
        rows: rows,
        currentPage: currentPage,
        totalPages: totalPages,
        orderByField: orderByField,
        orderByDirection: orderByDirection,
        loading: loading,
        changePage: this.changePage,
        changeOrder: this.changeOrder,
        disallowOrderingBy: this.disallowOrderingBy
      }, props));
    }
  }, {
    key: "reload",
    value: function reload() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.loadPage(page);
    }
  }, {
    key: "loadPage",
    value: function loadPage(page) {
      var _this2 = this;

      var _this$state2 = this.state,
          orderByField = _this$state2.orderByField,
          orderByDirection = _this$state2.orderByDirection;
      var _this$props2 = this.props,
          onLoad = _this$props2.onLoad,
          params = _this$props2.params,
          axios = _this$props2.axios;
      this.setState({
        loading: true
      }, function () {
        axios.get(_this2.props.apiUrl, {
          params: _objectSpread({}, params, {
            page: page,
            orderByField: orderByField,
            orderByDirection: orderByDirection
          })
        }).then(function (_ref) {
          var response = _ref.data;
          var _response$data = response.data,
              rows = _response$data.data,
              current_page = _response$data.current_page,
              last_page = _response$data.last_page;
          var disallow_ordering_by = [];

          if (response.meta) {
            disallow_ordering_by = response.meta.disallow_ordering_by;
          }

          var newState = {
            disallowOrderingBy: disallow_ordering_by,
            rows: rows,
            currentPage: current_page,
            totalPages: last_page,
            loading: false
          };

          _this2.setState(newState);

          onLoad(newState);
        });
      });
    }
  }, {
    key: "changePage",
    value: function changePage(page) {
      this.loadPage(page);
    }
  }, {
    key: "changeOrder",
    value: function changeOrder(field, direction) {
      var _this3 = this;

      this.setState({
        orderByField: field,
        orderByDirection: direction
      }, function () {
        _this3.loadPage(1);
      });
    }
  }, {
    key: "disallowOrderingBy",
    get: function get() {
      var state = this.state.disallowOrderingBy;
      var prop = this.props.disallowOrderingBy;
      return [].concat(_toConsumableArray(state), _toConsumableArray(prop));
    }
  }]);

  return AjaxDynamicDataTable;
}(_react.Component);

AjaxDynamicDataTable.defaultProps = {
  onLoad: function onLoad() {
    return null;
  },
  params: {},
  defaultOrderByField: null,
  defaultOrderByDirection: null,
  axios: typeof window !== 'undefined' && window.axios ? window.axios : require('axios'),
  disallowOrderingBy: []
};
AjaxDynamicDataTable.propTypes = {
  apiUrl: _propTypes.default.string,
  onLoad: _propTypes.default.func,
  params: _propTypes.default.object,
  defaultOrderByField: _propTypes.default.string,
  defaultOrderByDirection: _propTypes.default.string,
  axios: _propTypes.default.any,
  disallowOrderingBy: _propTypes.default.arrayOf(_propTypes.default.string)
};
var _default = AjaxDynamicDataTable;
exports.default = _default;