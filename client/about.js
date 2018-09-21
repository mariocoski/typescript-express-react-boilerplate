(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["about"],{

/***/ "./src/universal/pages/about/index.tsx":
/*!*********************************************!*\
  !*** ./src/universal/pages/about/index.tsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions */ "./src/universal/actions/index.ts");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var mapStateToProps = function mapStateToProps(state, ownProps) {
    return {
        locationChanged: state.location.locationChanged,
        description: state.about.description,
        isLoading: state.about.isLoading
    };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
    return {
        fetchDescription: function fetchDescription() {
            return dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_3__["fetchDescription"])());
        }
    };
};

var About = function (_React$Component) {
    _inherits(About, _React$Component);

    function About(props) {
        _classCallCheck(this, About);

        return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).call(this, props));
    }

    _createClass(About, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.props.locationChanged) {
                this.props.fetchDescription();
            }
        }
    }, {
        key: "description",
        value: function description() {
            return this.props.isLoading ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                "p",
                null,
                "Loading..."
            ) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                "p",
                null,
                this.props.description
            );
        }
    }, {
        key: "render",
        value: function render() {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                "div",
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    "h1",
                    null,
                    "About"
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"],
                    { to: "/" },
                    "To Home"
                ),
                this.description()
            );
        }
    }]);

    return About;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(About));

/***/ })

}]);
//# sourceMappingURL=about.js.map