import VisitForm from "../visitForm.js";
import { visitFormObj } from "../data.js";
import { cardionForms } from "./data.js";

const formObj = [...visitFormObj, ...cardionForms];

export default class CardioVisitForm extends VisitForm {
  render() {
    this.renderDefaultForm();
    this.createForms(formObj);
    this.createVisitSubmit("Cardiologist");
    this.getSubmit(formObj);
  }
}
