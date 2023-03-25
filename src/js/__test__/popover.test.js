const jsdom = require('jsdom'); // eslint-disable-line import/no-extraneous-dependencies
const { default: Popover } = require('../Popover/Popover');

const { JSDOM } = jsdom;

describe('popover', () => {
  beforeEach(() => {
    const dom = new JSDOM('some html', { url: 'https://localhost:3000' });

    global.window = dom.window;
    global.document = dom.window.document;
  });

  test('should render self', () => {
    document.body.innerHTML = '<div id="popover-container"></div>';
    const container = document.querySelector('#popover-container');

    const popover = new Popover();
    popover.bindToDOM(container);
    expect(container.innerHTML).toEqual(Popover.markUp);
  });
});
