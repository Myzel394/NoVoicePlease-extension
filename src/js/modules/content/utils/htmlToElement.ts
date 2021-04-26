const htmlToElement = <T extends Element = HTMLElement>(html: string): T => {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(html, "text/html");

    return parsed.body.firstChild as T;
};

export default htmlToElement;
