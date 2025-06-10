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

export type TransformConfig<T, P extends CoreParams> = {
    parse: (input: string, params?: P) => T;
    invalidMessage: string;
    schemaFormat: string;
    example: (params?: P) => string;
};

export type TemporalParams = CoreParams & {
    dateTimeFormatter?: DateTimeFormatter;
};

export const durationConfig: TransformConfig<Duration, CoreParams> = {
    parse: (input) => Duration.parse(input),
    invalidMessage: "Invalid duration",
    schemaFormat: "duration",
    example: () => "PT1H",
};

export const localDateConfig: TransformConfig<LocalDate, TemporalParams> = {
    parse: (input, params) => LocalDate.parse(input, params?.dateTimeFormatter),
    invalidMessage: "Invalid local date",
    schemaFormat: "date",
    example: (params) =>
        LocalDate.of(2020, 1, 1).format(
            params?.dateTimeFormatter ?? DateTimeFormatter.ISO_LOCAL_DATE,
        ),
};

export const localDateTimeConfig: TransformConfig<LocalDateTime, TemporalParams> = {
    parse: (input, params) => LocalDateTime.parse(input, params?.dateTimeFormatter),
    invalidMessage: "Invalid local date time",
    schemaFormat: "local-date-time",
    example: (params) =>
        LocalDateTime.of(2020, 1, 1, 14, 0, 0, 0).format(
            params?.dateTimeFormatter ?? DateTimeFormatter.ISO_LOCAL_DATE_TIME,
        ),
};

export const localTimeConfig: TransformConfig<LocalTime, TemporalParams> = {
    parse: (input, params) => LocalTime.parse(input, params?.dateTimeFormatter),
    invalidMessage: "Invalid local time",
    schemaFormat: "time",
    example: (params) =>
        LocalTime.of(14, 0, 0, 0).format(
            params?.dateTimeFormatter ?? DateTimeFormatter.ISO_LOCAL_TIME,
        ),
};

export const zonedDateTimeConfig: TransformConfig<ZonedDateTime, TemporalParams> = {
    parse: (input, params) => ZonedDateTime.parse(input, params?.dateTimeFormatter),
    invalidMessage: "Invalid zoned date time",
    schemaFormat: "date-time",
    example: (params) =>
        ZonedDateTime.of(2020, 1, 1, 14, 0, 0, 0, ZoneId.UTC).format(
            params?.dateTimeFormatter ?? DateTimeFormatter.ISO_OFFSET_DATE_TIME,
        ),
};
