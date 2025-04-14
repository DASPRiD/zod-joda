import assert from "node:assert/strict";
import { it } from "node:test";
import { DateTimeFormatter, LocalDate } from "@js-joda/core";
import { describeMatrix } from "./matrix.js";

describeMatrix("LocalDate", (zj) => {
    it("should allow LocalDate value", () => {
        const schema = zj.localDate();
        const localDate = LocalDate.now();
        const result = schema.parse(localDate);
        assert.equal(result, localDate);
    });

    it("should allow ISO date value", () => {
        const schema = zj.localDate();
        const localDate = LocalDate.of(2021, 1, 1);
        const result = schema.parse("2021-01-01");
        assert(result.equals(localDate));
    });

    it("should allow custom date value", () => {
        const dateTimeFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        const schema = zj.localDate({ dateTimeFormatter });
        const localDate = LocalDate.of(2021, 1, 1);
        const result = schema.parse("01.01.2021");
        assert(result.equals(localDate));
    });

    it("should report invalid date", () => {
        const schema = zj.localDate();
        assert.throws(() => schema.parse("foo"));
    });

    it("should report invalid type", () => {
        const schema = zj.localDate();
        assert.throws(() => schema.parse(1));
    });

    it("should allow error override", () => {
        const schema = zj.localDate({ error: "whoops" });
        const result = schema.safeParse(1);
        assert(!result.success);
        assert.deepEqual(result.error.issues[0].message, "whoops");
    });

    it("should create a standard JSON schema", () => {
        const schema = zj.localDate();
        const jsonSchema = schema._zod.toJSONSchema?.();
        assert.deepEqual(jsonSchema, {
            type: "string",
            format: "date",
            example: "2020-01-01",
        });
    });

    it("should create a modified JSON schema", () => {
        const dateTimeFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        const schema = zj.localDate({ dateTimeFormatter });
        const jsonSchema = schema._zod.toJSONSchema?.();
        assert.deepEqual(jsonSchema, {
            type: "string",
            format: "date",
            example: "01.01.2020",
        });
    });
});
