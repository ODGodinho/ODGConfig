import zod from "zod";

import { type ConfigInterface } from "@interfaces";
import { JsonConfig } from "src/configs/JsonConfig";

describe("Example Teste", () => {
    const validator = zod.object({
        example: zod.string().optional(),
        example2: zod.string().optional(),
    });
    let config: ConfigInterface<zod.infer<typeof validator>>;
    const exampleValue = "123";

    beforeAll(() => {
        config = new JsonConfig<zod.infer<typeof validator>>({
            example: exampleValue,
        }, validator);
    });

    test("Test Invalid Validator", async () => {
        const invalidValidator = zod.object({
            example: zod.string(),
        });

        expect(() => new JsonConfig<zod.infer<typeof invalidValidator>>(
            { example: 123 },
            invalidValidator,
        )).toThrow();
    });

    test.concurrent("Test has Key", async () => {
        await expect(config.has("example")).resolves.toBeTruthy();
        await expect(config.has("example2")).resolves.toBeFalsy();
    });

    test.concurrent("Test get without default", async () => {
        await expect(config.get("example")).resolves.toBe(exampleValue);
        await expect(config.get("example2")).resolves.toBeUndefined();
    });

    test.concurrent("Test get with default", async () => {
        await expect(config.get("example", () => "456")).resolves.toBe(exampleValue);
        await expect(config.get("example2", () => "456")).resolves.toBe("456");
    });

    test.concurrent("Test set config", async () => {
        const otherConfig = new JsonConfig<zod.infer<typeof validator>>({
            example: exampleValue,
        }, validator);

        await expect(otherConfig.set("example2", "000")).resolves.toBe(otherConfig);
        await expect(otherConfig.get("example2")).resolves.toBe("000");
        await expect(otherConfig.get("example")).resolves.toBe(exampleValue);
        await expect(otherConfig.set("example", "111")).resolves.toBe(otherConfig);
        await expect(otherConfig.get("example")).resolves.not.toBe(exampleValue);
    });

    test.concurrent("Test all config", async () => {
        await expect(config.all()).resolves.toMatchObject({
            example: exampleValue,
        });
    });

    test.concurrent("Test init config", async () => {
        await expect(config.init()).resolves.toBeUndefined();
    });
});
