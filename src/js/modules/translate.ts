const translate = (identifier: string, parameters: any[] = []): string => {
    return browser.i18n.getMessage(identifier, parameters);
};

export default translate;
