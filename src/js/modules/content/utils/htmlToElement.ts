const htmlToElement = <T extends Element = HTMLElement>(html: string): T => {
    const $element = document.createElement("div");
    $element.innerHTML = html;
    return $element.firstChild as T;
};

export default htmlToElement;
