import axios from "axios"

axios.defaults.headers.common["x-api-key"] = "live_ytU4b67XW5xE87klsEfSBkTQ0g0rKJhj8eeDZvTzmgSmJD95Cw4SSRwJbL85GCTL";

export function() {
    document.querySelector(".breed-select").style.display = "none";
    document.querySelector('.cat-info').style.display = 'none';
    document.querySelector('.loader').style.display = 'block';

    return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => {
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".breed-select").style.display = "block";

        const breeds = response.data;

        const select = document.querySelector(".breed-select");
        breeds.forEach(breed => {
            const option = document.createElement("option");
            option.value = breed.id;
            option.textContent = breed.name;
            select.appendChild(option);
        });
        return breeds;
})

.catch(error => {
    document.querySelector(".error").style.display = "block";
    console.error("Error fetching breeds:", error);
    throw error;
});
}

