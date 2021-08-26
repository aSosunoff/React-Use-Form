define(["react"], (__WEBPACK_EXTERNAL_MODULE__297__) => { return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 642:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useDidUpdate = void 0;

var react_1 = __webpack_require__(297);

var useDidUpdate = function useDidUpdate(effect, dependencies) {
  var hasMounted = react_1.useRef(true);
  react_1.useEffect(function () {
    if (hasMounted.current) {
      hasMounted.current = false;
      return;
    }

    return effect(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

exports.useDidUpdate = useDidUpdate;

/***/ }),

/***/ 16:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useForm = void 0;

var react_1 = __webpack_require__(297);

var use_did_update_1 = __webpack_require__(642);

var utils_1 = __webpack_require__(470);

var useForm = function useForm(initialForm) {
  var _a = react_1.useState(function () {
    return utils_1.initialFn(initialForm);
  }),
      form = _a[0],
      setForm = _a[1];

  use_did_update_1.useDidUpdate(function () {
    setForm(function () {
      return utils_1.initialFn(initialForm);
    });
  }, [initialForm]);
  var values = react_1.useMemo(function () {
    return utils_1.reduceConfigTransform(form, function (_a) {
      var value = _a.value;
      return value;
    });
  }, [form]);
  var setValue = react_1.useCallback(function (key, value, touched) {
    setForm(function (prev) {
      var _a;

      var config = prev[key];
      return __assign(__assign({}, prev), (_a = {}, _a[key] = __assign(__assign({}, config), {
        error: config.validation && config.validation(value),
        touched: touched !== null && touched !== void 0 ? touched : config.touched,
        value: value
      }), _a));
    });
  }, []);
  var setValues = react_1.useCallback(function (obj) {
    setForm(function (prev) {
      return utils_1.reduceConfigTransform(prev, function (config, field) {
        var _a, _b, _c;

        if (!(field in obj)) return config;

        var _value = (_a = obj[field]) === null || _a === void 0 ? void 0 : _a.value;

        return __assign(__assign({}, config), {
          error: config.validation && config.validation(_value),
          touched: (_c = (_b = obj[field]) === null || _b === void 0 ? void 0 : _b.touched) !== null && _c !== void 0 ? _c : config.touched,
          value: _value !== null && _value !== void 0 ? _value : config.value
        });
      });
    });
  }, []);
  var handlers = react_1.useMemo(function () {
    return utils_1.reduceConfigTransform(form, function (config, key) {
      return {
        value: config.value,
        error: config.error,
        touched: config.touched,
        onChange: function onChange(value) {
          return setValue(key, value, true);
        }
      };
    });
  }, [setValue, form]);
  var isInvalidForm = react_1.useMemo(function () {
    return Object.values(form).reduce(function (acc, _a) {
      var error = _a.error;
      return acc || Boolean(error);
    }, false);
  }, [form]);
  var resetHandler = react_1.useCallback(function () {
    return setForm(function () {
      return utils_1.initialFn(initialForm);
    });
  }, [initialForm]);
  return {
    values: values,
    handlers: handlers,
    resetHandler: resetHandler,
    setValues: setValues,
    setValue: setValue,
    isInvalidForm: isInvalidForm
  };
};

exports.useForm = useForm;

/***/ }),

/***/ 470:
/***/ (function(__unused_webpack_module, exports) {



var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.initialFn = exports.reduceConfigTransform = exports.isPrimitive = void 0;

var isPrimitive = function isPrimitive(value) {
  return value !== Object(value);
};

exports.isPrimitive = isPrimitive;

var reduceConfigTransform = function reduceConfigTransform(obj, callback) {
  return Object.entries(obj).reduce(function (acc, _a) {
    var _b;

    var key = _a[0],
        config = _a[1];
    return __assign(__assign({}, acc), (_b = {}, _b[key] = callback(config, key, obj), _b));
  }, {});
};

exports.reduceConfigTransform = reduceConfigTransform;

var initialFn = function initialFn(initialForm) {
  return exports.reduceConfigTransform(initialForm, function (config) {
    return __assign(__assign({}, config), {
      touched: false,
      error: config.validation && config.validation(config.value)
    });
  });
};

exports.initialFn = initialFn;

/***/ }),

/***/ 297:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__297__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useForm = void 0;

var use_form_1 = __webpack_require__(16);

Object.defineProperty(exports, "useForm", ({
  enumerable: true,
  get: function get() {
    return use_form_1.useForm;
  }
}));
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=index.js.map