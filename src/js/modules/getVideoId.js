const getVideoId = () => {
    return new URL(window.location.href).searchParams.get("v");
}

export default getVideoId;
