import { Config } from "tests/vitest/mock/Config";

describe("Example Teste", () => {
    test("Test not init", async () => {
        const config = new Config();
        await expect(config.get("exampleString")).resolves.toBeUndefined();
    });
    test("Test init", async () => {
        const config = new Config();
        await config.init();
        await expect(config.get("exampleString")).resolves.toBe("string");
    });
});
