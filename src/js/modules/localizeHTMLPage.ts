import translate from "./translate";

const localizeHTMLPage = () => {
    const html = document.body.innerHTML.toString();
    const parsedHTML = html.replace(
        /__MSG_(\w+)__/g,
        (match, identifier) => translate(identifier),
    );
    document.body.innerHTML = parsedHTML;
};

export default localizeHTMLPage;
