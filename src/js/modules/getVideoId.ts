const getVideoId = (): string | null =>
    new URL(window.location.href).searchParams.get("v");

export default getVideoId;
