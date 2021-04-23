export const disableButton = ($button: HTMLElement): void => {
    $button.classList.add("style-visibly-disabled");

    const $text = $button.querySelector("yt-formatted-string");

    if ($text) {
        $text.classList.add("style-visibly-disabled");
        $text.classList.remove("ytd-button-renderer");
    } else {
        throw new Error("text element wasn't found");
    }
};

export const enableButton = ($button: HTMLElement): void => {
    $button.classList.remove("style-visibly-disabled");

    const $text = $button.querySelector("yt-formatted-string");

    if ($text) {
        $text.classList.remove("style-visibly-disabled");
        $text.classList.add("ytd-button-renderer");
    } else {
        throw new Error("text element wasn't found");
    }
};

export const addSpinner = ($button: HTMLElement): void => {
    const $spinner = document.createElement("paper-spinner");
    $spinner.setAttribute("aria-hidden", "false");
    $spinner.setAttribute("active", "");
    $spinner.style.transform = "scale(0.6)";

    const $nextElement = $button.querySelector("yt-icon-button");

    if ($nextElement?.parentNode) {
        $nextElement.parentNode.insertBefore($spinner, $nextElement);
    } else {
        throw new Error("button element wasn't found");
    }
};

export const removeSpinner = ($button: HTMLElement): void => {
    const $spinner = $button.querySelector("paper-spinner");

    if ($spinner) {
        $spinner.remove();
    }
    // Already deleted probably
};
