export const valid = (value, { required, minLength }) => {
	const isRequired = required && value.trim() === "";

	const isMinLength = minLength && value.length < minLength;

	return {
		invalid: isRequired || isMinLength || false,
		invalidMessage: isRequired
			? "Необходимо заполнить поле"
			: isMinLength
			? `Длина должна быть не меньше ${minLength} символов`
			: "",
	};
};

export const isPrimitive = (value) => value !== Object(value);

export const forMap = (obj, callback) =>
	Object.fromEntries(Object.entries(obj).map(callback));
