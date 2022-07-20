import VisitForm from "../visitForm.js";
import { therapistFormObj } from "./data.js";
import { visitFormObj } from "../data.js";

const formObj = [...visitFormObj, ...therapistFormObj];
export default class TherapistVisitForm extends VisitForm {
  render() {
    this.renderDefaultForm();
    this.createForms(formObj);
    this.createVisitSubmit("Therapist");
    this.getSubmit(formObj);
  }
}
