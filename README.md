# Notes

This package is still under development, in particular the names of the functions might change, as they are not very good right now.

## React Router Query

React Router Query is a helper. As of react router 4.x it no longer parses the URL query string into an object. Similarly, you can no longer push a `query` object as part of a location when pushing to history. This package provides a simplified way to do that.

## Get Query String Params as an Object

If you are looking for your query string parameters as an object you can use the `withParsedParameters` higher order component.

### Usage
```jsx
import { withParsedParameters } from 'react-router-query';
import { withRouter } from 'react-router-dom';

const MyComponent = props => <div>What is a? {props.query.a}</div>;

export default withRouter(withParsedParameters(params => ({a: params.a}))(MyComponent));
```

### API

The higher order component takes a selector function, which is optional. This selector allows you to restrict with query parameters you will get as part of your query object. If you want them all, you can leave it blank or provide the identify function `i => i`

```js
withParsedParameters(optionalSelector)(component)
```

### Selector Function

The selector function API takes in all query params and expects an object to be returned. You can use this to get just the parameters you care about. Some examples:

```js
// Url: https://localhost:3000/myPage?a=1&b=2
// Using this selector with this URL your component would receive
// the prop `query` with the following object {a: 1}
// It will not contain `b`
const selector = params => {
  return {
    a: params.a
  }
};
```

## Provide Query Params on State Change

If you are pushing to history it no longer accepts a query object. The old style from react-router 3.x worked liked this:

```js
//This is the old pattern, it no longer works out of the box
history.push({
  pathname: '/a',
  query: {
    a: 1,
    b: 2
  }
});
```

However, in 4.x it only accepts an already built search string:
```js
history.push({
  pathname: '/a',
  search: 'a=1&b=2'
})
```

Which is great if you want to build your own search string from a query object in every component. Luckily, if you don't you can use the `withQueryParser` to wrap your history and fix the problem.

### Usage
```js
import createHistory from 'history/createBrowserHistory'
<Router history={withQueryParser(createHistory())}>
  ...
</Router>
```

You can now push to history with query params!
```jsx
import { withRouter } from 'react-router-dom';

class MyComponent extends Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(){
    this.props.history.push({
      pathname: '/a',
      query: {
        a: 1,
        b: 2
      }
    });
  }
  render(){
    return (
      <div>
        <button onClick={this.onClick}>Press me!</button>
      </div>
    );
  }
}

export default withRouter(MyComponent);
```

## Development

This library uses Jest for testing and Rollup for build.

### Test

Run tests with the `yarn test` command to run the tests with Jest.

### Build - Dev

Run a development build with `yarn run build`

### Build - Prod

Run a production build with `yarn run build-prod`
