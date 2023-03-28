import puppetteer from 'puppeteer'; // eslint-disable-line import/no-extraneous-dependencies
import { fork } from 'child_process';

jest.setTimeout(50000); // default puppeteer timeout

describe('popover', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should add .popover-message_visible', async () => {
    await page.goto(baseUrl);
    const container = await page.$('#popover-container');
    const btn = await container.$('.btn');
    btn.click();
    await page.waitForSelector('.popover-message_visible');
  });

  test('should add .form-error_visible', async () => {
    await page.goto(baseUrl);
    const form = await page.$('#form-container');
    const btn = await form.$('[data-toggle="popover"]');
    btn.click();
    await page.waitForSelector('.form-error_visible');
  });

  test('should add .form-error_visible for invalid email', async () => {
    await page.goto(baseUrl);
    const form = await page.$('#form-container');
    const btn = await form.$('.btn');
    const inputText = await form.$('[data-id="popover"]');
    const inputEmail = await form.$('[data-id="email"]');
    await inputText.type('Mari');
    await inputEmail.type('text@');

    btn.click();
    await page.waitForSelector('.form-error_visible');
  });

  test('should add .editor-form-container_visible for click + and add .form-error_visible for invalid name', async () => {
    await page.goto(baseUrl);
    const editor = await page.$('#editor-container');
    const addBtn = await editor.$('[data-id="add"]');
    addBtn.click();

    const form = await editor.$('#editor-form');
    const btn = await form.$('[data-toggle="editor-add"]');
    btn.click();
    await page.waitForSelector('.editor-form-container_visible');
    await editor.waitForSelector('.form-error_visible');
  });

  test('should add .form-error_visible for invalid cost', async () => {
    await page.goto(baseUrl);
    const editor = await page.$('#editor-container');
    const addBtn = await editor.$('[data-id="add"]');
    addBtn.click();

    const form = await editor.$('#editor-form');
    const btn = await form.$('[data-toggle="editor-add"]');
    const inputName = await form.$('[data-id="name"]');
    const inputCost = await form.$('[data-id="cost"]');
    await inputName.type('cat');
    await inputCost.type('0');

    btn.click();
    await editor.waitForSelector('.form-error_visible');
  });

  test('should add .product-row for valid data', async () => {
    await page.goto(baseUrl);
    const editor = await page.$('#editor-container');
    const addBtn = await editor.$('[data-id="add"]');
    addBtn.click();

    const form = await editor.$('#editor-form');
    const btn = await form.$('[data-toggle="editor-add"]');
    const inputName = await form.$('[data-id="name"]');
    const inputCost = await form.$('[data-id="cost"]');
    await inputName.type('cat');
    await inputCost.type('50');

    btn.click();
    await editor.waitForSelector('.product-row');
  });
});
