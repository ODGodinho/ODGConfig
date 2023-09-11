/**
 * Configuration of my application
 *
 * @template {Record<string, unknown>} ConfigTypes my Configs types
 */
export interface ConfigInterface<ConfigTypes = Record<string, unknown>> {

    /**
     * Check if exist current config
     *
     * @param {keyof ConfigTypes} $key Config key
     * @returns {Promise<boolean>}
     */
    has($key: keyof ConfigTypes): Promise<boolean>;

    /**
     * Get config by name
     *
     * @template {keyof ConfigTypes} Config Config Name
     * @param {Config} $key Config key
     * @param {() => Promise<ConfigTypes[Config]>} $default Default config value
     * @returns {Promise<ConfigTypes[Config]>}
     */
    get<Config extends keyof ConfigTypes>(
        $key: Config,
        $default?: () => Promise<ConfigTypes[Config]>,
    ): Promise<ConfigTypes[Config]>;

    /**
     * Get all Configs in JSON
     *
     * @returns {Promise<ConfigTypes>}
     */
    all(): Promise<ConfigTypes>;

    /**
     * Set Config Value in run time execution only
     *
     * @template {keyof ConfigTypes} Config Configs keys
     * @param {Config} $key Config key name
     * @param {ConfigTypes[Config]} $value New value for config
     * @returns {Promise<ConfigInterface<ConfigTypes>>}
     */
    set<Config extends keyof ConfigTypes>(
        $key: Config,
        $value: ConfigTypes[Config]
    ): Promise<ConfigInterface<ConfigTypes>>;

    /**
     * Load all config from memory and prepare class to use
     *
     * @returns {Promise<void>}
     */
    init(): Promise<void>;

}
