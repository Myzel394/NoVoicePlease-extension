// Custom elements don't work in content script, this is a workaround
const addToast = (message: string): void => {
    const $toast = document.createElement("tp-yt-paper-toast");
    $toast.innerText = message;
    $toast.classList.add("toast-open");

    $toast.style.outline = "none";
    $toast.style.position = "fixed";
    $toast.style.left = "0";
    $toast.style.bottom = "12px";
    $toast.style.maxWidth = "297.547px";
    $toast.style.maxHeight = "48px";
    $toast.style.zIndex = "2202";
    $toast.style.opacity = "1";

    document.body.appendChild($toast);

    // This is needed, otherwise the toast won't show
    setTimeout(() => {
        $toast.style.display = "block";
    }, 0);

    // This preserves the animation
    setTimeout(() => {
        $toast.style.transform = "none";
    }, 10);

    setTimeout(() => {
        $toast.style.transform = "translateY(200%)";
    }, 3000);
};

export default addToast;

