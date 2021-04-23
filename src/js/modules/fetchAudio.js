import * as constants from "../constants";

const url = constants.isDebug ? "http://127.0.0.1:8000" : "";

const fetchAudio = async (videoId, {
    variant = "audio",
} = {}) => {
    const {url: staticUrl} = await fetch(`${url}/${variant}/${videoId}`);

    return staticUrl;
}

export default fetchAudio;
