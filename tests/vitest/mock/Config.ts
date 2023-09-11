import { type ConfigInterface } from "../../../src";

interface MyConfigsInterface {
    exampleString: string;
    exampleNumber: number;
}

export class Config implements ConfigInterface<MyConfigsInterface> {

    private $configs?: MyConfigsInterface;

    public async has($key: keyof MyConfigsInterface): Promise<boolean> {
        return $key in this.$configs;
    }

    public async get<Config extends keyof MyConfigsInterface>(
        $key: Config,
        $default?: () => Promise<MyConfigsInterface[Config]>,
    ): Promise<MyConfigsInterface[Config]> {
        return this.$configs?.[$key] ?? $default?.();
    }

    public async all(): Promise<MyConfigsInterface> {
        return this.$configs;
    }

    public async set<Config extends keyof MyConfigsInterface>(
        _key: Config,
        _value: MyConfigsInterface[Config],
    ): Promise<ConfigInterface<MyConfigsInterface>> {
        return this;
    }

    public async init(): Promise<void> {
        this.$configs = {
            exampleString: "string",
            exampleNumber: 1,
        };
    }

}
