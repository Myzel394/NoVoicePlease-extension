import * as publicInstances from "../../assets/public-instances.json";

export interface Configuration {
    skipSegments: boolean;
    quality: number;
    api: {
        url: string;
        name: string;
    };
}

export const DEFAULT_CONFIGURATION: Configuration = {
    skipSegments: true,
    quality: 320,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    api: publicInstances.instances[0],
};

export const getConfiguration = async (): Promise<Configuration> => {
    try {
        const savedConfiguration = await browser.storage.local.get("configuration");
        const configuration = Object.assign(DEFAULT_CONFIGURATION, savedConfiguration?.configuration ?? {});

        return configuration;
    } catch {
        return DEFAULT_CONFIGURATION;
    }
};

export const updateConfiguration = async (updates: Partial<Configuration>): Promise<void> => {
    const savedConfiguration = await getConfiguration();
    const newConfiguration = Object.assign(savedConfiguration, updates);

    return browser.storage.local.set({
        configuration: newConfiguration,
    });
};
