const checkValidity = element => {
  if (!element.validation)
    return true;
  let valid = true;

  if (element.validation.required)
    valid = element.value.trim() !== "" && valid;
  if (element.validation.length) {
    if (element.validation.length.min)
      valid = element.value.length >= element.validation.length.min && valid;
    if (element.validation.length.max)
      valid = element.value.length <= element.validation.length.max && valid;
  }
  return valid;
};

export default checkValidity;
