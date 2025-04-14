import assert from "node:assert/strict";
import { it } from "node:test";
import { DateTimeFormatter, LocalTime } from "@js-joda/core";
import { describeMatrix } from "./matrix.js";

describeMatrix("LocalTime", (zj) => {
    it("should allow LocalTime value", () => {
        const schema = zj.localTime();
        const localTime = LocalTime.now();
        const result = schema.parse(localTime);
        assert.equal(result, localTime);
    });

    it("should allow ISO time value", () => {
        const schema = zj.localTime();
        const localTime = LocalTime.of(20, 0, 0);
        const result = schema.parse("20:00:00");
        assert(result.equals(localTime));
    });

    it("should allow custom time value", () => {
        const dateTimeFormatter = DateTimeFormatter.ofPattern("HHmm");
        const schema = zj.localTime({ dateTimeFormatter });
        const localTime = LocalTime.of(20, 0, 0);
        const result = schema.parse("2000");
        assert(result.equals(localTime));
    });

    it("should report invalid time", () => {
        const schema = zj.localTime();
        assert.throws(() => schema.parse("foo"));
    });

    it("should report invalid type", () => {
        const schema = zj.localTime();
        assert.throws(() => schema.parse(1));
    });

    it("should allow error override", () => {
        const schema = zj.localTime({ error: "whoops" });
        const result = schema.safeParse(1);
        assert(!result.success);
        assert.deepEqual(result.error.issues[0].message, "whoops");
    });

    it("should create a standard JSON schema", () => {
        const schema = zj.localTime();
        const jsonSchema = schema._zod.toJSONSchema?.();
        assert.deepEqual(jsonSchema, {
            type: "string",
            format: "time",
            example: "14:00:00",
        });
    });

    it("should create a modified JSON schema", () => {
        const dateTimeFormatter = DateTimeFormatter.ofPattern("HHmm");
        const schema = zj.localTime({ dateTimeFormatter });
        const jsonSchema = schema._zod.toJSONSchema?.();
        assert.deepEqual(jsonSchema, {
            type: "string",
            format: "time",
            example: "1400",
        });
    });
});
