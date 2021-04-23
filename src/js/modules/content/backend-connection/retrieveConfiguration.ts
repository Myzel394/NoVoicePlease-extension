import {Configuration} from "../../background/configuration";

const retrieveConfiguration = async (): Promise<Configuration> => {
    const data = await browser.runtime.sendMessage({action: "get/configuration"});

    return data;
};

export default retrieveConfiguration;
