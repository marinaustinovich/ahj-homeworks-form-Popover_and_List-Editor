import EditorForm from './EditorForm';
import productsArray from './productsArray';

export default class Editor {
  constructor() {
    this.container = null;
    this.editorForm = null;
    this.deleteMessage = null;
    this.products = productsArray;
  }

  bindToDOM(container) {
    /* скрыто для JSDOM тетов, иначе выкидывает ошибку */

    // if (!(container instanceof HTMLElement)) {
    //   throw new Error('container is not HTMLElement');
    // }
    this.container = container;

    this.drawUi();
    this.events();
  }

  drawUi() {
    this.checkBinding();

    this.container.innerHTML = `
      <table class="table">
      <caption class="title-table">My editor</caption>
      <thead>
        <tr class="products">
          <th  colspan="2" style="text-align:left">Товары</th>
          <th style="text-align:right" data-id="add"><span class="add" c>✙</span></th>
        </tr>
        <tr class="product-table">
          <th>Название</th>
          <th>Стоимость</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody></tbody>
      </table>
      <div class="delete-message">
        <h2>Вы действительно хотите удалить товар?</h2>
        <div class="editor-btn">
          <button type="button" class="btn btn-add" data-toggle="delete-product" title="Button for delete product">Да</button>
          <button type="button" class="btn btn-close" data-toggle="close-message" title="Close delete message">Нет</button>
        </div>
      </div>
      <div class="form-error editor-form-error"></div>
      `;

    const editorForm = new EditorForm(this.container);
    editorForm.bindToDOM();

    this.editorForm = this.container.querySelector('.editor-form-container');
    this.deleteMessage = this.container.querySelector('.delete-message');

    const table = this.container.querySelector('.table');
    const coords = table.getBoundingClientRect();

    this.deleteMessage.style.top = `${coords.top + window.scrollY + table.offsetHeight / 2}px`;
    this.deleteMessage.style.left = `${coords.left + window.scrollX - table.offsetWidth / 3}px`;
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('Form not bind to DOM');
    }
  }

  events() {
    const addEl = this.container.querySelector('[data-id="add"]');
    const deleteProduct = this.container.querySelector('[data-toggle="delete-product"]');
    const closeMessage = this.container.querySelector('[data-toggle="close-message"]');

    addEl.addEventListener('click', () => this.showForm());
    deleteProduct.addEventListener('click', (e) => this.deleteProduct(e));
    closeMessage.addEventListener('click', () => this.closeMessage());
  }

  showForm() {
    this.editorForm.classList.add('editor-form-container_visible');
  }

  deleteProduct() {
    const index = productsArray.findIndex((el) => el.id === +this.deleteMessage.dataset.id);
    productsArray.splice(index, 1);

    const product = this.container.querySelector(`[data-row="${this.deleteMessage.dataset.id}"]`);
    product.parentNode.removeChild(product);
    this.closeMessage();
  }

  closeMessage() {
    this.deleteMessage.classList.remove('delete-message_visible');
  }
}
