import is from "is_js";
window.is = is;
export const buildControl = (config) => ({
	...config,
	touched: false,
	invalid: Boolean(config.validation),
});

export const valid = (value, validation = null) => {
	if (!validation) {
		return false;
	}

	const { required, minLength, email } = validation;

	let invalid = false;

	if (required) {
		invalid = is.empty(value) || invalid;
	}

	if (minLength) {
		invalid = `${value}`.length < minLength || invalid;
	}

	if (email) {
		invalid = is.email(value) || invalid;
	}

	return {
		invalid,
	};
};

export const isPrimitive = (value) => value !== Object(value);

export const reduceConfigTransform = (obj, callback) =>
	Object.entries(obj).reduce(
		(acc, [key, config]) => ({ ...acc, [key]: callback(config, key) }),
		{}
	);
