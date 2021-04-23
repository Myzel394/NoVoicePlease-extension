import {Configuration} from "./background/configuration";

const updateConfiguration = (updates: Partial<Configuration>): Promise<void> =>
    browser.runtime.sendMessage({
        action: "update/configuration",
        payload: updates,
    });

export default updateConfiguration;
