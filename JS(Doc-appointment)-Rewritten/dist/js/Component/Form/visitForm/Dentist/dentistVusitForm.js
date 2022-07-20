import VisitForm from "../visitForm.js";
import { dentistaFormObj } from "./data.js";
import { visitFormObj } from "../data.js";

const formObj = [...visitFormObj, ...dentistaFormObj];
export default class DentistVisitForm extends VisitForm {
  render() {
    this.renderDefaultForm();
    this.createForms(formObj);
    this.createVisitSubmit("Dentist");
    this.getSubmit(formObj);
  }
}
