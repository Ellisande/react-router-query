import React from 'react';
import withParsedParameters from '../src/withParsedParameters';
import { mount } from 'enzyme';

test("should provide a query prop of the parsed searched string", () => {
  const TestComponent = () => <div>I am a div of sorts!</div>;
  const WrappedComponent = withParsedParameters(i => i)(TestComponent);
  const mockLocation = {
    pathname: 'somePath',
    search: '?a=b&c=d',
  };
  const renderedWrapper = mount(<WrappedComponent location={mockLocation} />);
  const renderedTestComponent = renderedWrapper.find(TestComponent);
  const actualProps = renderedTestComponent.props();
  const actualParsedQuery = actualProps.query;
  expect(actualParsedQuery.a).toEqual('b');
  expect(actualParsedQuery.c).toEqual('d');
});

test("should fail silenty if location is not provided", () => {
  const TestComponent = () => <div>I am a div of sorts!</div>;
  const WrappedComponent = withParsedParameters(i => i)(TestComponent);
  const renderedWrapper = mount(<WrappedComponent />);
  const renderedTestComponent = renderedWrapper.find(TestComponent);
  const actualProps = renderedTestComponent.props();
  const actualParsedQuery = actualProps.query;
  expect(actualParsedQuery).toBe(undefined);
});

test("should only provide filtered query params", () => {
  const TestComponent = () => <div>I am a div of sorts!</div>;
  const querySelector = params => ({a: params.a});
  const WrappedComponent = withParsedParameters(querySelector)(TestComponent);
  const mockLocation = {
    pathname: 'somePath',
    search: '?a=b&c=d',
  };
  const renderedWrapper = mount(<WrappedComponent location={mockLocation} />);
  const renderedTestComponent = renderedWrapper.find(TestComponent);
  const actualProps = renderedTestComponent.props();
  const actualParsedQuery = actualProps.query;
  expect(actualParsedQuery.a).toEqual('b');
  expect(actualParsedQuery.c).toBe(undefined);
});

test("should provide all query params if no selector is provided", () => {
  const TestComponent = () => <div>I am a div of sorts!</div>;
  const WrappedComponent = withParsedParameters()(TestComponent);
  const mockLocation = {
    pathname: 'somePath',
    search: '?a=b&c=d',
  };
  const renderedWrapper = mount(<WrappedComponent location={mockLocation} />);
  const renderedTestComponent = renderedWrapper.find(TestComponent);
  const actualProps = renderedTestComponent.props();
  const actualParsedQuery = actualProps.query;
  expect(actualParsedQuery.a).toEqual('b');
  expect(actualParsedQuery.c).toEqual('d');
});

test("should clobber an existing query prop", () => {
  const TestComponent = () => <div>I am a div of sorts!</div>;
  const WrappedComponent = withParsedParameters()(TestComponent);
  const mockLocation = {
    pathname: 'somePath',
    search: '?a=b&c=d',
  };
  const mockQuery = {
    a: '1',
    b: '2'
  };
  const renderedWrapper = mount(<WrappedComponent location={mockLocation} query={mockQuery} />);
  const renderedTestComponent = renderedWrapper.find(TestComponent);
  const actualProps = renderedTestComponent.props();
  const actualParsedQuery = actualProps.query;
  expect(actualParsedQuery.a).toEqual('b');
  expect(actualParsedQuery.c).toEqual('d');
});
