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
var _react2 = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var Yup = _interopRequireWildcard(require("yup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var EditArea = function EditArea(_ref) {
  var _updateModalData$curr;
  var closeModalAndReload = _ref.closeModalAndReload,
    updateModalData = _ref.updateModalData;
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    t = _useTranslation.t,
    i18n = _useTranslation.i18n;
  var appConfig = window.globalConfig;
  var theme = (0, _react.useTheme)();
  console.log("updateModalData", updateModalData);
  var formik = (0, _formik.useFormik)({
    initialValues: {
      displayName: ""
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      displayName: Yup.string().required("نام منطقه الزامی است")
    }),
    onSubmit: function onSubmit(values) {
      var valuessss = {
        areasPlacementId: updateModalData === null || updateModalData === void 0 ? void 0 : updateModalData.current.areasPlacementId,
        placementParentId: updateModalData === null || updateModalData === void 0 ? void 0 : updateModalData.current.placementParentId,
        displayName: values.displayName,
        level: updateModalData === null || updateModalData === void 0 ? void 0 : updateModalData.current.level
      };
      console.log("all values", values);
      var isSuccess = false;
      if (values.displayName !== "") {
        _axios["default"].put("".concat(appConfig.BaseURL, "/api/AreasPlacement/Update/").concat(valuessss.areasPlacementId), valuessss).then(function (res) {
          isSuccess = true;
        })["catch"](function (res) {
          isSuccess = false;
        })["finally"](function () {
          if (isSuccess) {
            closeModalAndReload();
          }
        });
      }
    }
  });
  console.log("updateModalData", updateModalData);
  return /*#__PURE__*/_react2["default"].createElement(_react2["default"].Fragment, null, /*#__PURE__*/_react2["default"].createElement("div", {
    className: "form-design"
  }, /*#__PURE__*/_react2["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react2["default"].createElement("div", {
    className: "col-lg-6 col-md-6 col-6"
  }, /*#__PURE__*/_react2["default"].createElement("div", {
    className: "title"
  }, /*#__PURE__*/_react2["default"].createElement("span", null, t("نام ناحیه"))), /*#__PURE__*/_react2["default"].createElement("input", {
    type: "text",
    name: "displayName",
    id: "displayName",
    placeholder: updateModalData === null || updateModalData === void 0 || (_updateModalData$curr = updateModalData.current) === null || _updateModalData$curr === void 0 ? void 0 : _updateModalData$curr.displayName,
    onChange: function onChange(e) {
      formik.setFieldValue("displayName", e.target.value);
    }
  })))), /*#__PURE__*/_react2["default"].createElement("div", {
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
  }, "بازگشت"))));
};
var _default = EditArea;
exports["default"] = _default;