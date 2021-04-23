
export interface Configuration {
    skipSegments: boolean;
    quality: number;
}

export const DEFAULT_CONFIGURATION: Configuration = {
    skipSegments: true,
    quality: 320,
};

export const getConfiguration = (): Configuration => {
    const savedConfigurationAsStr = localStorage.getItem("configuration");

    if (!savedConfigurationAsStr) {
        return DEFAULT_CONFIGURATION;
    }

    try {
        const savedConfiguration = JSON.parse(savedConfigurationAsStr);
        const configuration = Object.assign(DEFAULT_CONFIGURATION, savedConfiguration);

        return configuration;
    } catch {
        return DEFAULT_CONFIGURATION;
    }
};

export const updateConfiguration = (updates: Partial<Configuration>): void => {
    const savedConfiguration = getConfiguration();
    const newConfiguration = Object.assign(savedConfiguration, updates);

    localStorage.setItem("configuration", JSON.stringify(newConfiguration));
};
