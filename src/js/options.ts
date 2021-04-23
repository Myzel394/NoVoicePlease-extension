import "materialize-css/dist/js/materialize.min";
import {AutoInit, toast} from "materialize-css";

import retrieveConfiguration from "./modules/retrieveConfiguration";
import updateConfiguration from "./modules/updateConfiguration";

// eslint-disable-next-line @typescript-eslint/no-misused-promises
document.addEventListener("DOMContentLoaded", async () => {
    AutoInit();

    const $form = document.querySelector("form") as HTMLFormElement;
    const $skipSegments = document.getElementById("skip_segments") as HTMLInputElement;
    const $quality = document.getElementById("quality") as HTMLInputElement;

    const {
        skipSegments,
        quality,
    } = await retrieveConfiguration();
    $form.classList.remove("disabled");

    $skipSegments.checked = skipSegments;
    $quality.value = quality.toString();

    $form.onsubmit = (event) => {
        event.preventDefault();
        $form.classList.add("disabled");

        updateConfiguration({
            quality: Number($quality.value),
            skipSegments: $skipSegments.checked,
        }).then(() => toast({
            html: "Settings saved!",
        })).finally(() => {
            $form.classList.remove("disabled");
        });
    };
});
