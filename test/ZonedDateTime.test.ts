import assert from "node:assert/strict";
import { it } from "node:test";
import { DateTimeFormatter, ZonedDateTime, ZoneId } from "@js-joda/core";
import { toJSONSchema } from "zod/v4/core";
import { describeMatrix } from "./matrix.js";

describeMatrix("ZonedDateTime", (zj, z) => {
    it("should allow ISO date value", () => {
        const schema = zj.zonedDateTime();
        const zonedDateTime = ZonedDateTime.of(2021, 1, 1, 20, 0, 0, 0, ZoneId.UTC);
        const result = schema.parse("2021-01-01T20:00:00Z");
        assert(result.equals(zonedDateTime));
    });

    it("should allow custom date value", () => {
        const dateTimeFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HHmm VV");
        const schema = zj.zonedDateTime({ dateTimeFormatter });
        const zonedDateTime = ZonedDateTime.of(2021, 1, 1, 20, 0, 0, 0, ZoneId.UTC);
        const result = schema.parse("01.01.2021 2000 Z");
        assert(result.equals(zonedDateTime));
    });

    it("should report invalid date", () => {
        const schema = zj.zonedDateTime();
        assert.throws(() => schema.parse("foo"));
    });

    it("should report invalid type", () => {
        const schema = zj.zonedDateTime();
        assert.throws(() => schema.parse(1));
    });

    it("should allow error override", () => {
        const schema = zj.zonedDateTime({ error: "whoops" });
        const result = schema.safeParse("a");
        assert(!result.success);
        assert.deepEqual(result.error.issues[0].message, "whoops");
    });

    it("should create a standard JSON schema", () => {
        const schema = zj.zonedDateTime();
        console.debug(schema);
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "date-time",
            example: "2020-01-01T14:00:00Z",
        });
    });

    it("should create a modified JSON schema", () => {
        const dateTimeFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HHmm VV");
        const schema = zj.zonedDateTime({ dateTimeFormatter });
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "date-time",
            example: "01.01.2020 1400 Z",
        });
    });

    it("should preserve JSON schema over refine", () => {
        const schema = zj.zonedDateTime().check(z.refine(() => true));
        const jsonSchema = toJSONSchema(schema, { io: "input" });
        assert.partialDeepStrictEqual(jsonSchema, {
            type: "string",
            format: "date-time",
            example: "2020-01-01T14:00:00Z",
        });
    });
});
