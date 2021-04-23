const waitUntilMenuAvailable = (callback: ($menu: HTMLElement) => any): void => {
    const observer = new MutationObserver((mutations) => {
        const isLoading = Boolean(document.getElementsByTagName("slot").length);

        if (isLoading) {
            return;
        }

        let $menu;

        for (const mutation of mutations) {
            const target = mutation.target as HTMLElement;

            if (
                mutation.type === "childList" &&
                target.nodeName === "YTD-MENU-RENDERER" &&
                target.classList.contains("ytd-video-primary-info-renderer")
            ) {
                // Menu bar
                $menu = target;
            } else if (
                mutation.type === "attributes" &&
                mutation.target.nodeName === "YTD-BUTTON-RENDERER" &&
                mutation.attributeName === "is-icon-button" &&
                target.classList.contains("ytd-menu-renderer") &&
                target.children.length === 2
            ) {
                // Youtube tries to reorder the buttons here strangely, let's prevent that
                $menu = mutation.target.parentElement?.parentElement;
                target.children[0].remove();
            }
        }

        if ($menu) {
            callback($menu);
        }
    });

    observer.observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true,
    });
};

export default waitUntilMenuAvailable;
