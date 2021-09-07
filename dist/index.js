define(["react"], (__WEBPACK_EXTERNAL_MODULE__297__) => { return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 136:
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
exports.useInitialFormMemo = void 0;

var react_1 = __webpack_require__(297);

var useInitialFormMemo = function useInitialFormMemo(initialForm) {
  var initialFormMemo = react_1.useRef(initialForm !== null && initialForm !== void 0 ? initialForm : {});
  var initialFormMemoHandler = react_1.useCallback(function (initialForm) {
    initialFormMemo.current = initialForm;
  }, []);
  var addFieldsToMemoHandler = react_1.useCallback(function (newFields) {
    initialFormMemo.current = __assign(__assign({}, newFields), initialFormMemo.current);
  }, []);
  var removeFieldsFromMemoHandler = react_1.useCallback(function () {
    var fieldsName = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      fieldsName[_i] = arguments[_i];
    }

    initialFormMemo.current = Object.fromEntries(Object.entries(initialFormMemo.current).filter(function (_a) {
      var field = _a[0];
      return !fieldsName.includes(field);
    }));
  }, []);
  return {
    initialFormMemo: initialFormMemo,
    initialFormMemoHandler: initialFormMemoHandler,
    addFieldsToMemoHandler: addFieldsToMemoHandler,
    removeFieldsFromMemoHandler: removeFieldsFromMemoHandler
  };
};

exports.useInitialFormMemo = useInitialFormMemo;

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

var use_initial_form_memo_1 = __webpack_require__(136);

var react_1 = __webpack_require__(297);

var utils_1 = __webpack_require__(470);

var useForm = function useForm(initialForm) {
  var _a = use_initial_form_memo_1.useInitialFormMemo(initialForm),
      initialFormMemo = _a.initialFormMemo,
      initialFormMemoHandler = _a.initialFormMemoHandler,
      addFieldsToMemoHandler = _a.addFieldsToMemoHandler,
      removeFieldsFromMemoHandler = _a.removeFieldsFromMemoHandler; //#region form


  var _b = react_1.useState(function () {
    return initialForm ? utils_1.initialFn(initialForm) : utils_1.initialFn({});
  }),
      form = _b[0],
      setForm = _b[1];

  var addFieldsToFormHandler = react_1.useCallback(function (newFields) {
    setForm(function (prev) {
      return __assign(__assign({}, newFields), prev);
    });
  }, []);
  var removeFieldsFromFormHandler = react_1.useCallback(function () {
    var fieldsName = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      fieldsName[_i] = arguments[_i];
    }

    setForm(function (prev) {
      return Object.fromEntries(Object.entries(prev).filter(function (_a) {
        var field = _a[0];
        return !fieldsName.includes(field);
      }));
    });
  }, []);
  var initialFormHandler = react_1.useCallback(function (initialForm) {
    setForm(function () {
      return utils_1.initialFn(initialForm);
    });
    initialFormMemoHandler(initialForm);
  }, [initialFormMemoHandler]);
  var reset = react_1.useCallback(function () {
    return setForm(function () {
      return utils_1.initialFn(initialFormMemo.current);
    });
  }, [initialFormMemo]);
  var clear = react_1.useCallback(function () {
    return setForm(function (prev) {
      return utils_1.reduceConfigTransform(prev, function (config) {
        return __assign(__assign({}, config), {
          value: "",
          touched: true,
          error: config.validation && config.validation("")
        });
      });
    });
  }, []); //#endregion

  var addFields = react_1.useCallback(function (configs) {
    addFieldsToMemoHandler(configs);
    addFieldsToFormHandler(utils_1.initialFn(configs));
  }, [addFieldsToMemoHandler, addFieldsToFormHandler]);
  var removeField = react_1.useCallback(function () {
    var fieldsName = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      fieldsName[_i] = arguments[_i];
    }

    removeFieldsFromMemoHandler.apply(void 0, fieldsName);
    removeFieldsFromFormHandler.apply(void 0, fieldsName);
  }, [removeFieldsFromMemoHandler, removeFieldsFromFormHandler]);
  var setValue = react_1.useCallback(function (key, value, touched) {
    setForm(function (prev) {
      var _a;

      var config = prev[key];
      if (!config) return prev;
      return __assign(__assign({}, prev), (_a = {}, _a[key] = __assign(__assign({}, config), {
        error: config.validation && config.validation(value),
        touched: touched !== null && touched !== void 0 ? touched : config.touched,
        value: value
      }), _a));
    });
  }, []);
  var setValues = react_1.useCallback(function (fields) {
    setForm(function (prev) {
      return utils_1.reduceConfigTransform(prev, function (config, field) {
        var _a, _b, _c;

        if (!(field in fields)) return config;

        var _value = (_a = fields[field]) === null || _a === void 0 ? void 0 : _a.value;

        return __assign(__assign({}, config), {
          error: config.validation && config.validation(_value),
          touched: (_c = (_b = fields[field]) === null || _b === void 0 ? void 0 : _b.touched) !== null && _c !== void 0 ? _c : config.touched,
          value: _value !== null && _value !== void 0 ? _value : config.value
        });
      });
    });
  }, []); //#region helper constant

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
  var values = react_1.useMemo(function () {
    return utils_1.reduceConfigTransform(form, function (_a) {
      var value = _a.value;
      return value;
    });
  }, [form]); //#endregion

  return {
    values: values,
    handlers: handlers,
    initialFormHandler: initialFormHandler,
    reset: reset,
    clear: clear,
    setValues: setValues,
    addFields: addFields,
    removeField: removeField,
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

/***/ 666:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.handlersKeyExists = void 0;

var handlersKeyExists = function handlersKeyExists(handlers) {
  return Boolean(Object.keys(handlers).length);
};

exports.handlersKeyExists = handlersKeyExists;

/***/ }),

/***/ 154:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.valuesKeyExists = void 0;

var valuesKeyExists = function valuesKeyExists(values) {
  return Boolean(Object.keys(values).length);
};

exports.valuesKeyExists = valuesKeyExists;

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
exports.valuesKeyExists = exports.handlersKeyExists = exports.useForm = void 0;

var use_form_1 = __webpack_require__(16);

Object.defineProperty(exports, "useForm", ({
  enumerable: true,
  get: function get() {
    return use_form_1.useForm;
  }
}));

var handlers_key_exists_1 = __webpack_require__(666);

Object.defineProperty(exports, "handlersKeyExists", ({
  enumerable: true,
  get: function get() {
    return handlers_key_exists_1.handlersKeyExists;
  }
}));

var values_key_exists_1 = __webpack_require__(154);

Object.defineProperty(exports, "valuesKeyExists", ({
  enumerable: true,
  get: function get() {
    return values_key_exists_1.valuesKeyExists;
  }
}));
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=index.js.map