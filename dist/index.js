"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactLeaflet = require("react-leaflet");
require("leaflet/dist/leaflet.css");
var _react2 = require("@emotion/react");
var _material = require("@mui/material");
var _leaflet2 = _interopRequireDefault(require("leaflet"));
var _devextremeReact = require("devextreme-react");
var _reactI18next = require("react-i18next");
var _AddArea = _interopRequireDefault(require("./component/AddArea"));
var _axios = _interopRequireDefault(require("axios"));
var _accordion = require("devextreme-react/accordion");
var _AddAreaCoordinates = _interopRequireDefault(require("./component/AddAreaCoordinates"));
var _EditArea = _interopRequireDefault(require("./component/EditArea"));
var _sweetalert = _interopRequireDefault(require("sweetalert2"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return { value: void 0, done: !0 }; } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable || "" === iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } throw new TypeError(_typeof(iterable) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
_leaflet2["default"].Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png"
});
var AreasPlacement = function AreasPlacement() {
  var style = {
    color: '#006400',
    weight: 5,
    opacity: 0.65
  };
  var leafletGeoJSON;
  var leafletFG;
  var editableFG = null;
  var coordinates = [];
  var createModalData = (0, _react.useRef)();
  var updateModalData = (0, _react.useRef)();
  var deleteData = (0, _react.useRef)();
  var appConfig = window.globalConfig;
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    t = _useTranslation.t,
    i18n = _useTranslation.i18n;
  var theme = (0, _react2.useTheme)();
  var _useState = (0, _react.useState)(5),
    _useState2 = _slicedToArray(_useState, 2),
    zoom = _useState2[0],
    setZoom = _useState2[1];
  var _useState3 = (0, _react.useState)([35.69972115222563, -308.66168260574347]),
    _useState4 = _slicedToArray(_useState3, 2),
    center = _useState4[0],
    setCenter = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    load = _useState6[0],
    setLoad = _useState6[1];
  var _useState7 = (0, _react.useState)(),
    _useState8 = _slicedToArray(_useState7, 2),
    refMap = _useState8[0],
    setRefMap = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    edit = _useState10[0],
    setEdit = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    Delete = _useState12[0],
    setDelete = _useState12[1];
  var _useState13 = (0, _react.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    Add = _useState14[0],
    setAdd = _useState14[1];
  var _useState15 = (0, _react.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    open = _useState16[0],
    setOpen = _useState16[1];
  var _useState17 = (0, _react.useState)(null),
    _useState18 = _slicedToArray(_useState17, 2),
    currentFeature = _useState18[0],
    setCurrentFeature = _useState18[1];
  var _useState19 = (0, _react.useState)(),
    _useState20 = _slicedToArray(_useState19, 2),
    childFeature = _useState20[0],
    setChildFeature = _useState20[1];
  var _useState21 = (0, _react.useState)(),
    _useState22 = _slicedToArray(_useState21, 2),
    parentFeature = _useState22[0],
    setParentFeature = _useState22[1];
  var _useState23 = (0, _react.useState)(),
    _useState24 = _slicedToArray(_useState23, 2),
    sameParentFeature = _useState24[0],
    setSameParentFeature = _useState24[1];
  var _useState25 = (0, _react.useState)(false),
    _useState26 = _slicedToArray(_useState25, 2),
    loading = _useState26[0],
    setLoading = _useState26[1];
  var _useState27 = (0, _react.useState)(false),
    _useState28 = _slicedToArray(_useState27, 2),
    current = _useState28[0],
    setCurrent = _useState28[1];
  var _useState29 = (0, _react.useState)(false),
    _useState30 = _slicedToArray(_useState29, 2),
    createModalOpen = _useState30[0],
    setCreateModalOpen = _useState30[1];
  var _useState31 = (0, _react.useState)(false),
    _useState32 = _slicedToArray(_useState31, 2),
    updateModalOpen = _useState32[0],
    setUpdateModalOpen = _useState32[1];
  var _useState33 = (0, _react.useState)(),
    _useState34 = _slicedToArray(_useState33, 2),
    areasPlacementId = _useState34[0],
    setAreasPlacementId = _useState34[1];
  var _useState35 = (0, _react.useState)([]),
    _useState36 = _slicedToArray(_useState35, 2),
    expandedNode = _useState36[0],
    setExpandedNode = _useState36[1];
  var _useState37 = (0, _react.useState)([]),
    _useState38 = _slicedToArray(_useState37, 2),
    expandedNodeStatus = _useState38[0],
    setExpandedNodeStatus = _useState38[1];
  var _useState39 = (0, _react.useState)([]),
    _useState40 = _slicedToArray(_useState39, 2),
    datasource = _useState40[0],
    setdatasource = _useState40[1];
  var _useState41 = (0, _react.useState)(),
    _useState42 = _slicedToArray(_useState41, 2),
    levelOfNode = _useState42[0],
    setLevelOfNode = _useState42[1];
  var handleClickOpen = function handleClickOpen() {
    setOpen(true);
  };
  var handleClose = function handleClose() {
    setOpen(false);
    setCurrent([]);
    setAdd(false);
    setEdit(false);
    setDelete(false);
    getData();
    setParentFeature(null);
    setCurrentFeature(null);
    var mapp = refMap;
    if (Object.keys(mapp === null || mapp === void 0 ? void 0 : mapp._layers).length) {
      Object.keys(mapp === null || mapp === void 0 ? void 0 : mapp._layers).forEach(function (layerid, index) {
        var layer = mapp === null || mapp === void 0 ? void 0 : mapp._layers[layerid];
        mapp.removeLayer(layer);
      });
    }
    setRefMap(mapp);
  };
  function closeModalAndReload() {
    setCreateModalOpen(false);
    setUpdateModalOpen(false);
    getData();
  }
  (0, _react.useEffect)(function () {
    var expTemp = datasource.map(function (item) {
      return {
        AreasPlacementId: item.AreasPlacementId,
        expanded: (item === null || item === void 0 ? void 0 : item.expanded) || false
      };
    });
    setExpandedNodeStatus(expTemp);
  }, [expandedNode]);
  var getData = function getData() {
    setLoading(true);
    _axios["default"].get("".concat(appConfig.BaseURL, "/api/AreasPlacement")).then(function (res) {
      var temp = res.data.data.map(function (item) {
        var t = expandedNodeStatus.filter(function (f) {
          return f.AreasPlacementId == item.AreasPlacementId;
        })[0];
        if (item.AreasPlacementId == 0) {
          return _objectSpread(_objectSpread({}, item), {}, {
            expanded: true
          });
        } else {
          return _objectSpread(_objectSpread({}, item), {}, {
            expanded: (t === null || t === void 0 ? void 0 : t.expanded) || false
          });
        }
      });
      var x = temp.filter(function (a) {
        return a.level < 5 && a.level > 0 && a.haveCoordinates == false;
      });
      var y;
      x.forEach(function (item) {
        y = temp.filter(function (f) {
          return f.placementParentId !== item.areasPlacementId;
        });
        temp = y;
      });
      setdatasource(temp);
    })["catch"](function (error) {
      return error;
    })["finally"](function () {
      return setLoading(false);
    });
  };
  (0, _react.useEffect)(function () {
    getData();
  }, []);

  /* تابع زیر طوری نوشته شده که با کلیک روی هر منطقه ی موجود 
  در درخت مناطق خود آن منطقه و مناطق والد و مناطق فرزند آن نمایش داده شود  */
  function itemClick(_x2) {
    return _itemClick.apply(this, arguments);
  }
  function _itemClick() {
    _itemClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      var features, Parentfeatures, Parents, Parentcoordinates, Children, ChildrenFreatures, ChildrenCoordinates, SameParent, SameParentFeature, SameParentCoordinates, mapp, drawnItems, geo, _e$itemData2, _e$itemData3, _e$itemData4;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setAreasPlacementId(e.itemData.areasPlacementId);
            mapp = refMap;
            drawnItems = mapp === null || mapp === void 0 ? void 0 : mapp._layers;
            _context.next = 5;
            return _axios["default"].get("".concat(appConfig.BaseURL, "/api/CoordinatesAreasPlacement/GetById").concat(e.itemData.areasPlacementId)).then(function (res) {
              var _res$data;
              coordinates = res === null || res === void 0 || (_res$data = res.data) === null || _res$data === void 0 || (_res$data = _res$data.data) === null || _res$data === void 0 ? void 0 : _res$data.map(function (item) {
                return [parseFloat(item === null || item === void 0 ? void 0 : item.lng), parseFloat(item === null || item === void 0 ? void 0 : item.lat)];
              });
              if (coordinates.length > 0) {
                features = [{
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Polygon",
                    coordinates: [coordinates]
                  }
                }];
                setCurrent([coordinates]);
                setAdd(false);
                setEdit(true);
                setDelete(true);
              } else {
                setAdd(true);
                setEdit(false);
                setDelete(false);
                setCurrent([]);
              }
            })["finally"](function () {
              setLoading(false);
            });
          case 5:
            geo = {
              type: "FeatureCollection",
              features: features
            };
            /* -------------------------------------------------------------------------- */
            /*                       get areas that have same Parent                      */
            /* -------------------------------------------------------------------------- */
            setLoading(true);
            _axios["default"].get("".concat(appConfig.BaseURL, "/api/AreasPlacement/GetSameParentFeature/").concat(e.itemData.placementParentId)).then(function (res) {
              SameParent = res.data.data;
              SameParentFeature = SameParent.map(function (item) {
                if (item.level > 0 && item.areasPlacementId !== (e === null || e === void 0 ? void 0 : e.itemData.areasPlacementId)) {
                  var _item$coordinatesArea;
                  SameParentCoordinates = item === null || item === void 0 || (_item$coordinatesArea = item.coordinatesAreasPlacementDTOs) === null || _item$coordinatesArea === void 0 ? void 0 : _item$coordinatesArea.map(function (c) {
                    return [parseFloat(c === null || c === void 0 ? void 0 : c.lng), parseFloat(c === null || c === void 0 ? void 0 : c.lat)];
                  });
                  return [{
                    type: "Feature",
                    properties: {
                      edit: false
                    },
                    geometry: {
                      type: "Polygon",
                      coordinates: [SameParentCoordinates]
                    }
                  }];
                }
              });
              var SameParentGeo = SameParentFeature.map(function (item, index) {
                if (!!item) {
                  return {
                    type: "FeatureCollection",
                    features: item
                  };
                }
                return false;
              }).filter(Boolean);
              leafletGeoJSON = new _leaflet2["default"].GeoJSON(SameParentGeo, {
                weight: 5,
                color: '#ffffff'
              });
              leafletGeoJSON.eachLayer(function (layer) {
                layer.setStyle({
                  color: "#1890ff",
                  fillColor: "none",
                  weight: 5
                });
                mapp === null || mapp === void 0 ? void 0 : mapp.addLayer(layer);
              });
              setSameParentFeature(SameParentGeo);
            })["finally"](function () {
              setLoading(false);
            });
            if (!coordinates.length) {
              _context.next = 16;
              break;
            }
            /* -------------------------------------------------------------------------- */
            /*                  calculate center of selected areas                        */
            /* -------------------------------------------------------------------------- */

            /* -------- if the number of layers is bigger than 1 then manage layers ----- */
            if (Object.keys(drawnItems).length) {
              Object.keys(drawnItems).forEach(function (layerid, index) {
                var layer = drawnItems[layerid];
                mapp.removeLayer(layer);
              });
            }
            leafletGeoJSON = new _leaflet2["default"].GeoJSON(geo);
            leafletGeoJSON.eachLayer(function (layer) {
              layer.setStyle({
                color: "#1890ff",
                fillColor: "#1890ff",
                weight: 5
              });
              mapp === null || mapp === void 0 ? void 0 : mapp.addLayer(layer);
            });
            setCurrentFeature(geo);
            if ((e === null || e === void 0 || (_e$itemData2 = e.itemData) === null || _e$itemData2 === void 0 ? void 0 : _e$itemData2.level) > 0) {
              setLoading(true);
              _axios["default"].get("".concat(appConfig.BaseURL, "/api/AreasPlacement/GetParentFeature/").concat(e.itemData.areasPlacementId)).then(function (res) {
                Parents = res.data.data;
                Parentfeatures = Parents.map(function (item) {
                  if (item.level > 0) {
                    var _item$coordinatesArea2;
                    Parentcoordinates = item === null || item === void 0 || (_item$coordinatesArea2 = item.coordinatesAreasPlacementDTOs) === null || _item$coordinatesArea2 === void 0 ? void 0 : _item$coordinatesArea2.map(function (c) {
                      return [parseFloat(c === null || c === void 0 ? void 0 : c.lng), parseFloat(c === null || c === void 0 ? void 0 : c.lat)];
                    });
                    return [{
                      type: "Feature",
                      properties: {
                        edit: false
                      },
                      geometry: {
                        type: "Polygon",
                        coordinates: [Parentcoordinates]
                      }
                    }];
                  }
                });
                var ParentGeo = Parentfeatures.map(function (item, index) {
                  if (!!item) {
                    return {
                      type: "FeatureCollection",
                      features: item
                    };
                  }
                  return false;
                }).filter(Boolean);
                leafletGeoJSON = new _leaflet2["default"].GeoJSON(ParentGeo, {
                  weight: 5,
                  dashArray: [10, 10],
                  color: '#ffffff'
                });
                leafletGeoJSON.eachLayer(function (layer) {
                  layer.setStyle({
                    color: "#1890ff",
                    fillColor: "none",
                    weight: 5
                  });
                  mapp === null || mapp === void 0 ? void 0 : mapp.addLayer(layer);
                });
                setParentFeature(ParentGeo);
              })["finally"](function () {
                setLoading(false);
              });
              /* -------------------------------------------------------------------------- */
              /*                      get coordinates of Area's Children                    */
              /* -------------------------------------------------------------------------- */
              if (((_e$itemData3 = e.itemData) === null || _e$itemData3 === void 0 ? void 0 : _e$itemData3.level) < 4) {
                setLoading(true);
                _axios["default"].get("".concat(appConfig.BaseURL, "/api/AreasPlacement/GetChildrenFeature/").concat(e.itemData.areasPlacementId)).then(function (res) {
                  Children = res.data.data;
                  ChildrenFreatures = Children.map(function (item) {
                    if (item.level > 0) {
                      var _item$coordinatesArea3;
                      ChildrenCoordinates = item === null || item === void 0 || (_item$coordinatesArea3 = item.coordinatesAreasPlacementDTOs) === null || _item$coordinatesArea3 === void 0 ? void 0 : _item$coordinatesArea3.map(function (c) {
                        return [parseFloat(c === null || c === void 0 ? void 0 : c.lng), parseFloat(c === null || c === void 0 ? void 0 : c.lat)];
                      });
                      return [{
                        type: "Feature",
                        properties: {
                          edit: false
                        },
                        geometry: {
                          type: "Polygon",
                          coordinates: [ChildrenCoordinates]
                        }
                      }];
                    }
                  });
                  var childrenGeo = ChildrenFreatures.map(function (item, index) {
                    if (!!item) {
                      return {
                        type: "FeatureCollection",
                        features: item
                      };
                    } else {
                      return false;
                    }
                  }).filter(Boolean);
                  leafletGeoJSON = new _leaflet2["default"].GeoJSON(childrenGeo, {
                    weight: 5,
                    dashArray: [10, 10],
                    color: '#ffffff'
                  });
                  leafletGeoJSON.eachLayer(function (layer) {
                    layer.setStyle({
                      color: "#1890ff",
                      fillColor: "none",
                      weight: 5
                    });
                    mapp === null || mapp === void 0 ? void 0 : mapp.addLayer(layer);
                  });
                  setChildFeature(childrenGeo);
                })["finally"](setLoading(false));
              }
            }
            _context.next = 22;
            break;
          case 16:
            setCurrentFeature(null);
            Object.keys(drawnItems).forEach(function (layerid, index) {
              var layer = drawnItems[layerid];
              mapp.removeLayer(layer);
            });
            if (!((e === null || e === void 0 || (_e$itemData4 = e.itemData) === null || _e$itemData4 === void 0 ? void 0 : _e$itemData4.level) >= 1)) {
              _context.next = 22;
              break;
            }
            setLoading(true);
            _context.next = 22;
            return _axios["default"].get("".concat(appConfig.BaseURL, "/api/AreasPlacement/GetParentFeature/").concat(e.itemData.areasPlacementId)).then(function (res) {
              var _res$data2, _Parentfeatures$0$geo, _Parentfeatures;
              Parents = res.data.data;
              Parentfeatures = res === null || res === void 0 || (_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.data.map(function (item) {
                if (item.level > 0) {
                  var _item$coordinatesArea4;
                  Parentcoordinates = item === null || item === void 0 || (_item$coordinatesArea4 = item.coordinatesAreasPlacementDTOs) === null || _item$coordinatesArea4 === void 0 ? void 0 : _item$coordinatesArea4.map(function (c) {
                    return [parseFloat(c === null || c === void 0 ? void 0 : c.lng), parseFloat(c === null || c === void 0 ? void 0 : c.lat)];
                  });
                  return [{
                    type: "Feature",
                    properties: {
                      edit: false
                    },
                    geometry: {
                      type: "Polygon",
                      coordinates: [Parentcoordinates]
                    }
                  }];
                }
              });
              var ParentGeo = Parentfeatures.map(function (item, index) {
                if (!!item) {
                  return {
                    type: "FeatureCollection",
                    features: item
                  };
                }
                return false;
              }).filter(Boolean);
              if (((_Parentfeatures$0$geo = Parentfeatures[((_Parentfeatures = Parentfeatures) === null || _Parentfeatures === void 0 ? void 0 : _Parentfeatures.length) - 1][0].geometry) === null || _Parentfeatures$0$geo === void 0 ? void 0 : _Parentfeatures$0$geo.coordinates[0].length) > 0) {
                var _Parentfeatures$0$geo2, _Parentfeatures2;
                setCurrent([(_Parentfeatures$0$geo2 = Parentfeatures[((_Parentfeatures2 = Parentfeatures) === null || _Parentfeatures2 === void 0 ? void 0 : _Parentfeatures2.length) - 1][0].geometry) === null || _Parentfeatures$0$geo2 === void 0 ? void 0 : _Parentfeatures$0$geo2.coordinates[0]]);
              } else {
                setCurrent([]);
              }
              setParentFeature(ParentGeo);
              leafletGeoJSON = new _leaflet2["default"].GeoJSON(ParentGeo, {
                weight: 5,
                dashArray: [10, 10],
                color: '#ffffff'
              });
              leafletGeoJSON.eachLayer(function (layer) {
                layer.setStyle({
                  color: "#1890ff",
                  fillColor: "none",
                  weight: 5
                });
                mapp === null || mapp === void 0 ? void 0 : mapp.addLayer(layer);
              });
            })["finally"](function () {
              setLoading(false);
            });
          case 22:
            setRefMap(mapp);
            setLoad(true);
          case 24:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _itemClick.apply(this, arguments);
  }
  function onFeatureGroupReady(reactFGref) {
    if (editableFG === null && !load) {
      setRefMap(reactFGref);
      editableFG = reactFGref;
      setLoad(true);
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                    CRUD For Tree View    (AreasPlacement)                  */
  /* -------------------------------------------------------------------------- */
  function handleItemClick(e) {
    var _e$event, _e$event2;
    if ((e === null || e === void 0 || (_e$event = e.event) === null || _e$event === void 0 ? void 0 : _e$event.which) === 3 || (e === null || e === void 0 || (_e$event2 = e.event) === null || _e$event2 === void 0 ? void 0 : _e$event2.which) === 1) {
      var _e$itemData;
      updateModalData.current = e === null || e === void 0 ? void 0 : e.itemData;
      createModalData.current = e === null || e === void 0 ? void 0 : e.itemData;
      deleteData.current = e === null || e === void 0 || (_e$itemData = e.itemData) === null || _e$itemData === void 0 ? void 0 : _e$itemData.areasPlacementId;
    }
  }
  function OpenCreateModal() {
    var _createModalData$curr;
    if (!!createModalData && (createModalData === null || createModalData === void 0 || (_createModalData$curr = createModalData.current) === null || _createModalData$curr === void 0 ? void 0 : _createModalData$curr.level) < 5 || levelOfNode.level < 5) {
      setCreateModalOpen(true);
    } else {
      setCreateModalOpen(false);
    }
  }
  function OpenUpdateModal() {
    if (updateModalData.current.level < 5) {
      setUpdateModalOpen(true);
    } else {}
  }
  /* -------------------------------------------------------------------------- */
  /*                     Delete Coordinates Of Selected Area                    */
  /* -------------------------------------------------------------------------- */
  var _useState43 = (0, _react.useState)(false),
    _useState44 = _slicedToArray(_useState43, 2),
    isDeleted = _useState44[0],
    setIsDeleted = _useState44[1];
  var swalWithBootstrapButtons = _sweetalert["default"].mixin({
    customClass: {
      container: 'swalRTL'
    }
  });
  var deleteArea = function deleteArea() {
    swalWithBootstrapButtons.fire({
      title: 'حذف شود؟',
      text: "شما در حال حذف یک منطقه می باشید...",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009c12',
      cancelButtonColor: '#ff4d4f',
      confirmButtonText: 'بله',
      cancelButtonText: "خیر"
    }).then(function (result) {
      if (result.isConfirmed) {
        var isSuccess;
        _axios["default"]["delete"]("".concat(appConfig.BaseURL, "/api/AreasPlacement/").concat(deleteData.current)).then(function (res) {
          setCurrent([]);
          getData();
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
          editableFG = null;
          swalWithBootstrapButtons.fire('حذف شد!', 'منطقه مورد نظر حذف شد.', 'success');
        });
      }
    });
  };
  function rightClickMenu(e) {
    if (e.itemIndex === 0) {
      OpenCreateModal();
    }
    if (e.itemIndex === 1) {
      OpenUpdateModal();
    }
    if (e.itemIndex === 2) {
      deleteArea();
    }
  }
  function DeleteCoordinates(e) {
    swalWithBootstrapButtons.fire({
      title: 'حذف شود؟',
      text: "شما در حال حذف یک منطقه می باشید...",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009c12',
      cancelButtonColor: '#ff4d4f',
      confirmButtonText: 'بله',
      cancelButtonText: "خیر"
    }).then(function (result) {
      if (result.isConfirmed) {
        var isSuccess;
        _axios["default"]["delete"]("".concat(appConfig.BaseURL, "/api/CoordinatesAreasPlacement/DeleteRange/").concat(areasPlacementId)).then(function (res) {
          getData();
          console.log('theeeeeeeeen', res);
          setCurrentFeature(null);
          setCurrent([]);
          setAdd(false);
          setEdit(false);
          setDelete(false);
          setAreasPlacementId();
          editableFG = null;
          var mapp = refMap;
          isSuccess = true;
          if (Object.keys(mapp === null || mapp === void 0 ? void 0 : mapp._layers).length) {
            Object.keys(mapp === null || mapp === void 0 ? void 0 : mapp._layers).forEach(function (layerid, index) {
              var layer = mapp === null || mapp === void 0 ? void 0 : mapp._layers[layerid];
              mapp.removeLayer(layer);
            });
          }
          setRefMap(mapp);
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
          swalWithBootstrapButtons.fire('حذف شد!', 'منطقه مورد نظر حذف شد.', 'success');
        });
      }
    });
  }
  console.log('currentFeature......', currentFeature);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      backgroundColor: "".concat(theme.palette.background.paper, " "),
      padding: '20px'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "row form-design"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-lg-4 col-md-4 col-12"
  }, /*#__PURE__*/_react["default"].createElement(_material.Paper, {
    style: {
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap"
    },
    elevation: 5,
    className: "paper-pda"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-lg-12 col-md-12 col-12",
    style: {
      height: " 90%"
    }
  }, loading ? /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      "with": '100%'
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.CircularProgress, null)) : /*#__PURE__*/_react["default"].createElement(_devextremeReact.TreeView, {
    dataStructure: "plain",
    className: theme.palette.mode === "dark" && "dark-tree",
    id: "simple-treeview",
    rtlEnabled: i18n.dir() == "ltr" ? false : true,
    items: datasource,
    displayExpr: "displayName",
    onItemExpanded: function onItemExpanded(e) {
      return setExpandedNode(e.node);
    },
    onItemSelectionChanged: function onItemSelectionChanged(e) {
      return setLevelOfNode(e === null || e === void 0 ? void 0 : e.itemData);
    },
    itemRender: function itemRender(e) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        "class": e !== null && e !== void 0 && e.haveCoordinates ? 'green-item' : e.level === 0 ? 'black-item' : 'red-item'
      }, e.displayName);
    },
    selectByClick: true,
    selectionMode: "single",
    keyExpr: "areasPlacementId",
    parentIdExpr: "placementParentId",
    onItemClick: function onItemClick(e) {
      itemClick(e);
      handleItemClick();
    },
    onItemContextMenu: handleItemClick,
    width: 300
  }), /*#__PURE__*/_react["default"].createElement(_devextremeReact.ContextMenu, {
    target: "#simple-treeview",
    onItemClick: rightClickMenu,
    rtlEnabled: true
  }, /*#__PURE__*/_react["default"].createElement(_accordion.Item, {
    text: "\u062C\u062F\u06CC\u062F",
    icon: "plus"
  }), /*#__PURE__*/_react["default"].createElement(_accordion.Item, {
    text: "\u0648\u06CC\u0631\u0627\u06CC\u0634",
    icon: "edit"
  }), /*#__PURE__*/_react["default"].createElement(_accordion.Item, {
    text: "\u062D\u0630\u0641",
    icon: "trash"
  }))), Add && !edit && !Delete ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "d-flex justify-content-center",
    style: {
      margin: "5px",
      width: "100%"
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "contained",
    color: "info",
    style: {
      width: "70px",
      height: "30px"
    },
    onClick: function onClick() {
      console.log("levelOfNode", levelOfNode);
      (levelOfNode === null || levelOfNode === void 0 ? void 0 : levelOfNode.level) === 0 ? OpenCreateModal() : handleClickOpen();
    }
  }, t("تعریف"))) : !Add && edit && !Delete ? /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      margin: "5px",
      height: "30px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "contained",
    color: "warning",
    style: {
      width: "70px"
    },
    onClick: function onClick() {
      handleClickOpen();
    }
  }, t("ویرایش"))) : !Add && !edit && !Delete ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null) : /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      height: "10%",
      width: "100%"
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      margin: "5px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "contained",
    color: "warning",
    style: {
      width: "70px",
      height: "30px"
    },
    onClick: function onClick() {
      handleClickOpen();
    }
  }, t("ویرایش"))), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      margin: "5px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.Button, {
    variant: "contained",
    color: "error",
    style: {
      width: "70px",
      height: "30px"
    },
    onClick: function onClick(e) {
      return DeleteCoordinates(e);
    }
  }, t("حذف")))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-lg-8 col-md-8 col-12"
  }, /*#__PURE__*/_react["default"].createElement(_material.Paper, {
    elevation: 2,
    className: "paper-pda",
    style: {
      boxShadow: "1px 5px 8px #c3c3c3"
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactLeaflet.MapContainer, {
    id: "map",
    center: center,
    zoom: zoom,
    style: {
      height: "70vh",
      width: "100%"
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactLeaflet.TileLayer, {
    attribution: "\xA9 <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }), /*#__PURE__*/_react["default"].createElement(MapContent, {
    zoom: zoom,
    center: center,
    selectedCoordinates: current
  }), /*#__PURE__*/_react["default"].createElement(_reactLeaflet.FeatureGroup, {
    ref: function ref(reactFGref) {
      onFeatureGroupReady(reactFGref);
    }
  })))))), /*#__PURE__*/_react["default"].createElement(_material.Dialog, {
    open: open,
    onClose: handleClose,
    fullWidth: true,
    maxWidth: 'xlg',
    "aria-labelledby": "scroll-dialog-title",
    "aria-describedby": "scroll-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_material.DialogContent, null, /*#__PURE__*/_react["default"].createElement(_material.DialogContentText, {
    id: "scroll-dialog-description",
    tabIndex: -1
  }, /*#__PURE__*/_react["default"].createElement(_AddAreaCoordinates["default"], {
    child: currentFeature,
    parent: parentFeature,
    sameParentFeature: sameParentFeature,
    areasPlacementId: areasPlacementId,
    zoom: zoom,
    center: center,
    handleClose: handleClose,
    selectedCoordinates: current
  })))), /*#__PURE__*/_react["default"].createElement(_material.Dialog, {
    open: createModalOpen,
    onClose: closeModalAndReload,
    fullWidth: false,
    maxWidth: 'md',
    "aria-labelledby": "scroll-dialog-title",
    "aria-describedby": "scroll-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_material.DialogContent, null, /*#__PURE__*/_react["default"].createElement(_material.DialogContentText, {
    id: "scroll-dialog-description",
    tabIndex: -1
  }, /*#__PURE__*/_react["default"].createElement(_AddArea["default"], {
    closeModalAndReload: closeModalAndReload,
    createModalData: createModalData,
    levelOfNode: levelOfNode
  })))), /*#__PURE__*/_react["default"].createElement(_material.Dialog, {
    open: updateModalOpen,
    onClose: closeModalAndReload,
    fullWidth: false,
    maxWidth: 'md',
    "aria-labelledby": "scroll-dialog-title",
    "aria-describedby": "scroll-dialog-description"
  }, /*#__PURE__*/_react["default"].createElement(_material.DialogContent, null, /*#__PURE__*/_react["default"].createElement(_material.DialogContentText, {
    id: "scroll-dialog-description",
    tabIndex: -1
  }, /*#__PURE__*/_react["default"].createElement(_EditArea["default"], {
    closeModalAndReload: closeModalAndReload,
    updateModalData: updateModalData
  })))));
};
var MapContent = function MapContent(_ref) {
  var zoom = _ref.zoom,
    center = _ref.center,
    selectedCoordinates = _ref.selectedCoordinates;
  var map = (0, _reactLeaflet.useMap)();
  (0, _react.useEffect)(function () {
    if (selectedCoordinates !== null && selectedCoordinates !== void 0 && selectedCoordinates.length) {
      map.fitBounds([selectedCoordinates[0].map(function (item) {
        return [item[1], item[0]];
      })]);
    } else {
      map.flyTo(center, zoom);
    }
  }, [selectedCoordinates, center, zoom]);
};
var _default = AreasPlacement;
exports["default"] = _default;