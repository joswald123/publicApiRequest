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
fetch("https://randomuser.me/api/?results=12&nat=us")
  .then((res) => res.json())
  .then((data) => generateHTML(data.results))
  .catch((err) => console.log("There was an error:", err));

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

/**
 * generateHTML() function
 * @param(data) response from API
 * @returns(element DOM) creates a literal with all the API info
 */
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

/**
 * generateModaL() function
 * @param(number) index of a card
 * @returns(element DOM) creates a literal modal that display more info of each card previously created
 */
function generateModal(index) {
  // employee object destructing
  let {
    name,
    email,
    cell,
    dob,
    picture,
    location: { city, state, postcode, street },
  } = employeesData[index];

  // formatting dob date
  const birthday = formatDate(dob.date);

  // Creates the literal template for the modal with the employee object destructing info
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
                      <p class="modal-text">Birthday: ${birthday}</p>
                  </div>
                  <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
              </div>`;

  modalDiv.innerHTML = html;
  modalDiv.style.display = "block";

  return;
}

/**
 * formatDate function
 * @param(string) date as a string
 * @returns(date) formatting date
 */
function formatDate(date) {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth();
  const year = new Date(date).getFullYear();
  return `${month}/${day}/${year}`;
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
// Each time a card is clicked show a modal card with more info of the card
gallery.addEventListener("click", function (e) {
  const card = e.target.closest(".card");
  const index = card.getAttribute("data-index");
  count = index;
  console.log(index);
  console.log(count);
  generateModal(index);

  const button = document.querySelector("#modal-close-btn");
  button.addEventListener("click", function () {
    modalDiv.style.display = "none";
  });

  const btnNext = document.querySelector("#modal-next");
  const btnPrev = document.querySelector("#modal-prev");

  //for (let i = 0; i < 13; i++) {
  btnNext.addEventListener("click", function (e) {
    if (btnNext.textContent === "Next") {
      count++;
      console.log(`count for next ${count}`);
      generateModal(count);
      button.addEventListener("click", function () {
        modalDiv.style.display = "none";
      });
    }
  });
  //}
});

// Search Component Element
const header = document.querySelector(".search-container");
const searchComponent = `
  <form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>

`;
header.insertAdjacentHTML("beforeend", searchComponent);
const search = document.querySelector("#search-input")


/*
 * Initialize searchFunction() function that will display only the data according to the searchInput.
* When the "Search" is performed, the student data is filtered so that only students whose name includes the 
* search value are shown.
* @param (searchInput) search input value
* @param (list) array of student data, 
* 
*/
function searchFunction(searchInput, data) {
  // array of new objects from the data
  let newEmployeeList = [];
 
  // for loop that iterate over the list of students and select just the ones that meet the condition
  for(let i=0; i < data.length; i++) {
     const firstName = data[i].name.first.toLowerCase();
     const lastName = data[i].name.last.toLowerCase();
     console.log(firstName)
     console.log(lastName)
     
     if(firstName.includes(searchInput.value.toLowerCase()) || lastName.includes(searchInput.value.toLowerCase()) ){
        newEmployeeList.push(data[i]);
     }
         
  }
  console.log(newEmployeeList)
  //console.log(newEmployeeList);   
  // call functions to display newList, pagination and/or a message if it does not meet the requirements
  generateHTML(newEmployeeList)
  

}

// event Listener for inputSearch that returns
search.addEventListener("keyup", () => {
  // Condition that takes the input different to zero
  if (search.value.length != 0) {
    searchFunction(search, employeesData);
  } else {
    generateHTML(employeesData)
  }
});
