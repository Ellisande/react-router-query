import React from 'react';
import queryString from 'query-string';

const withParsedParametersHoc = selector => (WrappedComponent) => {
  function withParsedParameters(props) {
    const { location } = props;
    const query = location &&
      location.search &&
      queryString.parse(location.search);
    const filteredQuery = selector ? selector(query) : query;
    return query ? <WrappedComponent {...props} query={filteredQuery} /> : <WrappedComponent {...props} />;
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  withParsedParameters.displayName = `withParsedParameters(${wrappedComponentName})`;
  return withParsedParameters;
};

export default withParsedParametersHoc;
