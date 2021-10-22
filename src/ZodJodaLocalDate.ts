import {DateTimeFormatter, LocalDate} from '@js-joda/core';
import {z} from 'zod';

type Parameters = {
    dateTimeFormatter ?: DateTimeFormatter;
};

export const localDate = (parameters ?: Parameters) => z.union([
    z.custom<LocalDate>(value => value instanceof LocalDate),
    z.string().refine(
        value => {
            try {
                LocalDate.parse(value, parameters?.dateTimeFormatter);
                return true;
            } catch {
                return false;
            }
        }, 'Invalid local date'
    ).transform(value => LocalDate.parse(value, parameters?.dateTimeFormatter))
]);
