import messages from '../MyForm/messages';
import createData from './createData';
import Product from './Product';
import productsArray from './productsArray';

export default class EditorForm {
  constructor(container) {
    this.container = container;
    this.form = null;
    this.currentElError = undefined;
  }

  bindToDOM(data) {
    this.form = document.createElement('div');
    this.form.classList.add('editor-form-container');
    let formData = {};
    if (!data) {
      formData = {
        name: '',
        cost: '',
      };
    }
    this.form.innerHTML = `
    <form id="editor-form" novalidate>
      <div class="form-control form-editor">
        <label class="label-editor" for="name">Название</label>
        <input name="name" data-id="name" class="input input-editor" type="text" placeholder="product name" autocomplete="off" value="${formData.name}" required> 
      </div>
      <div class="form-control form-editor">
        <label for="cost" class="label-editor">Стоимость</label>
        <input name="cost" data-id="cost" class="input input-editor" type="number" min="1" placeholder="product cost" autocomplete="off" value="${formData.cost}" required>
      </div>

      <div class="editor-btn">
        <button type="submit" class="btn btn-add" data-toggle="editor-add" title="Submit editor form">Сохранить</button>
        <button type="button" class="btn btn-close" data-toggle="editor-close" title="Close editor form">Отмена</button>
      </div>
    </form>
      `;

    this.container.append(this.form);
    const editorFormContainer = this.form.closest('.editor-form-container');
    const table = this.container.querySelector('.table');
    const coords = table.getBoundingClientRect();

    editorFormContainer.style.top = `${coords.top + window.scrollY + table.offsetHeight / 2}px`;
    editorFormContainer.style.left = `${coords.left + window.scrollX + editorFormContainer.offsetWidth}px`;

    this.events();
  }

  events() {
    const closeBtn = this.form.querySelector('[data-toggle="editor-close"]');

    closeBtn.addEventListener('click', () => this.closeForm());
    this.form.addEventListener('submit', (e) => this.onSubmit(e));
  }

  closeForm() {
    const editorForm = document.querySelector('#editor-form');
    if (editorForm.dataset.id) editorForm.removeAttribute('data-id');

    editorForm.reset();
    this.form.classList.remove('editor-form-container_visible');
    if (!this.currentElError) this.container.querySelector('.editor-form-error').classList.remove('form-error_visible');
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.currentElError) this.container.querySelector('.editor-form-error').classList.remove('form-error_visible');
    const isValid = document.querySelector('#editor-form').checkValidity();
    const editorForm = this.form.querySelector('#editor-form');
    this.formElements = [...editorForm.elements];

    if (isValid) {
      if (editorForm.dataset.id) {
        const index = productsArray.findIndex((el) => el.id === +editorForm.dataset.id);
        createData(this.formElements, productsArray[index]);

        const product = this.container.querySelector(`[data-row="${editorForm.dataset.id}"]`);
        product.querySelector('.product-name').innerText = productsArray[index].name;
        product.querySelector('.product-cost').innerText = +productsArray[index].cost;
      } else {
        const formData = {};
        createData(this.formElements, formData);

        formData.id = Date.now();

        const tableBody = this.container.querySelector('tbody');
        const tableRow = document.createElement('tr');
        const product = new Product(formData, tableRow);

        productsArray.push(product.dataProduct);

        tableRow.classList.add('product-row');
        tableRow.innerHTML = product.markUp();
        tableRow.setAttribute('data-row', formData.id);
        product.events(tableRow);
        tableBody.append(tableRow);
      }
      this.closeForm();
    } else {
      const notValidEl = this.formElements.find((el) => !el.validity.valid);

      this.showError(notValidEl);
      notValidEl.focus();
      this.currentElError = undefined;
    }
  }

  showError(el) {
    const errorType = Object.keys(ValidityState.prototype).find((type) => {
      if (type === 'valid') return;
      /* eslint-disable */
      return el.validity[type];
    });

    const messageError = messages[el.dataset.id][errorType];
    const formError = this.container.querySelector('.form-error');
    console.log(this.container)
    console.log(formError)
    console.log(messageError)
    formError.innerText = messageError;
    formError.classList.add('form-error_visible');
    const coords = el.getBoundingClientRect();

    this.currentElError = el;
    formError.style.top = `${coords.top + window.scrollY + el.offsetHeight / 2 + formError.offsetHeight / 2}px`;
    formError.style.left = `${coords.left + window.scrollX}px`;
  }
}
