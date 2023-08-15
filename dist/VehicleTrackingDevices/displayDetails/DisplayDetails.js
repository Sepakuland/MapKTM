"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _RKGrid = _interopRequireDefault(require("../../../../../components/RKGrid/RKGrid"));
var _material = require("@mui/material");
var _reactI18next = require("react-i18next");
var _IndexCell = _interopRequireDefault(require("../../../../../components/RKGrid/IndexCell"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var DisplayDetails = function DisplayDetails() {
  var theme = (0, _material.useTheme)();
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    t = _useTranslation.t,
    i18n = _useTranslation.i18n;
  var location = (0, _reactRouterDom.useLocation)();
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var dataRef = (0, _react.useRef)();
  var appConfig = window.globalConfig;
  var _useSearchParams = (0, _reactRouterDom.useSearchParams)(),
    _useSearchParams2 = _slicedToArray(_useSearchParams, 1),
    SearchParams = _useSearchParams2[0];
  var id = SearchParams.get("id");
  dataRef.current = data;
  var _useState3 = (0, _react.useState)(),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedRows = _useState4[0],
    SetSelectedRows = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var _useState7 = (0, _react.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    total = _useState8[0],
    setTotal = _useState8[1];
  var _useState9 = (0, _react.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    excelData = _useState10[0],
    setExcelData = _useState10[1];

  // useEffect(() => {
  // let tempData = Data.map((data) => {
  // let temp = (data.Debtor).toString().replaceAll(',', '')
  // let cost = parseFloat(temp, 2)

  // let temp2 = (data.Creditor).toString().replaceAll(',', '')
  // let cost2 = parseFloat(temp2, 2)

  //   return {
  //     ...data,
  //     // DocumentDate: new Date(data.DocumentDate),
  //     // Debtor: cost,
  //     // Creditor: cost2,

  //   }
  // })
  // setData(Data)

  // let tempExcel = Data?.map((data, index) => {
  //     let temp = (data.Debtor).toString().replaceAll(',', '')
  //     let cost = parseFloat(temp, 2)

  //     let temp2 = (data.Creditor).toString().replaceAll(',', '')
  //     let cost2 = parseFloat(temp2, 2)

  //   return {
  //     ...data,
  //     DocumentDate: new Date(data.DocumentDate),
  //     Debtor: cost,
  //     Creditor: cost2,

  //   }
  // })
  // setExcelData(tempExcel)

  //   }, [i18n.language])
  // console.log("data",data)

  // useEffect(() => {
  //     if (location?.search !== "") {
  //         getData();
  //     }
  // }, [location]);

  var tempColumn = [{
    field: "IndexCell",
    filterable: false,
    width: "60px",
    name: "ردیف",
    cell: _IndexCell["default"],
    sortable: false,
    reorderable: true
  }, {
    field: "device",
    name: "دستگاه",
    children: [{
      field: "IMEI",
      name: "IMEI",
      filterable: true
    }, {
      field: "title",
      name: "عنوان",
      filterable: true
    }]
  }, {
    field: "Driver",
    name: "راننده",
    children: [{
      field: "code",
      name: "کد",
      filterable: true
    }, {
      field: "name",
      name: "نام",
      filterable: true
    }]
  }, {
    field: "car",
    name: "خودرو",
    children: [{
      field: "number",
      name: "شماره",
      filterable: true
    }, {
      field: "title",
      name: "عنوان",
      filterable: true
    }]
  }];
  return /*#__PURE__*/_react.React.createElement(_react.React.Fragment, null, /*#__PURE__*/_react.React.createElement("div", {
    style: {
      backgroundColor: "".concat(theme.palette.background.paper),
      padding: "20px"
    }
  }, /*#__PURE__*/_react.React.createElement(_RKGrid["default"], {
    gridId: "TrackingDevices",
    gridData: data,
    columnList: tempColumn,
    showSetting: true,
    showChart: false,
    showExcelExport: true,
    showPrint: true,
    rowCount: 10,
    sortable: true,
    pageable: true,
    reorderable: true,
    selectable: false,
    selectKeyField: "TrackingDevicesId",
    showFilter: true,
    total: total,
    showTooltip: true,
    loading: loading
    // getSelectedRows={getSelectedRows}
    // 
  })));
};
var _default = DisplayDetails;
exports["default"] = _default;