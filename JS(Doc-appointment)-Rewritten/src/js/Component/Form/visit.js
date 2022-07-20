import Form from "./form.js";
import DoctorAPIService from "../doctorAPIService.js";

const translate = {
  purpose: "Цель",
  name: "ФИО",
  doctor: "Доктор",
  pressure: "Давление",
  diseases: "Перенесенн",
  age: "Возраст",
  id: "Номер визита",
  last: "Дата последнего визита",
  description: "Описание",
};

export default class Visit extends Form {
  renderCard(data) {
    this.position = "beforeend";
    this.parentElement = document.querySelector(".main-content");
    this.createElement(`
      <div data-item=${data.id} data-doctor=${data.doctor}  
      class='visit-card card-body visit-card-element edit-card-${data.id}'>
      <div   class='visit-card-element__btn--close delete-card delete-card-${data.id}'> X </div>
  
      </div>`);
    this.renderCardItem(data);
  }

  renderCardItem(data) {
    const keys = Object.keys(data);
    keys.forEach((key) => {
      this.position = "beforeend";
      this.parentElement = document.querySelector(`[data-item='${data.id}']`);
      this.createElement(
        `<div class=${key}>${translate[key]}:  ${data[key]}</div>`
      );
    });
  }

  createChangeForm(data) {
    const keys = Object.keys(data);
    keys.forEach((key) => {
      this.position = "beforeend";
      this.parentElement = this.inputBox;
      this.createElement(
        `<div class="forms-inputs "> 
        <label >${translate[key]}</label>
        <input class= '${key}__input forms-inputs__item  ' 
          value=${data[key]}
          autocomplete="off"
          type="text"
        />
      </div>`
      );
    });

    this.inputBox.querySelector(".doctor__input").disabled = true;
    this.inputBox.querySelector(".id__input").disabled = true;
  }

  renderChangeBtn(data, parent, className) {
    this.position = "beforeend";
    this.parentElement = parent;
    this.createElement(
      `<div class="btn-change"><button class='${className} btn visit-card-element__btn--change'  data-id='${data.id}'btn>Изменить</button></div>`
    );
  }

  setChangeBtnAction(data) {
    const box = document.querySelector(`.btn-change-${data.id}`);

    box.addEventListener("click", (e) => {
      this.renderDefaultForm();
      this.createChangeForm(data);
      this.renderChangeBtn(data, this.inputBox, `btn-change-${data.id}__push`);
      const visitId = e.target.getAttribute("data-id");

      this.pushChanges(visitId, data);
    });
  }
  pushChanges(visitId, data) {
    const btn = document.querySelector(`.btn-change-${data.id}__push`);
    btn.addEventListener("click", () => {
      this.getInputData();
      const doctorAPIService = new DoctorAPIService();
      doctorAPIService.changeCard(visitId, this.getInputData());
      this.inputBox.remove();
    });
  }

  deleteCard(data) {
    this.delete = document.querySelector(`.delete-card-${data.id}`);
    this.delete.addEventListener("click", () => {
      const doctorAPIService = new DoctorAPIService();
      doctorAPIService.deleteCard(data.id);
      this.delete.parentNode.remove();
    });
  }

  getInputData() {
    const inputList = Array.from(document.querySelectorAll(".forms-inputs"));
    let data = {};
    inputList.map((input) => {
      let key = input.querySelector("input").className.split("__")[0];
      let value = input.querySelector("input").value;
      data = { ...data, [key]: value };
    });
    return data;
  }

  render(data) {
    this.renderCard(data);
    this.deleteCard(data);
    this.renderChangeBtn(
      data,
      document.querySelector(`[data-item='${data.id}']`),
      `btn-change-${data.id} `
    );
    this.setChangeBtnAction(data);
  }
}
