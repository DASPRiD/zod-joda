import {DateTimeFormatter, LocalTime} from '@js-joda/core';
import {z} from 'zod';

type Parameters = {
    dateTimeFormatter ?: DateTimeFormatter;
};

export const localTime = (parameters ?: Parameters) => z.union([
    z.custom<LocalTime>(value => value instanceof LocalTime),
    z.string().refine(
        value => {
            try {
                LocalTime.parse(value, parameters?.dateTimeFormatter);
                return true;
            } catch {
                return false;
            }
        }, 'Invalid local time'
    ).transform(value => LocalTime.parse(value, parameters?.dateTimeFormatter))
]);
