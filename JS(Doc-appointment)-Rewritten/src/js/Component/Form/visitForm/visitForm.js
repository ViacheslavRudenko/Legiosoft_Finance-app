import Form from "../../Form/form.js";
import DoctorAPIService from "../../doctorAPIService.js";

export const doctorAPIService = new DoctorAPIService();

export default class VisitForm extends Form {
  createForms = (formObj) => {
    formObj.map((visitForm) => {
      this.position = "beforeend";
      this.parentElement = this.inputBox;

      return (this.formInputPurpose = this.createElement(
        `<div class="forms-inputs mb-4">
            <input class= 'forms-inputs__item ${visitForm.class}'
              placeholder=${visitForm.text}
              autocomplete="off"
              type="text"
            />
            <p class='${visitForm.class}__error input__error'>${visitForm.error}</p>
          </div>`
      ));
    });
  };

  getValidate(formObj) {
    const objOfClasses = formObj.map((visitForm) => visitForm.class);
    let flag = 0;
    objOfClasses.map((className) => {
      const value = document.querySelector(`.${className}`).value;

      const pressureCheck = className === "pressure-input" && isNaN(value);
      const ageCheck = className === "age-input" && isNaN(value);
      const lastVisitCheck = className === "last-visit-input" && isNaN(value);
      const defaultCheck = value == "" && value < 1;

      if (pressureCheck || ageCheck || lastVisitCheck || defaultCheck) {
        document.querySelector(`.${className}__error`).classList.add("active");
      } else {
        document
          .querySelector(`.${className}__error`)
          .classList.remove("active");
        flag++;
      }

      if (flag === objOfClasses.length) {
        const data = this.getInputData(formObj);
        doctorAPIService.createCard(data);
        document.querySelector(".modal").remove();
      }
    });
  }

  getSubmit(formObj) {
    const btnSubm = document.querySelector(".creat-visit");
    btnSubm.addEventListener("click", (e) => {
      this.doctorName = e.target.getAttribute("doctor-name");
      this.getValidate(formObj);
    });
  }

  createVisitSubmit = (doctor) =>
    this.createElement({
      tagName: "button",
      classNames: ["form-box__submit", "creat-visit", "btn"],
      parentElement: this.formBoxItem,
      content: "Создать",
      key: "doctor-name",
      values: doctor,
    });

  getInputData(formObj) {
    this.dentistData = {
      doctor: this.doctorName,
    };
    formObj.map((e) => {
      let key = e.class.split("-")[0];
      this.dentistData = {
        ...this.dentistData,
        [key]: document.querySelector(`.${e.class}`).value,
      };
    });

    return this.dentistData;
  }
}
