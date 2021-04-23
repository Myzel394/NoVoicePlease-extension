import fileDownloadIcon from "../assets/svgs/file-download.svg";
import musicNoteIcon from "../assets/svgs/music-note.svg";
import waitUntilMenuAvailable from "./modules/waitUntilMenuAvailable";
import addMenuButton from "./modules/addMenuButton";
import {
    addSpinner,
    disableButton,
    enableButton,
    removeSpinner
} from "./modules/button";
import getVideoId from "./modules/getVideoId";
import fetchAudio from "./modules/fetchAudio";

const htmlToElement = (html) => {
    const $element = document.createElement("div");
    $element.innerHTML = html;
    return $element.firstChild;
}

waitUntilMenuAvailable(async $menu => {
    const $buttons = $menu.querySelector("#top-level-buttons");
    const $shareButton = $buttons.children [2];

    const videoId = getVideoId();

    const $audioButton = await addMenuButton({
        title: "Audio",
        icon: htmlToElement(fileDownloadIcon),
        tooltip: "Download audio",
        insertBefore: $shareButton,
        onAction: async () => {
            disableButton($audioButton);
            addSpinner($audioButton);

            try {
                const url = await fetchAudio(videoId);

                window.open(url, "_newtab");
            } finally {
                enableButton($audioButton);
                removeSpinner($audioButton);
            }
        },
    });
    const $instrumentalButton = await addMenuButton({
        title: "Instrumental",
        icon: htmlToElement(musicNoteIcon),
        tooltip: "Extract instrumental",
        insertBefore: $shareButton,
        onAction: async () => {
            disableButton($instrumentalButton);
            addSpinner($instrumentalButton);

            try {
                const url = await fetchAudio(videoId, {
                    variant: "instrumental"
                });

                window.open(url, "_newtab");
            } finally {
                enableButton($instrumentalButton);
                removeSpinner($instrumentalButton);
            }
        },
    });
})

