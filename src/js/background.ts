import sanitize from "sanitize-filename";

import fetchAudio from "./modules/background/fetchAudio";

interface PrivilegedDownloadFileRequest {
    action: "api/fetch-audio";
    payload: {
        variant: "audio" | "instrumental";
        videoId: string;
        filename: string;
    };
}

type Request = PrivilegedDownloadFileRequest;

browser.runtime.onMessage.addListener(async (request: Request) => {
    const {action, payload} = request;

    switch (action) {
        case "api/fetch-audio": {
            const {variant, videoId, filename} = payload;
            const url = await fetchAudio(videoId, {
                variant,
            });

            if (browser.downloads) {
                await browser.downloads.download({
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    url,
                    filename: sanitize(filename),
                });

                return {
                    url,
                    downloaded: true,
                };
            } else {
                return {
                    url,
                    downloaded: false,
                };
            }
        }
    }

    return {};
});
