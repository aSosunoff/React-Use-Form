import is from "is_js";

export default (value, validation = null) => {
  if (!validation) {
    return false;
  }

  const { required, minLength, email } = validation;

  let invalid = false;
  let invalidMessage = "";

  const getInvalidMessage = (validationType) =>
    !invalidMessage && invalid
      ? validationType.message ?? invalidMessage
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
    invalid = is.not.email(value) || invalid;
    invalidMessage = getInvalidMessage(email);
  }

  return {
    invalid,
    invalidMessage,
  };
};
