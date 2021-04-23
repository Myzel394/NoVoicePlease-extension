import getVideoId from "../utils/getVideoId";
import getTitle from "../utils/getTitle";
import downloadUrl from "../utils/downloadUrl";

const downloadAudio = async (variant: "audio" | "instrumental"): Promise<void> => {
    const videoId = getVideoId();
    const filename = `${getTitle().replaceAll(" ", "")}.wav`;

    const {
        downloaded,
        url,
    } = await browser.runtime.sendMessage({
        action: "api/fetch-audio",
        payload: {
            variant,
            videoId,
            filename,
        },
    });

    if (!downloaded) {
        // Download fail, download it manually
        downloadUrl(url, filename);
    }
};

export default downloadAudio;
