import messages from './messages';

export default class MyForm {
  constructor() {
    this.container = null;
    this.form = null;
    this.currentElError = undefined;
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
        <form id="popover-form" novalidate>
          <div class="form-control">
            <input data-id="popover" class="input" type="text" placeholder="text" autocomplete="off" required> 
          </div>
          <div class="form-control">
            <input data-id="email" class="input" type="email" placeholder="email" autocomplete="off" required>
          </div>

          <div>
            <button type="submit" class="btn " data-toggle="popover" title="Submit form"?">Click here</button>
          </div>
      </form>
      <div class="form-error"></div>
      `;

    this.form = document.querySelector('#popover-form');
    this.formElements = [...this.form.elements];
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('Form not bind to DOM');
    }
  }

  events() {
    this.formElements.forEach((el) => {
      el.addEventListener('change', (e) => this.onChange(e));
      el.addEventListener('input', (e) => this.onInput(e));
    });

    this.form.addEventListener('submit', (e) => this.onSubmit(e));
    window.addEventListener('DOMContentLoaded', () => this.onLoadDOM());
  }

  onChange(e) {
    if (e.currentTarget.validity.valid) return;

    this.showError(e.currentTarget);
  }

  onInput(e) {
    if (e.currentTarget !== this.currentElError) {
      this.container.querySelector('.form-error').classList.remove('form-error_visible');
      this.currentElError = undefined;

      const formData = {};
      this.formElements.forEach((el) => {
        const key = el.dataset.id;
        const { value } = el;

        if (!key) return;
        formData[key] = value;

        localStorage.setItem('formData', JSON.stringify(formData));
      });
    }
  }

  onSubmit(e) {
    this.container.querySelector('.form-error').classList.remove('form-error_visible');
    const isValid = e.currentTarget.checkValidity();

    if (!isValid) {
      e.preventDefault();

      const notValidEl = this.formElements.find((el) => !el.validity.valid);
      this.showError(notValidEl);
      notValidEl.focus();
      this.currentElError = undefined;
    } else {
      e.target.reset();
      localStorage.removeItem('formData');
    }
  }

  onLoadDOM() {
    const formDataJSON = localStorage.getItem('formData');
    let formData;

    if (!formDataJSON) return;

    try {
      formData = JSON.parse(formDataJSON);
    } catch (error) {
      /* eslint-disable */
      console.log('Not donwload your data');
    }

    if (formData) {
      for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {
          const element = this.form.querySelector(`[data-id="${key}"]`);

          if (element) {
            element.value = formData[key];
          }
        }
      }
    }
  }

  showError(el) {
    const errorType = Object.keys(ValidityState.prototype).find((type) => {
      if (type === 'valid') return;
      return el.validity[type];
    });
    const messageError = messages[el.dataset.id][errorType];
    const formError = this.container.querySelector('.form-error');
    formError.innerText = messageError;
    formError.classList.add('form-error_visible');
    const coords = el.getBoundingClientRect();

    this.currentElError = el;
    formError.style.top = `${coords.top + window.scrollY + el.offsetHeight / 2 - formError.offsetHeight / 2}px`;
    formError.style.left = `${coords.left + window.scrollX + el.offsetWidth}px`;
  }

  static get markUp() {
    return `
    <form id="popover-form" novalidate>
      <div class="form-control">
        <input data-id="popover" class="input" type="text" placeholder="text" autocomplete="off" required> 
      </div>
      <div class="form-control">
        <input data-id="email" class="input" type="email" placeholder="email" autocomplete="off" required>
      </div>

      <div>
        <button type="submit" class="btn " data-toggle="popover" title="Submit form"?">Click here</button>
      </div>
  </form>
  <div class="form-error"></div>
  `;
  }
}
