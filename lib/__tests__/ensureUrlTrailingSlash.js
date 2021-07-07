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
    // Should redirect
    ['https://www.example.com/blog', 'https://www.example.com/blog/'],
    [
      'https://www.example.com/blog/page1',
      'https://www.example.com/blog/page1/',
    ],
    [
      'https://www.example.com/blog?page=1',
      'https://www.example.com/blog/?page=1',
    ],
    [
      'https://www.example.com/blog#page:1',
      'https://www.example.com/blog/#page:1',
    ],
    [
      'https://www.example.com/blog?page=1#user:tim',
      'https://www.example.com/blog/?page=1#user:tim',
    ],
    [
      'https://www.example.com/norska.config.js',
      'https://www.example.com/norska.config.js/',
    ],
    [
      'https://www.example.com/norska.config.js?page=1',
      'https://www.example.com/norska.config.js/?page=1',
    ],
    // Should not redirect
    ['https://www.example.com/blog/', false],
    ['https://www.example.com/bar/foo/', false],
    ['https://www.example.com/foo/?bar=baz', false],
    ['https://www.example.com/foo/#bar:baz', false],
    ['https://www.example.com/foo/?bar=baz#bar:baz', false],
    ['https://www.example.com/foo/?bar=baz#bar:/baz', false],
    ['https://www.example.com/', false],
    ['http://127.0.0.1:8083/about.html', false],
  ])('%s', async (input, expected) => {
    setUrl(input);
    current();

    /* eslint-disable jest/no-conditional-expect */
    // In that case, I find it more readable to have all test cases in the same
    // it.each than one for when it should be called and once for when it
    // shouldn't
    if (expected) {
      expect(window.location.replace).toHaveBeenCalledWith(expected);
    } else {
      expect(window.location.replace).not.toHaveBeenCalledWith();
    }
    /* eslint-enable jest/no-conditional-expect */
  });
});
