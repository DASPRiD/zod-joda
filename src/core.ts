import {
    DateTimeFormatter,
    Duration,
    LocalDate,
    LocalDateTime,
    LocalTime,
    ZoneId,
    ZonedDateTime,
} from "@js-joda/core";

export type CoreParams = {
    error?: string;
};

export type TransformConstructorConfig<T, P extends CoreParams> = {
    isInstance: (input: unknown) => input is T;
    parse: (input: string, params?: P) => T;
    invalidMessage: string;
    schemaFormat: string;
    example: (params?: P) => string;
};

export type TemporalParams = CoreParams & {
    dateTimeFormatter?: DateTimeFormatter;
};

export const durationConfig: TransformConstructorConfig<Duration, CoreParams> = {
    isInstance: (input) => input instanceof Duration,
    parse: (input) => Duration.parse(input),
    invalidMessage: "Invalid duration",
    schemaFormat: "duration",
    example: () => "PT1H",
};

export const localDateConfig: TransformConstructorConfig<LocalDate, TemporalParams> = {
    isInstance: (input) => input instanceof LocalDate,
    parse: (input, params) => LocalDate.parse(input, params?.dateTimeFormatter),
    invalidMessage: "Invalid local date",
    schemaFormat: "date",
    example: (params) =>
        LocalDate.of(2020, 1, 1).format(
            params?.dateTimeFormatter ?? DateTimeFormatter.ISO_LOCAL_DATE,
        ),
};

export const localDateTimeConfig: TransformConstructorConfig<LocalDateTime, TemporalParams> = {
    isInstance: (input) => input instanceof LocalDateTime,
    parse: (input, params) => LocalDateTime.parse(input, params?.dateTimeFormatter),
    invalidMessage: "Invalid local date time",
    schemaFormat: "local-date-time",
    example: (params) =>
        LocalDateTime.of(2020, 1, 1, 14, 0, 0, 0).format(
            params?.dateTimeFormatter ?? DateTimeFormatter.ISO_LOCAL_DATE_TIME,
        ),
};

export const localTimeConfig: TransformConstructorConfig<LocalTime, TemporalParams> = {
    isInstance: (input) => input instanceof LocalTime,
    parse: (input, params) => LocalTime.parse(input, params?.dateTimeFormatter),
    invalidMessage: "Invalid local time",
    schemaFormat: "time",
    example: (params) =>
        LocalTime.of(14, 0, 0, 0).format(
            params?.dateTimeFormatter ?? DateTimeFormatter.ISO_LOCAL_TIME,
        ),
};

export const zonedDateTimeConfig: TransformConstructorConfig<ZonedDateTime, TemporalParams> = {
    isInstance: (input) => input instanceof ZonedDateTime,
    parse: (input, params) => ZonedDateTime.parse(input, params?.dateTimeFormatter),
    invalidMessage: "Invalid zoned date time",
    schemaFormat: "date-time",
    example: (params) =>
        ZonedDateTime.of(2020, 1, 1, 14, 0, 0, 0, ZoneId.UTC).format(
            params?.dateTimeFormatter ?? DateTimeFormatter.ISO_OFFSET_DATE_TIME,
        ),
};
