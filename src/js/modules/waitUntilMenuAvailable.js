const waitUntilMenuAvailable = (callback) => {
    const body = document.querySelector("body");
    const observer = new MutationObserver((mutations) => {
        const isLoading = Boolean(document.getElementsByTagName("slot").length);

        if (isLoading) {
            return;
        }

        let $menu;

        for (const mutation of mutations) {
            const target = mutation.target;

            if (
                mutation.type === "childList" &&
                target.nodeName === "YTD-MENU-RENDERER" &&
                target.classList.contains("ytd-video-primary-info-renderer")
            ) {
                $menu = target;
            } else if (
                mutation.type === "attributes" &&
                mutation.target.nodeName === "YTD-BUTTON-RENDERER" &&
                mutation.target.classList.contains("ytd-menu-renderer") &&
                mutation.attributeName === "is-icon-button" &&
                mutation.target.children.length === 2
            ) {
                // Youtube reorders the button here strangely, let's just reset it.
                $menu = mutation.target.parentElement.parentElement;
                mutation.target.children[0].remove();
            }
        }

        if ($menu) {
            callback($menu);
        }
    });

    observer.observe(body, {
        subtree: true,
        childList: true,
        attributes: true,
    });
};

export default waitUntilMenuAvailable;
