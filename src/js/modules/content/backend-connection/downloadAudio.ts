import sanitize from "sanitize-filename";

import getVideoId from "../utils/getVideoId";
import getTitle from "../utils/getTitle";
import downloadUrl from "../utils/downloadUrl";

const downloadAudio = async (variant: "audio" | "instrumental"): Promise<void> => {
    const videoId = getVideoId();
    const filename = sanitize(`${getTitle().replaceAll(" ", "")}.wav`);

    if (!videoId) {
        throw new Error("Video id wasn't found.");
    }

    try {
        const {
            url,
            downloaded,
        } = await browser.runtime.sendMessage({
            action: "api/fetch-audio",
            payload: {
                videoId,
                variant,
                filename,
            },
        });

        if (!downloaded) {
            // Download fail, download it manually
            downloadUrl(url, filename);
        }
    } catch {
        throw new Error("Fetch failed");
    }
};

export default downloadAudio;
