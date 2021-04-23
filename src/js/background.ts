import sanitize from "sanitize-filename";

import {Configuration, getConfiguration, updateConfiguration} from "./modules/background/configuration";
import fetchAudio from "./modules/background/fetchAudio";

interface GetConfigurationRequest {
    action: "get/configuration";
    payload: never;
}

interface UpdateConfigurationRequest {
    action: "update/configuration";
    payload: Partial<Configuration>;
}

interface PrivilegedDownloadFileRequest {
    action: "api/fetch-audio";
    payload: {
        variant: "audio" | "instrumental";
        videoId: string;
        filename: string;
    };
}

type Request = GetConfigurationRequest | UpdateConfigurationRequest | PrivilegedDownloadFileRequest;

browser.runtime.onMessage.addListener((request: Request, sender, sendResponse) => {
    const {action, payload} = request;

    switch (action) {
        case "get/configuration": {
            sendResponse(getConfiguration());
            return false;
        }
        case "update/configuration": {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            updateConfiguration(payload);
            sendResponse();
            return false;
        }
        case "api/fetch-audio": {
            (async () => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
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

                    sendResponse({
                        url,
                        downloaded: true,
                    });
                } else {
                    sendResponse({
                        url,
                        downloaded: false,
                    });
                }
            })();
            return true;
        }
    }

    return false;
});
