import queryString from 'query-string';

const withSearchBuilder = history => {
  const oldHistory = history.push.bind(history);
  history.push = (location, ...args) => {
    const originalSearch = location.search;
    const originalQuery = queryString.parse(originalSearch);
    const newQuery = location.query;
    const combinedQuery = Object.assign({}, originalQuery, newQuery);
    const newSearch = queryString.stringify(combinedQuery);
    location.search = newSearch;
    return oldHistory(location, ...args);
  }
  return history;
};

export default withSearchBuilder;
