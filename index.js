import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
// import "slim-select/dist/slimselect.css";

// export function() {
//     document.querySelector(".breed-select").style.display = "none";
//     document.querySelector('.cat-info').style.display = 'none';
//     document.querySelector('.loader').style.display = 'block';

//     return axios.get("https://api.thecatapi.com/v1/breeds")
//     .then(response => {
//         document.querySelector(".loader").style.display = "none";
//         document.querySelector(".breed-select").style.display = "block";

//         const breeds = response.data;

//         const select = document.querySelector(".breed-select");
//         breeds.forEach(breed => {
//             const option = document.createElement("option");
//             option.value = breed.id;
//             option.textContent = breed.name;
//             select.appendChild(option);
//         });
//         return breeds;
// })

// .catch(error => {
//     document.querySelector(".error").style.display = "block";
//     console.error("Error fetching breeds:", error);
//     throw error;
// });
// }

// export function fetchCatByBreed(breedId) {
//     document.querySelector('.cat-info').style.display = 'none';
//   document.querySelector('.loader').style.display = 'block';

//   return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
//     .then(response => {
//         document.querySelector(".loader").style.display = "none";
//         document.querySelector(".cat-info").style.display = "block";

//         catInfo.innerHTML = `
//         <p><strong>Breed:</strong> ${cat.breeds[0].name}</p>
//         <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
//         <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>`;

//         return cat;
//     })
//     .catch(error => {
//         document.querySelector(".error").style.display = "block";
//         console.error("Error fetching cat by breed:", error);
//         throw error;
//     });
// }

const breedSelectEl = document.querySelector(".breed-select");
const catInfoEl = document.querySelector(".cat-info");
const loaderEl = document.querySelector(".loader");
const errorEl = document.querySelector(".error");

function chooseBreed(data) {
  fetchBreeds(data)
    .then((data) => {
      loaderEl.classList.replace("loader", "is-hidden");

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
  loaderEl.classList.replace("is-hidden", "loader");
  breedSelectEl.classList.add("is-hidden");
  catInfoEl.classList.add("is-hidden");

  const breedId = event.target.value;

  fetchCatByBreed(breedId)
    .then((data) => {
      loaderEl.classList.replace("loader", "is-hidden");
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
  errorEl.classList.remove("is-hidden");
  breedSelectEl.classList.add("is-hidden");
}
