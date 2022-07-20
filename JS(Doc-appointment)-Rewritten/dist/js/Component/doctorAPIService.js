import Component from "./component.js";
import { token } from "../main.js";
import Visit from "../Component/Form/visit.js";

export default class DoctorAPIService extends Component {
  createCard(obj) {
    fetch("https://ajax.test-danit.com/api/v2/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        new Visit().render(data);
      });
  }

  deleteCard(cardId) {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getAllCreatedCards() {
    fetch(`https://ajax.test-danit.com/api/v2/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.length !== 0) {
          document.querySelector(".no-items").style.display = "none";
        }
        response.forEach((data) => {
          new Visit().render(data);

          const dragDrop = new DragDrop();
          dragDrop.render();
        });
      });
  }

  changeCard(cardId, data) {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }
}
import DragDrop from "../dragDrop.js";
