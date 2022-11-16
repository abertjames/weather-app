async function getWeatherData(location) {
    const weatherURL =
        "http://api.openweathermap.org/data/2.5/weather?" +
        "q=" +
        location +
        "&APPID=" +
        "949a69bfd443a14c9d995fc34c4a80a3";

    const badURL = "http://no-such-url";

    const response = await fetch(weatherURL, {
        mode: "cors",
    }).catch((error) => {
        //have a network error message alert or something
        console.log(error);
    });

    if (!response.ok) {
        //handle the error of bad or empty location name
        //maybe give information about the error to them
        throw new Error("Network response was not OK");
    } else if (response.ok) {
        const weatherData = await response.json();
        console.log(weatherData);

        // save locally if the location is deemed a valid location
        // _saveLocal(location)
    }

    //handle error of weatherURL never returning
}

async function _getUserCoordinates() {
    //from mdn web docs

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
        console.log("Located");
        _getUserLocation(latitude, longitude);
    }

    function error() {
        // status.textContent = "Unable to retrieve your location";
        console.log("Unable to retrieve your location");
    }

    if (!navigator.geolocation) {
        // status.textContent = "Geolocation is not supported by your browser";
        console.log("Geolocation is not supported by your browser");
    } else {
        // status.textContent = "Locating…";
        console.log("Locating…");
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

async function _getUserLocation(latitude, longitude) {
    const locationURL =
        "http://api.geonames.org/findNearestAddressJSON?" +
        "lat=" +
        latitude +
        "&" +
        "lng=" +
        longitude +
        "&username=abertjames";
    const response = await fetch(locationURL, {
        mode: "cors",
    });
    const locationData = await response.json();
    console.log(locationData);
}

const _storageAvailable = (type) => {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
};

function _retrieveLocal() {
    const lastLocation = JSON.parse(localStorage.getItem("lastLocation"));
    // console.log(lastLocation);
    return lastLocation;
}

function _saveLocal(locationSearch) {
    localStorage.setItem("lastLocation", JSON.stringify(locationSearch));
}

async function initLocation() {
    if (_storageAvailable("localstorage")) {
        const lastLocation = _retrieveLocal();
        // console.log(lastLocation);
        getWeatherData(lastLocation);
        // pass the last searched location and load on that
        //call a function to populate the data
    } else if (!navigator.geolocation) {
        //check if location is enabled / ask to enable location
        console.log("no location services");
    } else {
        _getUserCoordinates();
    }
}

export { getWeatherData, _getUserCoordinates, _getUserLocation, initLocation };
