const downloadUrl = (url: string, name: string): void => {
    const link = document.createElement("a");
    link.setAttribute("download", name);
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export default downloadUrl;
