"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGlobalState = exports.GlobalStateProvider = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactHooksGlobalState = require("react-hooks-global-state");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var initialState = {
  editLayers: []
};
var _createGlobalState = (0, _reactHooksGlobalState.createGlobalState)(initialState),
  GlobalStateProvider = _createGlobalState.GlobalStateProvider,
  useGlobalState = _createGlobalState.useGlobalState;
exports.useGlobalState = useGlobalState;
exports.GlobalStateProvider = GlobalStateProvider;