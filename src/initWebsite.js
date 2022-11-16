import { initDisplay } from "./display";
import { initLocation } from "./weatherAPI";

function initWebsite() {
    initDisplay();
    initLocation();
}

export { initWebsite };
