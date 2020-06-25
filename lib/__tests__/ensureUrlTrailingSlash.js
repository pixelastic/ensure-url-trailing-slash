const current = require('../ensureUrlTrailingSlash');
const { JSDOM } = require('jsdom');
global.window = { location: null };

describe('ensureUrlTrailingSlash', () => {
  /**
   * Set the current url of the (virtual) page
   * @param {string} url Url of the page
   */
  function setUrl(url) {
    const location = new JSDOM('', { url }).window.location;
    // Real window.location is read-only and cannot be spied on, so we create
    // a simple copy
    const clonedLocation = { ...location, replace: jest.fn() };
    global.window.location = clonedLocation;
  }
  it.each([
    'https://www.example.com/foo',
    'https://www.example.com/bar/foo',
    'https://www.example.com/foo?bar=baz',
    'https://www.example.com/foo#bar:baz',
    'https://www.example.com/foo?bar=baz#bar:baz',
  ])('should add a slash to %s', (url) => {
    setUrl(url);
    const expected = url.replace('foo', 'foo/');

    current();

    expect(window.location.replace).toHaveBeenCalledWith(expected);
  });
  it.each([
    'https://www.example.com/foo/',
    'https://www.example.com/bar/foo/',
    'https://www.example.com/foo/?bar=baz',
    'https://www.example.com/foo/#bar:baz',
    'https://www.example.com/foo/?bar=baz#bar:baz',
    'https://www.example.com/foo/?bar=baz#bar:/baz',
    'https://www.example.com/',
    'http://127.0.0.1:8083/about.html',
  ])('should not add a slash to %s', (url) => {
    setUrl(url);

    current();

    expect(window.location.replace).not.toHaveBeenCalled();
  });
});
