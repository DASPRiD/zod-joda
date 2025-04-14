import assert from "node:assert/strict";
import { it } from "node:test";
import { DateTimeFormatter, LocalDateTime } from "@js-joda/core";
import { describeMatrix } from "./matrix.js";

describeMatrix("LocalDateTime", (zj) => {
    it("should allow LocalDateTime value", () => {
        const schema = zj.localDateTime();
        const localDateTime = LocalDateTime.now();
        const result = schema.parse(localDateTime);
        assert.equal(result, localDateTime);
    });

    it("should allow ISO date value", () => {
        const schema = zj.localDateTime();
        const localDateTime = LocalDateTime.of(2021, 1, 1, 20, 0, 0);
        const result = schema.parse("2021-01-01T20:00:00");
        assert(result.equals(localDateTime));
    });

    it("should allow custom date value", () => {
        const dateTimeFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HHmm");
        const schema = zj.localDateTime({ dateTimeFormatter });
        const localDateTime = LocalDateTime.of(2021, 1, 1, 20, 0, 0);
        const result = schema.parse("01.01.2021 2000");
        assert(result.equals(localDateTime));
    });

    it("should report invalid date", () => {
        const schema = zj.localDateTime();
        assert.throws(() => schema.parse("foo"));
    });

    it("should report invalid type", () => {
        const schema = zj.localDateTime();
        assert.throws(() => schema.parse(1));
    });

    it("should allow error override", () => {
        const schema = zj.localDateTime({ error: "whoops" });
        const result = schema.safeParse(1);
        assert(!result.success);
        assert.deepEqual(result.error.issues[0].message, "whoops");
    });

    it("should create a standard JSON schema", () => {
        const schema = zj.localDateTime();
        const jsonSchema = schema._zod.toJSONSchema?.();
        assert.deepEqual(jsonSchema, {
            type: "string",
            format: "local-date-time",
            example: "2020-01-01T14:00:00",
        });
    });

    it("should create a modified JSON schema", () => {
        const dateTimeFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HHmm");
        const schema = zj.localDateTime({ dateTimeFormatter });
        const jsonSchema = schema._zod.toJSONSchema?.();
        assert.deepEqual(jsonSchema, {
            type: "string",
            format: "local-date-time",
            example: "01.01.2020 1400",
        });
    });
});
