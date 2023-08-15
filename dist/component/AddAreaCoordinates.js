"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("@emotion/react");
var _react2 = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactLeaflet = require("react-leaflet");
var _leaflet = _interopRequireDefault(require("leaflet"));
var _reactLeafletDraw = require("react-leaflet-draw");
var turf = _interopRequireWildcard(require("@turf/turf"));
var _sweetalert = _interopRequireDefault(require("sweetalert2"));
var _material = require("@mui/material");
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var AddAreaCoordinates = function AddAreaCoordinates(_ref) {
  var child = _ref.child,
    parent = _ref.parent,
    zoom = _ref.zoom,
    center = _ref.center,
    sameParentFeature = _ref.sameParentFeature,
    handleClose = _ref.handleClose,
    newArea = _ref.newArea,
    selectedCoordinates = _ref.selectedCoordinates,
    areasPlacementId = _ref.areasPlacementId;
  var appConfig = window.globalConfig;
  var _useState = (0, _react2.useState)(),
    _useState2 = _slicedToArray(_useState, 2),
    onChange = _useState2[0],
    setOnChange = _useState2[1];
  var _useState3 = (0, _react2.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    load = _useState4[0],
    setLoad = _useState4[1];
  var _useState5 = (0, _react2.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    areas = _useState6[0],
    setAreas = _useState6[1];
  var _useState7 = (0, _react2.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    intersection = _useState8[0],
    setIntersection = _useState8[1];
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    t = _useTranslation.t,
    i18n = _useTranslation.i18n;
  var theme = (0, _react.useTheme)();
  var _useState9 = (0, _react2.useState)(),
    _useState10 = _slicedToArray(_useState9, 2),
    refMap = _useState10[0],
    setRefMap = _useState10[1];
  var _useState11 = (0, _react2.useState)(),
    _useState12 = _slicedToArray(_useState11, 2),
    intersectionRef = _useState12[0],
    setIntersectionRef = _useState12[1];
  var _useState13 = (0, _react2.useState)(),
    _useState14 = _slicedToArray(_useState13, 2),
    editedArea = _useState14[0],
    setEditedArea = _useState14[1];
  var editableFG = null;
  var leafletGeoJSON;
  var _useState15 = (0, _react2.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    overlap = _useState16[0],
    setOverlap = _useState16[1];
  var _useState17 = (0, _react2.useState)([]),
    _useState18 = _slicedToArray(_useState17, 2),
    send = _useState18[0],
    setSend = _useState18[1];
  var sendd;
  var _useState19 = (0, _react2.useState)(false),
    _useState20 = _slicedToArray(_useState19, 2),
    edit = _useState20[0],
    setEdit = _useState20[1];
  function onFeatureGroupReady(reactFGref) {
    if (editableFG === null && !load) {
      console.log('child----------------------------', child);
      leafletGeoJSON = new _leaflet["default"].GeoJSON(child);
      leafletGeoJSON.eachLayer(function (layer) {
        layer.setStyle({
          color: "#1890ff",
          fillColor: "#1890ff",
          weight: 5,
          zIndex: 9999
        });
        reactFGref === null || reactFGref === void 0 ? void 0 : reactFGref.addLayer(layer);
        setAreas(layer.feature);
      });
      console.log('leafletGeoJSON---------', leafletGeoJSON);
      setRefMap(reactFGref);
      editableFG = reactFGref;
      setLoad(true);
    }
  }
  function onFeatureGroupReadyParent(reactFGref) {
    leafletGeoJSON = new _leaflet["default"].GeoJSON(parent);
    leafletGeoJSON.eachLayer(function (layer) {
      layer.setStyle({
        color: "#1890ff",
        fillColor: "none",
        weight: 5
      });
      reactFGref === null || reactFGref === void 0 ? void 0 : reactFGref.addLayer(layer);
    });
  }
  function onFeatureGroupReadyIntersection(reactFGref) {
    if (intersection.length) {
      console.log("intersection--------------------------", intersection);
      leafletGeoJSON = new _leaflet["default"].GeoJSON(intersection, {
        color: 'red'
      });
      leafletGeoJSON.eachLayer(function (layer) {
        layer.setStyle({
          color: "red",
          fillColor: "red",
          weight: 5
        });
        reactFGref === null || reactFGref === void 0 ? void 0 : reactFGref.addLayer(layer);
      });
      setIntersectionRef(reactFGref);
    }
  }
  function onFeatureGroupReadySameParent(reactFGref) {
    leafletGeoJSON = new _leaflet["default"].GeoJSON(sameParentFeature, {
      weight: 5,
      dashArray: [12, 12],
      color: '#ffffff'
    });
    leafletGeoJSON.eachLayer(function (layer) {
      layer.setStyle({
        color: "#1890ff",
        fillColor: "transparent",
        weight: 5
      });
      reactFGref === null || reactFGref === void 0 ? void 0 : reactFGref.addLayer(layer);
    });
  }
  function _onChange() {
    if (!editableFG || !onChange) {
      return;
    }
    var geojsonData = editableFG.leafletElement.toGeoJSON();
    setOnChange(geojsonData);
  }
  function onEdited(e) {
    var _e$layers, _e$layers2;
    var temp = {};
    var numEdited = 0;
    var type = e.layerType;
    e.layers.eachLayer(function (layar) {
      numEdited += 1;
    });
    console.log("onEdited: edited ".concat(numEdited, " layers"), e);
    console.log("......................", e.layers._layers[0]);
    temp = {
      id: e === null || e === void 0 || (_e$layers = e.layers) === null || _e$layers === void 0 || (_e$layers = _e$layers._layers) === null || _e$layers === void 0 ? void 0 : _e$layers._leaflet_id,
      type: type,
      coordinates: e === null || e === void 0 || (_e$layers2 = e.layers) === null || _e$layers2 === void 0 || (_e$layers2 = _e$layers2._layers) === null || _e$layers2 === void 0 ? void 0 : _e$layers2._latlngs
    };
    console.log("tttttttttttttttttttttttttttttttttttttttttt", temp);
    setAreas(temp);
    if (intersection.length < 1) {
      var _e$layer, _e$layer2;
      console.log("intersectionsssssssssssssssssssssssssssssssssss", e === null || e === void 0 || (_e$layer = e.layer) === null || _e$layer === void 0 ? void 0 : _e$layer._latlngs);
      e === null || e === void 0 || (_e$layer2 = e.layer) === null || _e$layer2 === void 0 || (_e$layer2 = _e$layer2._latlngs) === null || _e$layer2 === void 0 ? void 0 : _e$layer2.map(function (item) {
        sendd = item.map(function (l) {
          return {
            coordinatesAreasPlacementId: 0,
            placementId: areasPlacementId,
            lat: "".concat(l.lat),
            lng: "".concat(l.lng)
          };
        });
      });
      setSend(sendd);
    }
    _onChange();
    createData();
    setEdit(true);
    // clearintersection();
  }

  function onCreated(e) {
    var _e$layer3, _e$layer4;
    var type = e.layerType;
    var layer = e.layer;
    var temp = {};
    console.log("_onCreated: something else created:", type, e === null || e === void 0 ? void 0 : e.layer._latlngs);
    temp = {
      id: e === null || e === void 0 || (_e$layer3 = e.layer) === null || _e$layer3 === void 0 ? void 0 : _e$layer3._leaflet_id,
      type: type,
      coordinates: e === null || e === void 0 || (_e$layer4 = e.layer) === null || _e$layer4 === void 0 ? void 0 : _e$layer4._latlngs
    };
    setAreas(temp);
    if (intersection.length < 1) {
      var _e$layer5, _e$layer6;
      console.log("intersectionsssssssssssssssssssssssssssssssssss", e === null || e === void 0 || (_e$layer5 = e.layer) === null || _e$layer5 === void 0 ? void 0 : _e$layer5._latlngs);
      e === null || e === void 0 || (_e$layer6 = e.layer) === null || _e$layer6 === void 0 || (_e$layer6 = _e$layer6._latlngs) === null || _e$layer6 === void 0 ? void 0 : _e$layer6.map(function (item) {
        sendd = item.map(function (l) {
          return {
            coordinatesAreasPlacementId: 0,
            placementId: areasPlacementId,
            lat: "".concat(l.lat),
            lng: "".concat(l.lng)
          };
        });
      });
      setSend(sendd);
    }
    _onChange();
    createData();
  }
  function onDeleted(e) {
    var _e$layers3;
    var numDeleted = 0;
    e === null || e === void 0 || (_e$layers3 = e.layers) === null || _e$layers3 === void 0 ? void 0 : _e$layers3.eachLayer(function (layer) {
      numDeleted += 1;
    });
    console.log("onDeleted: removed ".concat(numDeleted, " layerseeeeeeeeeeeeee"), e);
    _onChange();
  }
  ;
  function createData() {
    var _editableFG, _Object$keys, _editableFG2;
    var temp = [];
    ((_editableFG = editableFG) === null || _editableFG === void 0 ? void 0 : _editableFG._layers) && ((_Object$keys = Object.keys((_editableFG2 = editableFG) === null || _editableFG2 === void 0 ? void 0 : _editableFG2._layers)) === null || _Object$keys === void 0 ? void 0 : _Object$keys.forEach(function (item) {
      var _editableFG3;
      var type = 'Polygon';
      temp.push({
        type: type,
        coordinates: (_editableFG3 = editableFG) === null || _editableFG3 === void 0 || (_editableFG3 = _editableFG3._layers[item]) === null || _editableFG3 === void 0 ? void 0 : _editableFG3._latlngs
      });
    }));
    setAreas(temp);
  }
  function onEditStart(e) {
    console.log("onEditStart", e);
  }
  ;
  function onMounted(drawControl) {
    console.log("onMounted", drawControl);
  }
  function onDeleteStart(e) {
    console.log("onDeleteStart", e);
  }
  ;
  function onEditStop(e) {
    console.log("onEditStop", e);
    createData();
    if (intersectionRef) {
      // setIntersection([])
      var mapp = intersectionRef;
      var drawnItems = mapp === null || mapp === void 0 ? void 0 : mapp._layers;
      clearintersection();
    }
  }
  ;
  function onDeleteStop(e) {
    console.log("onDeleteStop", e);
    console.log("editableFG", editableFG);
    createData();
  }
  ;
  (0, _react2.useEffect)(function () {
    if (areas.length > 1) {
      _sweetalert["default"].fire({
        icon: 'error',
        title: t('برای فیلد مورد نظر یک منطقه موجود است'),
        text: t("لطفا ابتدا منطقه موجود را حذف کنید"),
        confirmButtonColor: "#0084ff",
        confirmButtonText: t("تایید")
      });
    } else {
      if (areas.length) {
        var _areas$, _parent;
        var geo = _objectSpread(_objectSpread({}, areas[0]), {}, {
          coordinates: [(_areas$ = areas[0]) === null || _areas$ === void 0 || (_areas$ = _areas$.coordinates[0]) === null || _areas$ === void 0 ? void 0 : _areas$.map(function (item) {
            return [item === null || item === void 0 ? void 0 : item.lng, item === null || item === void 0 ? void 0 : item.lat];
          })]
        });
        var areaTemp = {
          type: "Feature",
          properties: {
            edit: false
          },
          geometry: geo
        };
        setEditedArea(areaTemp);
        var temp = [];
        var booleanOverlap;
        sameParentFeature === null || sameParentFeature === void 0 ? void 0 : sameParentFeature.forEach(function (a) {
          var _a$features$;
          if (a !== null && a !== void 0 && (_a$features$ = a.features[0]) !== null && _a$features$ !== void 0 && (_a$features$ = _a$features$.geometry) !== null && _a$features$ !== void 0 && (_a$features$ = _a$features$.coordinates[0]) !== null && _a$features$ !== void 0 && _a$features$.length) {
            // console.log("a...................", a?.features[0])
            var intersection = turf.intersect(areaTemp, a === null || a === void 0 ? void 0 : a.features[0]);
            temp.push(intersection);
          }
        });
        (_parent = parent) === null || _parent === void 0 ? void 0 : _parent.forEach(function (p) {
          if (!!(p !== null && p !== void 0 && p.features)) {
            booleanOverlap = turf.booleanOverlap(areaTemp, p === null || p === void 0 ? void 0 : p.features[0]);
            console.log("booleanOverlap...................", booleanOverlap);
          }
        });
        setOverlap(booleanOverlap);
        setIntersection(temp.filter(Boolean));
        if (!temp.filter(Boolean).length) {
          console.log('clearintersection if');
          if (intersectionRef) {
            clearintersection();
          }
        } else {
          console.log('clearintersection else', intersectionRef);
          if (intersectionRef) {
            console.log('clearintersection else if');
            clearintersection();
            leafletGeoJSON = new _leaflet["default"].GeoJSON(temp.filter(Boolean), {
              color: 'red'
            });
            leafletGeoJSON.eachLayer(function (layer) {
              layer.setStyle({
                color: "red",
                fillColor: "red",
                weight: 5
              });
              intersectionRef === null || intersectionRef === void 0 ? void 0 : intersectionRef.addLayer(layer);
            });
          }
        }
      } else if (intersectionRef) {
        console.log('clearintersection elseeeeeeeeeeeeee');
        clearintersection();
      }
    }
  }, [areas]);
  function clearintersection() {
    console.log('mapp........................');
    setIntersection([]);
    var mapp = intersectionRef;
    var drawnItems = mapp === null || mapp === void 0 ? void 0 : mapp._layers;
    if (Object.keys(drawnItems).length) {
      Object.keys(drawnItems).forEach(function (layerid, index) {
        var layer = drawnItems[layerid];
        mapp === null || mapp === void 0 ? void 0 : mapp.removeLayer(layer);
      });
    }
  }
  function submit() {
    if (!!intersectionRef) {
      _sweetalert["default"].fire({
        icon: 'error',
        title: t('برای فیلد مورد نظر همپوشانی موجود است'),
        text: t("لطفا ابتدا همپوشانی موجود را حذف یا ویرایش کنید"),
        confirmButtonColor: "#0084ff",
        confirmButtonText: t("تایید")
      });
    } else {
      var isSuccess = false;
      if (!overlap) {
        if (!edit) {
          console.log("editeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", edit);
          _axios["default"].post("".concat(appConfig.BaseURL, "/api/CoordinatesAreasPlacement/AddRange"), send).then(function (res) {
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
              parent = null;
              child = null;
              handleClose();
            }
          });
        } else {
          var _editedArea$geometry;
          var sendData = [];
          sendData = editedArea === null || editedArea === void 0 || (_editedArea$geometry = editedArea.geometry) === null || _editedArea$geometry === void 0 ? void 0 : _editedArea$geometry.coordinates[0].map(function (item) {
            return {
              coordinatesAreasPlacementId: 0,
              placementId: areasPlacementId,
              lat: "".concat(item[1]),
              lng: "".concat(item[0])
            };
          });
          _axios["default"].put("".concat(appConfig.BaseURL, "/api/CoordinatesAreasPlacement/UpdateRange/").concat(areasPlacementId), sendData).then(function (res) {
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
              handleClose();
            }
          });
        }
      } else {
        _sweetalert["default"].fire({
          icon: 'error',
          title: t('لطفا منطقه خود را خارج از منطقه والد رسم نکنید'),
          text: t("لطفا ابتدا بیرون زدگی موجود را حذف یا ویرایش کنید"),
          confirmButtonColor: "#0084ff",
          confirmButtonText: t("تایید")
        });
      }
    }
  }
  return /*#__PURE__*/_react2["default"].createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/_react2["default"].createElement("div", {
    className: "col-lg-12 col-md-12 col-12"
  }, /*#__PURE__*/_react2["default"].createElement(_reactLeaflet.MapContainer, {
    id: "map",
    center: center,
    zoom: zoom,
    style: {
      height: "70vh",
      width: "100%"
    }
  }, /*#__PURE__*/_react2["default"].createElement(_reactLeaflet.TileLayer, {
    attribution: "\xA9 <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }), /*#__PURE__*/_react2["default"].createElement(_reactLeaflet.FeatureGroup, {
    ref: function ref(reactFGref) {
      onFeatureGroupReadyParent(reactFGref);
    }
  }), /*#__PURE__*/_react2["default"].createElement(_reactLeaflet.FeatureGroup, {
    ref: function ref(reactFGref) {
      onFeatureGroupReadySameParent(reactFGref);
    }
  }), /*#__PURE__*/_react2["default"].createElement(_reactLeaflet.FeatureGroup, {
    ref: function ref(reactFGref) {
      onFeatureGroupReady(reactFGref);
    }
  }, /*#__PURE__*/_react2["default"].createElement(MapContent, {
    zoom: zoom,
    center: center,
    selectedCoordinates: selectedCoordinates
  }), /*#__PURE__*/_react2["default"].createElement(_reactLeafletDraw.EditControl, {
    position: "topright",
    onEdited: onEdited,
    onCreated: onCreated,
    onDeleted: onDeleted,
    onMounted: onMounted,
    onEditStart: onEditStart,
    onEditStop: onEditStop,
    onDeleteStart: onDeleteStart,
    onDeleteStop: onDeleteStop,
    draw: {
      circlemarker: false,
      rectangle: false,
      polyline: false,
      circle: false,
      marker: false,
      polygon: true
    }
  })), /*#__PURE__*/_react2["default"].createElement(_reactLeaflet.FeatureGroup, {
    ref: function ref(reactFGref) {
      onFeatureGroupReadyIntersection(reactFGref);
    }
  }))), /*#__PURE__*/_react2["default"].createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row-reverse",
      marginTop: "20px"
    }
  }, /*#__PURE__*/_react2["default"].createElement("div", null, /*#__PURE__*/_react2["default"].createElement(_material.Button, {
    variant: "outlined",
    color: "success",
    onClick: function onClick() {
      submit();
    },
    style: {
      width: "15px"
    }
  }, t("تایید"))), /*#__PURE__*/_react2["default"].createElement("div", null, /*#__PURE__*/_react2["default"].createElement(_material.Button, {
    variant: "outlined",
    color: "error",
    onClick: handleClose,
    style: {
      width: "15px",
      marginRight: "10px"
    }
  }, t("بازگشت")))));
};
var MapContent = function MapContent(_ref2) {
  var zoom = _ref2.zoom,
    center = _ref2.center,
    selectedCoordinates = _ref2.selectedCoordinates;
  var map = (0, _reactLeaflet.useMap)();
  (0, _react2.useEffect)(function () {
    if (selectedCoordinates !== null && selectedCoordinates !== void 0 && selectedCoordinates.length) {
      map.fitBounds([selectedCoordinates[0].map(function (item) {
        return [item[1], item[0]];
      })]);
    } else {
      map.flyTo(center, zoom);
    }
  }, [selectedCoordinates, center, zoom]);
};
var _default = AddAreaCoordinates;
exports["default"] = _default;