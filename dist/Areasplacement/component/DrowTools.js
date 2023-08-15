"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactLeaflet = require("react-leaflet");
var _reactLeafletDraw = require("react-leaflet-draw");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// import L from "leaflet";

var DrawTools = function DrawTools() {
  var _onEdited = function _onEdited(e) {
    var numEdited = 0;
    e.layers.eachLayer(function (layer) {
      numEdited += 1;
    });
    console.log("_onEdited: edited ".concat(numEdited, " layers"), e);
    _onChange();
  };
  var _onCreated = function _onCreated(e) {
    var type = e.layerType;
    var layer = e.layer;
    if (type === "marker") {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
    } else {
      console.log("_onCreated: something else created:", type, e);
    }
    console.log("Geojson", layer.toGeoJSON());
    console.log("coords", layer.getLatLngs());
    // Do whatever else you need to. (save to db; etc)

    _onChange();
  };
  var _onDeleted = function _onDeleted(e) {
    var numDeleted = 0;
    e.layers.eachLayer(function (layer) {
      numDeleted += 1;
    });
    console.log("onDeleted: removed ".concat(numDeleted, " layers"), e);
    _onChange();
  };
  var _onMounted = function _onMounted(drawControl) {
    console.log("_onMounted", drawControl);
  };
  var _onEditStart = function _onEditStart(e) {
    console.log("_onEditStart", e);
  };
  var _onEditStop = function _onEditStop(e) {
    console.log("_onEditStop", e);
  };
  var _onDeleteStart = function _onDeleteStart(e) {
    console.log("_onDeleteStart", e);
  };
  var _onDeleteStop = function _onDeleteStop(e) {
    console.log("_onDeleteStop", e);
  };
  var _onDrawStart = function _onDrawStart(e) {
    console.log("_onDrawStart", e);
  };

  /*onEdited	function	hook to leaflet-draw's draw:edited event
  onCreated	function	hook to leaflet-draw's draw:created event
  onDeleted	function	hook to leaflet-draw's draw:deleted event
  onMounted	function	hook to leaflet-draw's draw:mounted event
  onEditStart	function	hook to leaflet-draw's draw:editstart event
  onEditStop	function	hook to leaflet-draw's draw:editstop event
  onDeleteStart	function	hook to leaflet-draw's draw:deletestart event
  onDeleteStop	function	hook to leaflet-draw's draw:deletestop event
  onDrawStart	function	hook to leaflet-draw's draw:drawstart event
  onDrawStop	function	hook to leaflet-draw's draw:drawstop event
  onDrawVertex	function	hook to leaflet-draw's draw:drawvertex event
  onEditMove	function	hook to leaflet-draw's draw:editmove event
  onEditResize	function	hook to leaflet-draw's draw:editresize event
  onEditVertex	function	hook to leaflet-draw's draw:editvertex event*/
  return /*#__PURE__*/_react["default"].createElement(_reactLeaflet.FeatureGroup, null, /*#__PURE__*/_react["default"].createElement(_reactLeafletDraw.EditControl, {
    onDrawStart: _onDrawStart,
    position: "topleft",
    onEdited: _onEdited,
    onCreated: _onCreated,
    onDeleted: _onDeleted,
    draw: {
      polyline: {
        icon: new L.DivIcon({
          iconSize: new L.Point(8, 8),
          className: "leaflet-div-icon leaflet-editing-icon"
        }),
        shapeOptions: {
          guidelineDistance: 10,
          color: "navy",
          weight: 3
        }
      },
      rectangle: false,
      circlemarker: false,
      circle: false,
      polygon: false
    }
  }));
};
var _default = DrawTools;
exports["default"] = _default;