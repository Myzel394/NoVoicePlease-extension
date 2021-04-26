import * as constants from "../../constants";
import {getConfiguration} from "../configuration";

export interface FetchAudioOptions {
    variant?: "audio" | "instrumental";
}

const fetchAudio = async (videoId: string, {
    variant = "audio",
}: FetchAudioOptions = {}) => {
    const {quality, skipSegments, api} = await getConfiguration();
    const baseURL = constants.isDebug ? "http://127.0.0.1:5612" : api.url;

    const params = new URLSearchParams({
        quality: quality.toString(),
        skip_segments: skipSegments.toString(),
    });

    const path = (() => {
        switch (variant) {
            case "audio": {
                return `/audio/download/${videoId}`;
            }
            case "instrumental": {
                return `/audio/extract/instrumental/${videoId}`;
            }
        }
        // Will never occur, but needed for eslint
        return "";
    })();

    const url = `${baseURL}${path}?${params}`;

    const {url: staticUrl} = await fetch(url);

    return staticUrl;
};

export default fetchAudio;
