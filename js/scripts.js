//Global variables 
const gallery = document.getElementById("gallery");
const modalDiv = document.createElement("div");
//Var that creates the modal-container
modalDiv.className = "modal-container";
modalDiv.style.display = "none";
document.body.appendChild(modalDiv);
let employeesData = [];

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetch("https://randomuser.me/api/?results=12")
  .then((res) => res.json())
  .then((data) => generateHTML(data.results));

// ------------------------------------------
//  HELPER FUNCTIONS 
//  Display info for Galley div & ModalDiv
// ------------------------------------------
function generateHTML(data) {
    employeesData = data;
    let html = "";
    employeesData.map((employee, index) => {
      html = `<div class="card" data-index="${index}">
                  <div class="card-img-container">
                      <img class="card-img" src="${employee.picture.large}" alt="profile picture">
                  </div>
                  <div class="card-info-container">
                      <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                      <p class="card-text">${employee.email}</p>
                      <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                  </div>
              </div>`;
      gallery.insertAdjacentHTML("beforeend", html);
    });
  
    return;
  }

  function generateModal(index) {
    let {
      name,
      email,
      cell,
      dob,
      picture,
      location: { city, state, postcode, street },
    } = employeesData[index];
  
    let html = `<div class="modal">
                  <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                  <div class="modal-info-container">
                      <img class="modal-img" src="${picture.large}" alt="profile picture">
                      <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                       <p class="modal-text">${email}</p>
                       <p class="modal-text cap">${city}</p>
                      <hr>
                      <p class="modal-text">${cell}</p>
                      <p class="modal-text">${street.number} ${street.name}, ${state}, ${postcode}</p>
                      <p class="modal-text">Birthday: ${dob.date}</p>
                  </div>
              </div>`;
    
    modalDiv.innerHTML = html;
    modalDiv.style.display = "block";

    return;
  }

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
// Each time a card is clicked show a modal card with more info of the card
gallery.addEventListener("click", function (e) {
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");
    generateModal(index);
    const button = document.querySelector("#modal-close-btn")
    button.addEventListener("click", function() {
        modalDiv.style.display = "none";
    })
  });