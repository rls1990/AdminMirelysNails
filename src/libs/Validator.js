export const validarEmail = (text) => {
  let reg = new RegExp(
    "[-\\w.%+]@(?:[A-Z0-9-]{1,63}\\.){1,125}[A-Z]{2,63}",
    "i"
  );
  return reg.test(text);
};
