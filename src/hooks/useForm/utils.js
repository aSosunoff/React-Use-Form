import is from "is_js";

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
	let invalidMessage = "";

	const getInvalidMessage = (type) =>
		!invalidMessage && invalid
			? type.message ?? invalidMessage
			: invalidMessage;

	if (required) {
		invalid = is.empty(value) || invalid;
		invalidMessage = getInvalidMessage(required);
	}

	if (minLength) {
		invalid = `${value}`.length < minLength.value || invalid;
		invalidMessage = getInvalidMessage(minLength);
	}

	if (email) {
		invalid = is.email(value) || invalid;
		invalidMessage = getInvalidMessage(email);
	}

	return {
		invalid,
		invalidMessage,
	};
};

export const isPrimitive = (value) => value !== Object(value);

export const reduceConfigTransform = (obj, callback) =>
	Object.entries(obj).reduce(
		(acc, [key, config]) => ({ ...acc, [key]: callback(config, key) }),
		{}
	);
