import assert from "node:assert/strict";
import { it } from "node:test";
import { Duration } from "@js-joda/core";
import { describeMatrix } from "./matrix.js";

describeMatrix("Duration", (zj) => {
    it("should allow Duration value", () => {
        const schema = zj.duration();
        const duration = Duration.ofMinutes(10);
        const result = schema.parse(duration);
        assert.equal(result, duration);
    });

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
        const result = schema.safeParse(1);
        assert(!result.success);
        assert.deepEqual(result.error.issues[0].message, "whoops");
    });

    it("should create a standard JSON schema", () => {
        const schema = zj.duration();
        const jsonSchema = schema._zod.toJSONSchema?.();
        assert.deepEqual(jsonSchema, {
            type: "string",
            format: "duration",
            example: "PT1H",
        });
    });
});
