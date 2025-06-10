import assert from "node:assert/strict";
import { it } from "node:test";
import { Duration } from "@js-joda/core";
import { toJSONSchema } from "zod/v4/core";
import { describeMatrix } from "./matrix.js";

describeMatrix("Duration", (zj, z) => {
    it("should allow ISO duration value", () => {
        const schema = zj.duration();
        const duration = Duration.ofMinutes(10);
        const result = schema.parse("PT10M");
        assert(result.equals(duration));
    });

    it("should report invalid duration", () => {
        const schema = zj.duration();
        assert.throws(() => schema.parse("foo"));
    });

    it("should report invalid type", () => {
        const schema = zj.duration();
        assert.throws(() => schema.parse(1));
    });

    it("should allow error override", () => {
        const schema = zj.duration({ error: "whoops" });
        const result = schema.safeParse("a");
        assert(!result.success);
        assert.partialDeepStrictEqual(result.error.issues[0].message, "whoops");
    });

    it("should create a standard JSON schema", () => {
        const schema = zj.duration();
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "duration",
            example: "PT1H",
        });
    });

    it("should preserve JSON schema over refine", () => {
        const schema = zj.duration().check(z.refine(() => true));
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "duration",
            example: "PT1H",
        });
    });
});
