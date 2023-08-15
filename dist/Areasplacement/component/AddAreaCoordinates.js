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
var _lab = require("@mui/lab");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
  var _useState9 = (0, _react2.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    refMap = _useState10[0],
    setRefMap = _useState10[1];
  // const [intersectionRef, setIntersectionRef] = useState()
  var _useState11 = (0, _react2.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    loading = _useState12[0],
    setLoading = _useState12[1];
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
  var _useState21 = (0, _react2.useState)(true),
    _useState22 = _slicedToArray(_useState21, 2),
    Within = _useState22[0],
    setWithin = _useState22[1];
  var areasRef = (0, _react2.useRef)();
  areasRef.current = areas;
  var intersectionRef = (0, _react2.useRef)();
  function onFeatureGroupReady(reactFGref) {
    console.log("onjaaaaaaaaaaaINTER", intersection);
    console.log("onjaaaaaaaaaaaAREAA", areas);
    if (refMap === null && !load && child !== null) {
      console.log("innnnnnnnnnnnnnnnnnnnnnnnnn");
      leafletGeoJSON = new _leaflet["default"].GeoJSON(child);
      leafletGeoJSON.eachLayer(function (layer) {
        layer.setStyle({
          color: "#1890ff",
          fillColor: "#1890ff",
          weight: 5,
          zIndex: 9999
        });
        reactFGref === null || reactFGref === void 0 ? void 0 : reactFGref.addLayer(layer);
        setAreas([layer.feature]);
      });
      console.log("reactFGref++++++", reactFGref);
      setRefMap(reactFGref);
      editableFG = reactFGref;
      setLoad(true);
    }
  }
  console.log("refMap++++++", refMap);
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
    console.log("injaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2INTER", intersection);
    console.log("injaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2AREA  ", areas);
    if (intersection.length) {
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
      intersectionRef.current = reactFGref;
      // setIntersectionRef(reactFGref)
      console.log("intersectionRef.current-----------------  ", intersectionRef.current);
    }
  }
  console.log("intersectionRef//////////////////", intersectionRef.current);
  function onFeatureGroupReadySameParent(reactFGref) {
    leafletGeoJSON = new _leaflet["default"].GeoJSON(sameParentFeature, {
      weight: 5,
      dashArray: [12, 12],
      color: '#ffffff'
    });
    leafletGeoJSON.eachLayer(function (layer) {
      layer.setStyle({
        color: "#1890ff",
        fillColor: "none",
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
    _onChange();
    var type = 'Polygon';
    var layer = e === null || e === void 0 || (_e$layers = e.layers) === null || _e$layers === void 0 ? void 0 : _e$layers._layers[Object.keys(e === null || e === void 0 || (_e$layers2 = e.layers) === null || _e$layers2 === void 0 ? void 0 : _e$layers2._layers)[0]];
    var temp = {};
    temp = {
      type: "Feature",
      properties: {},
      geometry: {
        type: type,
        coordinates: layer._latlngs
      }
    };
    setAreas([temp]);
  }
  function onCreated(e) {
    var _e$layer;
    var type = 'Polygon';
    var layer = e.layer;
    var temp = {};
    console.log("_onCreated: something else created:", type, e === null || e === void 0 ? void 0 : e.layer._latlngs);
    console.log('areasRef----------', areasRef);
    console.log('areas----------', areas);
    console.log('areas.length === 0------', areas.length === 0);
    // if (areas.length === 0) {
    //     console.log('if-----')
    temp = {
      type: "Feature",
      properties: {},
      geometry: {
        type: type,
        coordinates: [e === null || e === void 0 || (_e$layer = e.layer) === null || _e$layer === void 0 ? void 0 : _e$layer._latlngs[0].map(function (item) {
          return [item.lng, item.lat];
        })]
      }
    };
    setAreas([temp]);
    if (intersection.length < 1) {
      var _e$layer2;
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
    // createData();
  }

  function onDeleted(e) {
    var _e$layers3;
    setEdit(true);
    var numDeleted = 0;
    e === null || e === void 0 || (_e$layers3 = e.layers) === null || _e$layers3 === void 0 ? void 0 : _e$layers3.eachLayer(function (layer) {
      numDeleted += 1;
    });
    console.log("onDeleted: removed ".concat(numDeleted, " layerseeeeeeeeeeeeee"), e);
    console.log("areasRef.current", areasRef.current);

    // let temp = areasRef.current
    // Object.keys(e?.layers?._layers).forEach((item) => {
    //     let deletedLayer = e?.layers?._layers[item]._latlngs[0].map(item => ([item.lng, item.lat]))
    //     temp = temp.filter((p) => {
    //         return !arrayEquals(p.geometry.coordinates[0].flat(), deletedLayer.flat())
    //     })
    // })

    // let geo;
    // if (numDeleted === areas.length) {
    setAreas([]);
    clearintersection();
    setIntersection([]);

    // }
    // else {
    //     setAreas(temp)
    //     clearintersection()
    //     // setIntersection([])
    //     _onChange();
    // }
  }
  ;
  console.log("areaaaaaaaaaaaaaa", areas);
  console.log("intrssssssssssss", intersection);
  function onEditStart(e) {
    console.log("onEditStart", e);
    setEdit(true);
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
    if (intersectionRef.current) {
      var mapp = intersectionRef.current;
      var drawnItems = mapp === null || mapp === void 0 ? void 0 : mapp._layers;
      clearintersection();
      console.log(intersection);
    }
  }
  ;
  function onDeleteStop(e) {
    console.log("onDeleteStop", e);
  }
  ;
  (0, _react2.useEffect)(function () {
    if (areas.length > 1) {
      setLoading(false);
      _sweetalert["default"].fire({
        icon: 'error',
        title: t('برای فیلد مورد نظر یک منطقه موجود است'),
        text: t("لطفا ابتدا منطقه موجود را حذف کنید"),
        confirmButtonColor: "#0084ff",
        confirmButtonText: t("تایید")
      });
    } else {
      if (areas.length) {
        var _areas$;
        console.log(":???????????????????????1111111111");
        var geo;
        if (!Array.isArray((_areas$ = areas[0]) === null || _areas$ === void 0 || (_areas$ = _areas$.geometry) === null || _areas$ === void 0 ? void 0 : _areas$.coordinates[0][0])) {
          var _areas$2;
          geo = {
            type: 'Polygon',
            coordinates: [(_areas$2 = areas[0]) === null || _areas$2 === void 0 || (_areas$2 = _areas$2.geometry) === null || _areas$2 === void 0 || (_areas$2 = _areas$2.coordinates[0]) === null || _areas$2 === void 0 ? void 0 : _areas$2.map(function (item) {
              return [item === null || item === void 0 ? void 0 : item.lng, item === null || item === void 0 ? void 0 : item.lat];
            })]
          };
        } else {
          var _areas$3;
          geo = {
            type: 'Polygon',
            coordinates: [(_areas$3 = areas[0]) === null || _areas$3 === void 0 || (_areas$3 = _areas$3.geometry) === null || _areas$3 === void 0 ? void 0 : _areas$3.coordinates[0]]
          };
        }
        var areaTemp = {
          type: "Feature",
          properties: {
            edit: false
          },
          geometry: geo
        };
        setEditedArea(areaTemp);
        var temp = [];
        var booleanOverlap = false;
        var booleanWithin = true;
        if (!!sameParentFeature) {
          sameParentFeature === null || sameParentFeature === void 0 ? void 0 : sameParentFeature.forEach(function (a) {
            var _a$features$;
            if (a !== null && a !== void 0 && (_a$features$ = a.features[0]) !== null && _a$features$ !== void 0 && (_a$features$ = _a$features$.geometry) !== null && _a$features$ !== void 0 && (_a$features$ = _a$features$.coordinates[0]) !== null && _a$features$ !== void 0 && _a$features$.length) {
              var intersection = turf.intersect(areaTemp, a === null || a === void 0 ? void 0 : a.features[0]);
              temp.push(intersection);
            }
          });
        }
        if (!!parent) {
          var _parent;
          (_parent = parent) === null || _parent === void 0 ? void 0 : _parent.forEach(function (p) {
            var _p$features$;
            if (!!(p !== null && p !== void 0 && (_p$features$ = p.features[0]) !== null && _p$features$ !== void 0 && (_p$features$ = _p$features$.geometry) !== null && _p$features$ !== void 0 && (_p$features$ = _p$features$.coordinates[0]) !== null && _p$features$ !== void 0 && _p$features$.length)) {
              booleanOverlap = turf.booleanOverlap(areaTemp, p === null || p === void 0 ? void 0 : p.features[0]);
              booleanWithin = turf.booleanWithin(areaTemp, p === null || p === void 0 ? void 0 : p.features[0]);
              setOverlap(booleanOverlap);
              setWithin(booleanWithin);
            }
          });
        }
        if (!temp.filter(Boolean).length) {
          console.log(":???????????????????????22222222222");
          if (intersectionRef.current) {
            clearintersection();
            setIntersection([]);
          }
        } else {
          console.log(":???????????????????????3");
          console.log("temp.filter(Boolean)xxxxxxxxxxx", temp.filter(Boolean));
          setIntersection(temp.filter(Boolean));
          if (intersectionRef.current) {
            console.log("intersectionRef.currentxxxxxxxxxxx", intersectionRef.current);
            clearintersection();
            console.log("intersectionRef.current222xxxxxxxx", intersectionRef.current);
            // leafletGeoJSON = new L.GeoJSON(temp.filter(Boolean), { color: 'red' });
            // leafletGeoJSON.eachLayer(layer => {
            //     layer.setStyle({ color: "red", fillColor: "red", weight: 5 })
            //     intersectionRef.current?.addLayer(layer);
            // });
            console.log("intersectionRef.current666666666xxxxxxxx", intersectionRef.current);
          }
        }
      } else if (intersectionRef.current) {
        clearintersection();
        setIntersection([]);
        setWithin(false);
      } else {
        setIntersection([]);
        setWithin(false);
      }
    }
  }, [areas]);
  function clearintersection() {
    var _Object$keys;
    // setIntersection([])
    var mapp = intersectionRef.current;
    console.log("mapp", mapp);
    var drawnItems = mapp === null || mapp === void 0 ? void 0 : mapp._layers;
    if (Object !== null && Object !== void 0 && (_Object$keys = Object.keys(drawnItems)) !== null && _Object$keys !== void 0 && _Object$keys.length) {
      var _Object$keys2;
      console.log("Object?.keys(drawnItems)", Object === null || Object === void 0 ? void 0 : Object.keys(drawnItems));
      Object === null || Object === void 0 || (_Object$keys2 = Object.keys(drawnItems)) === null || _Object$keys2 === void 0 ? void 0 : _Object$keys2.forEach(function (layerid, index) {
        var layer = drawnItems[layerid];
        console.log('clearintersection layer', layer);
        mapp === null || mapp === void 0 ? void 0 : mapp.removeLayer(layer);
      });
    }
    intersectionRef.current = mapp;
    console.log("mapp2222222222", intersectionRef.current);
  }
  function submit() {
    if (areas.length > 1) {
      setLoading(false);
      _sweetalert["default"].fire({
        icon: 'error',
        title: t('برای فیلد مورد نظر یک منطقه موجود است'),
        text: t("لطفا ابتدا منطقه موجود را حذف کنید"),
        confirmButtonColor: "#0084ff",
        confirmButtonText: t("تایید")
      });
    } else {
      if (!!intersectionRef.current) {
        setLoading(false);
        _sweetalert["default"].fire({
          icon: 'error',
          title: t('برای فیلد مورد نظر همپوشانی موجود است'),
          text: t("لطفا ابتدا همپوشانی موجود را حذف یا ویرایش کنید"),
          confirmButtonColor: "#0084ff",
          confirmButtonText: t("تایید")
        });
      } else {
        var isSuccess = false;
        if (!overlap && Within) {
          if (!edit) {
            setLoading(true);
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
                setLoading(false);
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
                setEdit(false);
              }
            });
          }
        } else {
          setLoading(false);
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
  }
  function onDrawStart(e) {
    console.log('onDrawStart', e);
  }
  return /*#__PURE__*/_react2["default"].createElement("div", {
    style: {
      width: "100%"
    },
    className: "".concat(areas.length > 0 ? 'disable-add' : '')
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
      onFeatureGroupReadySameParent(reactFGref);
    }
  }), /*#__PURE__*/_react2["default"].createElement(_reactLeaflet.FeatureGroup, {
    ref: function ref(reactFGref) {
      onFeatureGroupReadyParent(reactFGref);
    }
  }), /*#__PURE__*/_react2["default"].createElement(_reactLeaflet.FeatureGroup, {
    ref: function ref(reactFGref) {
      onFeatureGroupReadyIntersection(reactFGref);
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
    onDrawStart: onDrawStart,
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
  })))), /*#__PURE__*/_react2["default"].createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row-reverse",
      marginTop: "20px"
    }
  }, /*#__PURE__*/_react2["default"].createElement("div", {
    className: "d-flex justifyContent-center ".concat(i18n.dir == 'ltr' ? 'ltr' : 'rtl')
  }, /*#__PURE__*/_react2["default"].createElement(_lab.LoadingButton, {
    variant: "contained",
    color: "success",
    type: "button",
    disabled: areas.length > 0 ? false : true,
    onClick: function onClick() {
      setLoading(true);
      submit();
    },
    loading: loading
  }, t("تایید"))), /*#__PURE__*/_react2["default"].createElement("div", {
    style: {
      marginRight: "20px",
      marginLeft: "20px"
    }
  }, /*#__PURE__*/_react2["default"].createElement(_material.Button, {
    variant: "contained",
    color: "error",
    onClick: handleClose,
    style: {
      width: "60px"
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