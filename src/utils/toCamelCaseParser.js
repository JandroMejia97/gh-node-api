function toCamelCaseParser(param) {
  if (typeof param !== 'object' || !param) {
    return param;
  }

  if (Array.isArray(param)) {
    return param.map(toCamelCaseParser);
  } else {
    return Object.keys(param).reduce((result, key) => {
      const camelCaseKey = key.replace(/([-_][a-z])/gi, $1 => $1.toUpperCase().replace('-', '').replace('_', ''));
      result[camelCaseKey] = toCamelCaseParser(param[key]);
      return result;
    }, {});
  }
}

export default toCamelCaseParser;
