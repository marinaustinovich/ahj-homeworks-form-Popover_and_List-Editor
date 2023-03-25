import PopoverContent from './PopoverContent';

export default class Popover {
  constructor() {
    this.container = null;
  }

  bindToDOM(container) {
    /* скрыто для JSDOM тетов, иначе выкидывает ошибку */

    // if (!(container instanceof HTMLElement)) {
    //   throw new Error('container is not HTMLElement');
    // }
    this.container = container;

    this.drawUi();
  }

  drawUi() {
    this.checkBinding();

    this.container.innerHTML = `
    <div class="wrapper-btn">
      <a tabindex="0" role="button" class="btn" data-toggle="popover" title="Popover title" data-content="And here's some amazing content?">Click to toggle popover</a>
    </div>
    <div class="popover-message"></div>
    `;

    const popoverButton = this.container.querySelector('.btn');

    popoverButton.addEventListener('click', (e) => this.onClick(e));
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('popover not bind to DOM');
    }
  }

  static get markUp() {
    return `
    <div class="wrapper-btn">
      <a tabindex="0" role="button" class="btn" data-toggle="popover" title="Popover title" data-content="And here's some amazing content?">Click to toggle popover</a>
    </div>
    <div class="popover-message"></div>
    `;
  }

  onClick(e) {
    const popoverMessage = this.container.querySelector('.popover-message');
    popoverMessage.innerHTML = PopoverContent.getContent();
    popoverMessage.classList.toggle('popover-message_visible');
    const coords = e.currentTarget.getBoundingClientRect();

    popoverMessage.style.top = `${coords.top + window.scrollY - popoverMessage.offsetHeight - 5}px`;
    popoverMessage.style.left = `${coords.left + window.scrollX + e.currentTarget.offsetWidth / 2 - popoverMessage.offsetWidth / 2}px`;
  }
}
