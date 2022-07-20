export const mainBox = document.querySelector(".main-content");
export const btnLogIn = document.querySelector(".header-container__btn .btn");
export const btnCreatVisit = document.querySelector(".creat-visit-btn");
export const token = "d038cbe5-6cb1-4373-b513-864f37c31d87";

window.onload = function () {
  if (localStorage.getItem("autoLogIn")) {
    autoClick("modal");
    const login = document.getElementById(`login`);
    const password = document.getElementById(`password`);
    login.value = localStorage.getItem("login");
    password.value = localStorage.getItem("password");
    autoClick("submit_value");
  }
};

const autoClick = (id) => document.getElementById(`${id}`).click();

export let visitDentist, visitCardiologist, visitTherapist;
export let item = 0;

import LogInForm from "./Component/Form/logIn.js";

export let passObj = [
  { login: "admin@gmail.com", password: "qwerty123" },
  { login: "user@gmail.com", password: "12345678" },
  { login: "moderator@gmail.com", password: "87654321" },
  { login: "admin", password: "qwerty123" },
  { login: "admin", password: "admin" },
];

const logIn = new LogInForm();

btnLogIn.addEventListener("click", (e) => {
  e.preventDefault();
  logIn.render();
});

import CardioVisitForm from "./Component/Form/visitForm/Cardio/cardioVisitForm.js";
import DentistVisitForm from "./Component/Form/visitForm/Dentist/dentistVusitForm.js";
import TherapistVisitForm from "./Component/Form/visitForm/Therapist/therapistVisitForm.js";

export const visitModalAction = btnCreatVisit.addEventListener("click", () => {
  btnCreatVisit.disabled = true;
  const doctorsBox = document.createElement("div");
  doctorsBox.classList.add("doctors-box");
  doctorsBox.innerHTML = `<div class="items-doctors">Выберите врача</div>
  <ul class="select-list-doctors">
    <a class="select-list-doctors__link cardio-doctor" href="#"><li >Кардиолог</li></a>
    <a class="select-list-doctors__link dentist" href="#"><li >Стоматолог</li></a>
    <a class="select-list-doctors__link therapist" href="#"><li>Терапевт</li></a>
  </ul>`;
  mainBox.append(doctorsBox);

  const doctors = document.querySelector(".items-doctors");
  const selectDoctorsList = document.querySelector(".select-list-doctors");

  doctors.addEventListener("click", () => {
    selectDoctorsList.style.display = "block";
  });

  selectDoctorsList.addEventListener("click", (e) => {
    if (e.target.closest(".cardio-doctor")) {
      new CardioVisitForm().render();
    } else if (e.target.closest(".dentist")) {
      new DentistVisitForm().render();
    } else if (e.target.closest(".therapist")) {
      new TherapistVisitForm().render();
    }
    document.querySelector(".doctors-box").remove();
    btnCreatVisit.disabled = false;
    selectDoctorsList.style.display = "none";
  });
});

import DoctorAPIService from "./Component/doctorAPIService.js";
export const doctorAPIService = new DoctorAPIService();
import Filter from "./filter.js";
const filter = new Filter();

filter.render();
