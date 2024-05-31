import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
// import "slim-select/dist/slimselect.css";

const breedSelectEl = document.querySelector(".breed-select");
const catInfoEl = document.querySelector(".cat-info");
const loaderEl = document.querySelector(".loader");
const errorEl = document.querySelector(".error");

// function chooseBreed(data) {
//   fetchBreeds(data)
//     .then((data) => {
//       loaderEl.classList.replace("loader", "is-hidden");

//       let optionsMarkup = data.map(({ name, id }) => {
//         return `<option value ='${id}'>${name}</option>`;
//       });

//       breedSelectEl.insertAdjacentHTML("beforeend", optionsMarkup);
//       breedSelectEl.classList.remove("is-hidden");
//     })
//     .catch(onError);
// }

// chooseBreed();

// function createMarkup(event) {
//   loaderEl.classList.replace("is-hidden", "loader");
//   breedSelectEl.classList.add("is-hidden");
//   catInfoEl.classList.add("is-hidden");

//   const breedId = event.target.value;

//   fetchCatByBreed(breedId)
//     .then((data) => {
//       loaderEl.classList.replace("loader", "is-hidden");
//       breedSelectEl.classList.remove("is-hidden");

//       const { url, breeds } = data[0];
//       const { name, description, temperament } = breeds[0];

//       catInfoEl.innerHTML = `
//         <img src="${url}" alt="${name}" width="400"/>
//         <div class="box">
//           <h2>${name}</h2>
//           <p>${description}</p>
//           <p><strong>Temperament:</strong> ${temperament}</p>
//         </div>
//         `;
//       catInfoEl.classList.remove("is-hidden");
//     })
//     .catch(onError);
// }

// breedSelectEl.addEventListener("change", createMarkup);

// function onError() {
//   errorEl.classList.remove("is-hidden");
//   breedSelectEl.classList.add("is-hidden");
// }

function chooseBreed() {
  loaderEl.classList.remove("is-hidden");
  errorEl.classList.add("is-hidden");

  fetchBreeds()
    .then((data) => {
      loaderEl.classList.add("is-hidden");

      let optionsMarkup = data.map(({ name, id }) => {
        return `<option value ='${id}'>${name}</option>`;
      });

      breedSelectEl.insertAdjacentHTML("beforeend", optionsMarkup);
      breedSelectEl.classList.remove("is-hidden");
    })
    .catch(onError);
}

chooseBreed();

function createMarkup(event) {
  loaderEl.classList.remove("is-hidden");
  errorEl.classList.add("is-hidden");
  breedSelectEl.classList.add("is-hidden");
  catInfoEl.classList.add("is-hidden");

  const breedId = event.target.value;

  fetchCatByBreed(breedId)
    .then((data) => {
      loaderEl.classList.add("is-hidden");
      breedSelectEl.classList.remove("is-hidden");

      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];

      catInfoEl.innerHTML = `
          <img src="${url}" alt="${name}" width="400"/>
          <div class="box">
            <h2>${name}</h2>
            <p>${description}</p>
            <p><strong>Temperament:</strong> ${temperament}</p>
          </div>
          `;
      catInfoEl.classList.remove("is-hidden");
    })
    .catch(onError);
}

breedSelectEl.addEventListener("change", createMarkup);

function onError() {
  loaderEl.classList.add("is-hidden");
  errorEl.classList.remove("is-hidden");
  breedSelectEl.classList.add("is-hidden");
  catInfoEl.classList.add("is-hidden");
}
