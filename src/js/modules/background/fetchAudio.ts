import * as constants from "../../constants";

import {getConfiguration} from "./configuration";

const baseURL = constants.isDebug ? "http://127.0.0.1:8000" : "";

export interface FetchAudioOptions {
    variant?: "audio" | "instrumental";
}

const fetchAudio = async (videoId: string, {
    variant = "audio",
}: FetchAudioOptions = {}) => {
    const {quality, skipSegments} = getConfiguration();

    const params = new URLSearchParams({
        quality: quality.toString(),
        skipSegments: skipSegments.toString(),
    });
    const url = `${baseURL}/${variant}/${videoId}?${params}`;

    const {url: staticUrl} = await fetch(url);

    return staticUrl;
};

export default fetchAudio;
