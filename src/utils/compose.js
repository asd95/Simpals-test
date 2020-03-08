const compose = (...funcs) => comp => {
  return funcs.reduceRight(
    (prevRes, currentFunction) => currentFunction(prevRes),
    comp
  );
};

export default compose;