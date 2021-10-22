import {DateTimeFormatter, LocalDateTime} from '@js-joda/core';
import {z} from 'zod';

type Parameters = {
    dateTimeFormatter ?: DateTimeFormatter;
};

export const localDateTime = (parameters ?: Parameters) => z.union([
    z.custom<LocalDateTime>(value => value instanceof LocalDateTime),
    z.string().refine(
        value => {
            try {
                LocalDateTime.parse(value, parameters?.dateTimeFormatter);
                return true;
            } catch {
                return false;
            }
        }, 'Invalid local date time'
    ).transform(value => LocalDateTime.parse(value, parameters?.dateTimeFormatter))
]);
