import { type ValidatorInterface, type ConfigInterface } from "@interfaces";

export class JsonConfig<
    ConfigTypes extends Record<number | string | symbol, unknown>,
> implements ConfigInterface<ConfigTypes> {

    protected configs!: ConfigTypes;

    public constructor(
        protected readonly data: ConfigTypes | Record<string, unknown>,
        protected readonly validator: ValidatorInterface<ConfigTypes>,
    ) {
    }

    public async has($key: keyof ConfigTypes): Promise<boolean> {
        return $key in this.configs;
    }

    public async get<Config extends keyof ConfigTypes>(
        $key: Config,
        $default?: (() => Promise<ConfigTypes[Config]>) | undefined,
    ): Promise<ConfigTypes[Config]> {
        return this.configs[$key.toString()] === undefined
            ? $default?.() ?? this.configs[$key]
            : this.configs[$key];
    }

    public async all(): Promise<ConfigTypes> {
        return { ...this.configs };
    }

    public async set<Config extends keyof ConfigTypes>(
        $key: Config,
        $value: ConfigTypes[Config],
    ): Promise<ConfigInterface<ConfigTypes>> {
        this.configs[$key] = $value;

        return this;
    }

    public async init(): Promise<void> {
        this.configs = this.validator.parse(this.data);
    }

}
