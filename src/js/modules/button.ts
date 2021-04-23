export const disableButton = ($button: HTMLElement): void => {
    $button.classList.add("style-visibly-disabled");

    const $text = $button.querySelector("yt-formatted-string");
    $text.classList.add("style-visibly-disabled");
    $text.classList.remove("ytd-button-renderer");
};

export const enableButton = ($button: HTMLElement): void => {
    $button.classList.remove("style-visibly-disabled");

    const $text = $button.querySelector("yt-formatted-string");
    $text.classList.remove("style-visibly-disabled");
    $text.classList.add("ytd-button-renderer");
};

export const addSpinner = ($button: HTMLElement): void => {
    const $spinner = document.createElement("paper-spinner");
    $spinner.setAttribute("aria-hidden", "false");
    $spinner.setAttribute("active", "");
    $spinner.style.transform = "scale(0.6)";

    const $nextElement = $button.querySelector("yt-icon-button");
    $nextElement.parentNode.insertBefore($spinner, $nextElement);
};

export const removeSpinner = ($button: HTMLElement): void => {
    const $spinner = $button.querySelector("paper-spinner");
    $spinner.remove();
};
