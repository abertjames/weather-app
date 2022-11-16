import "./style.css";
import { getWeatherData } from "./weatherAPI";

function initDisplay() {
    const webpage = document.body;
    const text = document.createElement("h1");
    text.classList.add("text");
    text.textContent = "fart";
    webpage.appendChild(text);

    webpage.appendChild(_makeInput());
}

const _makeInput = () => {
    //make weather input
    const weatherForm = document.createElement("div");
    // const status = document.createElement("p");
    // status.id = "status";

    const locationInput = document.createElement("input");
    locationInput.type = "text";
    locationInput.id = "locationInput";

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", () => {
        const search = document.getElementById("locationInput").value;
        console.log(search);
        getWeatherData(search);
    });

    weatherForm.appendChild(locationInput);
    weatherForm.appendChild(submitButton);
    return weatherForm;
};

export { initDisplay };
