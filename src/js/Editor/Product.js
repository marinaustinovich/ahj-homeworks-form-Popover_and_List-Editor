export default class Product {
  constructor(data, container) {
    this.row = container;
    this.dataProduct = data;
    this.bindToDOM(data);
  }

  bindToDOM(data) {
    this.row.innerHTML = `
    <th class="product-name">${data.name}</th>
    <th class="product-cost">${+data.cost}</th>
    <th><span class="update">✎</span><span class="delete">✖</span></th>
    `;
  }

  events(container) {
    const updateBtn = container.querySelector('.update');
    const deleteBtn = container.querySelector('.delete');

    updateBtn.addEventListener('click', () => this.update(this.dataProduct));
    deleteBtn.addEventListener('click', () => this.delete());
  }

  /* eslint-disable */
  update(data) {
    const form = document.querySelector('#editor-form');
    form.setAttribute('data-id', data.id);

    form.closest('.editor-form-container').classList.add('editor-form-container_visible');
    const nameInput = form.querySelector('[data-id="name"]');
    const costInput = form.querySelector('[data-id="cost"]');
    nameInput.value = data.name;
    costInput.value = data.cost;
  }

  delete() {
    const deleteMessage = document.querySelector('.delete-message');
    deleteMessage.classList.add('delete-message_visible');
    deleteMessage.setAttribute('data-id', this.dataProduct.id);
  }

  markUp() {
    return this.row.innerHTML;
  }
}
