import * as constants from "../constants";

const url = constants.isDebug ? "http://127.0.0.1:8000" : "";

export interface FetchAudioOptions {
    variant?: "audio" | "instrumental";
}

const fetchAudio = async (videoId: string, {
    variant = "audio",
}: FetchAudioOptions = {}) => {
    const {url: staticUrl} = await fetch(`${url}/${variant}/${videoId}`);

    return staticUrl;
};

export default fetchAudio;
