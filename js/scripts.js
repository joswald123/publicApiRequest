const gallery = document.getElementById("gallery");
const modalDiv = document.createElement("div");


// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetch("https://randomuser.me/api/?results=12")
  .then((res) => res.json())
  .then((data) => generateHTML(data.results));

// ------------------------------------------
//  HELPER FUNCTIONS
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
      console.log(employee);
      gallery.insertAdjacentHTML("beforeend", html);
    });
  
    return;
  }
// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
