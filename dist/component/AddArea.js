"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("@emotion/react");
var _material = require("@mui/material");
var _axios = _interopRequireDefault(require("axios"));
var _formik = require("formik");
var _react2 = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _sweetalert = _interopRequireDefault(require("sweetalert2"));
var Yup = _interopRequireWildcard(require("yup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var AddArea = function AddArea(_ref) {
  var closeModalAndReload = _ref.closeModalAndReload,
    createModalData = _ref.createModalData;
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    t = _useTranslation.t,
    i18n = _useTranslation.i18n;
  var appConfig = window.globalConfig;
  var _useState = (0, _react2.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var theme = (0, _react.useTheme)();
  var formik = (0, _formik.useFormik)({
    initialValues: {
      displayName: "",
      parentId: 0
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      displayName: Yup.string().required("نام منطقه الزامی است")
    }),
    onSubmit: function onSubmit(values) {
      setLoading(true);
      var isSuccess = false;
      if (values.displayName !== "") {
        _axios["default"].post("".concat(appConfig.BaseURL, "/api/AreasPlacement"), values).then(function (res) {
          isSuccess = true;
        })["catch"](function (res) {
          isSuccess = false;
          var error = res.response.data.errorList;
          console.log("res", res);
          var arr = error === null || error === void 0 ? void 0 : error.map(function (item) {
            return t(item);
          });
          var msg = arr.join(" \n ");
          console.log("msg", msg);
          (0, _sweetalert["default"])({
            text: msg,
            icon: "error",
            button: t("باشه"),
            className: "small-text"
          });
        })["finally"](function () {
          if (isSuccess) {
            setLoading(false);
            closeModalAndReload();
          }
        });
      }
    }
  });
  console.log("createModalData", createModalData);
  return /*#__PURE__*/_react2["default"].createElement(_react2["default"].Fragment, null, loading ? /*#__PURE__*/_react2["default"].createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      "with": '100%'
    }
  }, /*#__PURE__*/_react2["default"].createElement(_material.CircularProgress, null)) : /*#__PURE__*/_react2["default"].createElement(_react2["default"].Fragment, null, /*#__PURE__*/_react2["default"].createElement("div", {
    className: "form-design",
    style: {
      direction: i18n.dir()
    }
  }, /*#__PURE__*/_react2["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react2["default"].createElement("div", {
    className: "col-lg-6 col-md-6 col-6",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/_react2["default"].createElement("div", {
    className: "title "
  }, /*#__PURE__*/_react2["default"].createElement("span", null, t("نام ناحیه"))), /*#__PURE__*/_react2["default"].createElement("div", null, /*#__PURE__*/_react2["default"].createElement("input", {
    type: "text",
    name: "displayName",
    id: "displayName",
    onChange: function onChange(e) {
      var _createModalData$curr;
      formik.setFieldValue("parentId", createModalData === null || createModalData === void 0 || (_createModalData$curr = createModalData.current) === null || _createModalData$curr === void 0 ? void 0 : _createModalData$curr.areasPlacementId);
      formik.setFieldValue("displayName", e.target.value);
    }
  }))))), /*#__PURE__*/_react2["default"].createElement("div", {
    className: "d-flex flex-row-reverse justify-content-center"
  }, /*#__PURE__*/_react2["default"].createElement("div", {
    className: "m-1"
  }, /*#__PURE__*/_react2["default"].createElement(_material.Button, {
    type: "submit",
    onClick: formik.handleSubmit,
    variant: "contained",
    color: "success",
    style: {
      margin: "auto",
      width: "55px"
    }
  }, "تایید")), /*#__PURE__*/_react2["default"].createElement("div", {
    className: "m-1"
  }, /*#__PURE__*/_react2["default"].createElement(_material.Button, {
    onClick: closeModalAndReload,
    variant: "contained",
    color: "error",
    style: {
      margin: "auto",
      width: "55px"
    }
  }, "بازگشت")))));
};
var _default = AddArea;
exports["default"] = _default;