const SVG_CLASSES = ["style-scope", "yt-icon"];

const prepareSVG = ($svg: SVGElement): void => {
    $svg.setAttribute("focusable", "false");

    $svg.removeAttribute("fill");

    $svg.classList.add("style-scope", "yt-icon");

    $svg.style.pointerEvents = "none";
    $svg.style.display = "block";
    $svg.style.width = "100%";
    $svg.style.height = "100%";

    $svg.querySelectorAll("*").forEach(($element) => {
        $element.classList.add(...SVG_CLASSES);
    });
    $svg.classList.add(...SVG_CLASSES);
};

export interface AddMenuButtonOptions {
    title: string;
    insertBefore: HTMLElement;
    icon: SVGElement;
    onAction: () => any;

    tooltip?: string;
    ariaLabel?: string;
}

const addMenuButton = ({
    title,
    ariaLabel,
    tooltip,
    onAction,
    insertBefore: $insertBefore,
    icon: $icon,
}: AddMenuButtonOptions): Promise<HTMLElement> => new Promise((resolve, reject) => {
    if (!$insertBefore.parentNode) {
        reject(new Error("insertBefore has no parent"));
    }

    prepareSVG($icon);

    const $button = document.createElement("ytd-button-renderer");
    $button.className = "style-scope ytd-menu-renderer force-icon-button style-default size-default";
    $button.setAttribute("use-keyboard-focused", "");
    $button.setAttribute("button-renderer", "true");
    $button.setAttribute("style-action-button", "");
    $button.setAttribute("is-icon-button", "");

    $insertBefore.parentNode!.insertBefore($button, $insertBefore);

    $button.innerHTML = `
        <a class="yt-simple-endpoint style-scope ytd-button-renderer" tabindex="-1">
            <yt-icon-button id="button" class="style-scope ytd-button-renderer style-default size-default"></yt-icon-button>
            <yt-formatted-string id="text" class="style-scope ytd-button-renderer style-default size-default" enable-empty-style-class>not_empty</yt-formatted-string>
            <tp-yt-paper-tooltip class="style-scope ytd-button-renderer" role="tooltip" tabindex="-1" style="inset: 44px auto auto 227.477px;">
                <div class="style-scope tp-yt-paper-tooltip hidden">not_empty</div>
            </tp-yt-paper-tooltip>
        </a>
    `;


    // We need to wait until the elements are loaded
    const observer = new MutationObserver(() => {
        if ($button.querySelector("slot") === null) {
            // Not loading anymore, continue process
            const $clickListener = $button.querySelector("a");

            // HTML needs to be set manually for them
            const $buttonContainer = $button.querySelector("yt-icon-button > button") as HTMLElement | null;
            const $titleContainer = $button.querySelector("yt-formatted-string") as HTMLElement | null;
            const $tooltipContainer = $button.querySelector(".tp-yt-paper-tooltip") as HTMLElement | null;

            if (
                $clickListener &&
                $buttonContainer &&
                $titleContainer &&
                $tooltipContainer
            ) {
                $buttonContainer.setAttribute("aria-label", ariaLabel || tooltip || title);
                const $iconContainer = document.createElement("yt-icon");
                $buttonContainer.appendChild($iconContainer);
                $iconContainer.appendChild($icon);

                $titleContainer.classList.remove("is-empty");
                $titleContainer.innerText = title;
                $tooltipContainer.innerText = tooltip || title;

                $clickListener.onclick = onAction;
            } else {
                reject(new Error("Elements missing"));
            }

            // Clean up
            observer.disconnect();
            resolve($button);
        }
    });
    observer.observe($button, {
        childList: true,
        subtree: true,
    });
});

export default addMenuButton;
