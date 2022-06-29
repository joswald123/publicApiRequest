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
  .then((data) => loadData(data.results))
  .catch((err) => console.log("There was an error:", err));

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
/**
 * loadData() function
 * @param(data) response from API
 * loading data into an empty array to use them in a modal
 * call function generateHTML()
 */

function loadData(data) {
  employeesData = data;
  generateHTML(employeesData);
}

/**
 * generateHTML() function
 * @param(data) employeeData array
 * @returns(element DOM) creates a literal with all the API info
 */
function generateHTML(data) {
  let html = "";
  data.map((employee, index) => {
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
  let html = `<div class="modal" data-index="${index}">
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

  //Grabbing Dom elements
  const prevBtn = document.querySelector("#modal-prev");
  const nextBtn = document.querySelector("#modal-next");
  const indexModal = document.querySelector(".modal").getAttribute("data-index");
  let count = indexModal 

  /**
  * Event Listener that show a modal
  * generateModal function @param(number) Shows the info of the next employee card 
  * closeBtn Function @param(button) Helper function that hide the modal
  */
  prevBtn.addEventListener("click", function () {
    count <= 0 ? count = 0 : count -- 
    generateModal(count);

    const button = document.querySelector("#modal-close-btn");
    closedBtn(button)
  });

   /**
    * Event Listener that show a modal
    * generateModal function @param(number) Shows the info of the next employee card 
    * closeBtn Function @param(button) Helper function that hide the modal
    */
  nextBtn.addEventListener("click", function () {
    count >= 11 ? count = 11 : count ++
    generateModal(count);

    const button = document.querySelector("#modal-close-btn");
    closedBtn(button)
  });

  return;
}

/**
  * closeBtn Function
  * @param(button) Helper function that hide the modal
*/

function closedBtn(btn) {
  btn.addEventListener("click", function () {
    modalDiv.style.display = "none";
  });
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

/**
* Event Listener that show a modal
* Each time a card is clicked show a modal card with more info of the card
* generateModal function @param(number) Shows the info that match with the index of the card 
* closeBtn Function @param(button) Helper function that hide the modal
*/
gallery.addEventListener("click", function (e) {
  const card = e.target.closest(".card");
  const index = card.getAttribute("data-index");
  generateModal(index);

  const button = document.querySelector("#modal-close-btn");
  closedBtn(button)
});


// ------------------------------------------
//  SEARCH COMPONENT
// ------------------------------------------

// Creating a literal Search input
const header = document.querySelector(".search-container");
const searchComponent = `
  <form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>

`;
header.insertAdjacentHTML("beforeend", searchComponent);
const search = document.querySelector("#search-input");

/** 
 * Initialize searchFunction() function that will display only the data according to the searchInput.
 * When the "Search" is performed, the employee data is filtered so that only students whose name includes the
 * search value are shown.
 * @param (searchInput) search input value
 * @param (employeeData) array of employee data,
 *
 **/
function searchFunction(searchInput, data) {
  // array of new objects from the data
  let newEmployeeList = [];

  // for loop that iterate over the employee data and select just the ones that meet the condition
  for (let i = 0; i < data.length; i++) {
    const firstName = data[i].name.first.toLowerCase();
    const lastName = data[i].name.last.toLowerCase();

    if (
      firstName.includes(searchInput.value.toLowerCase()) ||
      lastName.includes(searchInput.value.toLowerCase())
    ) {
      newEmployeeList.push(data[i]);
    }
  }
  console.log(newEmployeeList);
  generateHTML(newEmployeeList);
}

/**
* Event Listener for inputSearch
* Each time a key is pressed & is different than 0 call the searchFunction() 
* generateHTML function @param(data) Shows the data on the screen
*/
search.addEventListener("keyup", () => {
  // Condition that takes the input different to zero
  if (search.value.length != 0) {
    gallery.innerHTML = "";
    searchFunction(search, employeesData);
  } else {
    gallery.innerHTML = "";
    generateHTML(employeesData);
   
  }
});
