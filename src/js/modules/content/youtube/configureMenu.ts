import {MusicNote, FileDownload} from "../../../../assets/svgs";
import {
    getVideoId,
    htmlToElement,
} from "../utils";
import {downloadAudio} from "../backend-connection";

import waitUntilMenuAvailable from "./waitUntilMenuAvailable";
import addMenuButton from "./addMenuButton";
import {
    addSpinner,
    disableButton,
    enableButton,
    removeSpinner,
} from "./button";

const configureMenu = () => {
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
                    await downloadAudio("audio");
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
                    await downloadAudio("instrumental");
                } finally {
                    enableButton($instrumentalButton);
                    removeSpinner($instrumentalButton);
                }
            },
        });
    });
};

export default configureMenu;
