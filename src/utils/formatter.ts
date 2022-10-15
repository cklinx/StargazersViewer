const VALUE_IN_BRACES = /{.*}/;

const injectUrlParam = (template: string, params: string) =>
  template.replace(VALUE_IN_BRACES, params);

const truncate = (str: string, maxLength: number = 18) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
};

const getStargazerPublicURL = (apiUrl: string) => {
  return apiUrl.replace('/users', '').replace('api.', '');
};

export default {
  injectUrlParam,
  truncate,
  getStargazerPublicURL,
};
