import {MusicNote, FileDownload} from "../../../../assets/svgs";
import {
    addToast,
    getVideoId,
    htmlToElement,
} from "../utils";
import {downloadAudio} from "../backend-connection";
import translate from "../../translate";

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
            title: translate("inject_buttons_audio_title"),
            icon: htmlToElement(FileDownload),
            tooltip: translate("inject_buttons_audio_description"),
            insertBefore: $shareButton,
            onAction: async () => {
                disableButton($audioButton);
                addSpinner($audioButton);

                try {
                    await downloadAudio("audio");
                } catch (error) {
                    addToast(translate("downloadError"));
                } finally {
                    enableButton($audioButton);
                    removeSpinner($audioButton);
                }
            },
        });
        const $instrumentalButton = await addMenuButton({
            title: translate("inject_buttons_instrumental_title"),
            icon: htmlToElement(MusicNote),
            tooltip: translate("inject_buttons_instrumental_description"),
            insertBefore: $shareButton,
            onAction: async () => {
                disableButton($instrumentalButton);
                addSpinner($instrumentalButton);

                try {
                    await downloadAudio("instrumental");
                } catch {
                    addToast(translate("downloadError"));
                } finally {
                    enableButton($instrumentalButton);
                    removeSpinner($instrumentalButton);
                }
            },
        });
    });
};

export default configureMenu;
