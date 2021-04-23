import {MusicNote, FileDownload} from "../../assets/svgs";

import waitUntilMenuAvailable from "./waitUntilMenuAvailable";
import addMenuButton from "./addMenuButton";
import {
    addSpinner,
    disableButton,
    enableButton,
    removeSpinner,
} from "./button";
import getVideoId from "./getVideoId";
import fetchAudio from "./fetchAudio";
import htmlToElement from "./htmlToElement";

waitUntilMenuAvailable(async $menu => {
    const videoId = getVideoId();


    if (!videoId) {
        // If no video id available, the user isn't on video watch page
        return;
    }

    const $buttons = $menu.querySelector("#top-level-buttons");

    if (!$buttons) {
        return;
    }

    const $shareButton = $buttons.children[2] as HTMLElement;

    const $audioButton = await addMenuButton({
        title: "Audio",
        icon: htmlToElement(FileDownload),
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
        icon: htmlToElement(MusicNote),
        tooltip: "Extract instrumental",
        insertBefore: $shareButton,
        onAction: async () => {
            disableButton($instrumentalButton);
            addSpinner($instrumentalButton);

            try {
                const url = await fetchAudio(videoId, {
                    variant: "instrumental",
                });

                window.open(url, "_newtab");
            } finally {
                enableButton($instrumentalButton);
                removeSpinner($instrumentalButton);
            }
        },
    });
});
