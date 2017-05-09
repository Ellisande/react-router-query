import withQueryParser from '../src/withQueryParser';


test("should parse the query section of location on a push", () => {
  const mockHistory = {
    push: ({ search }) => {
      expect(search).toEqual("a=b");
    },
  };
  const originalHistory = mockHistory;
  const wrappedHistory = withQueryParser(originalHistory);
  wrappedHistory.push({
    query: {
      a: 'b',
    },
  });
});

test("should combine any existing search query params with the query section of location", () => {
  const mockHistory = {
    push: ({ search }) => {
      expect(search).toEqual("a=b&c=d");
    },
  };
  const originalHistory = mockHistory;
  const wrappedHistory = withQueryParser(originalHistory);
  wrappedHistory.push({
    search: '?c=d',
    query: {
      a: 'b',
    },
  });
});

test("should do nothing if no query object is provided", () => {
  const mockHistory = {
    push: ({ search }) => {
      expect(search).toEqual("c=d");
    },
  };
  const originalHistory = mockHistory;
  const wrappedHistory = withQueryParser(originalHistory);
  wrappedHistory.push({
    search: '?c=d',
  });
})

test("should call the existing method with the same params", () => {
  const mockHistory = {
    push: (location, arg1, arg2, arg3) => {
      expect(location.search).toEqual("c=d");
      expect(arg1).toEqual('a');
      expect(arg2).toEqual('b');
      expect(arg3).toEqual('c');
    },
  };
  const originalHistory = mockHistory;
  const wrappedHistory = withQueryParser(originalHistory);
  wrappedHistory.push({
    search: '?c=d',
  }, 'a', 'b', 'c');
})
