import {DateTimeFormatter, ZonedDateTime} from '@js-joda/core';
import {z} from 'zod';

type Parameters = {
    dateTimeFormatter ?: DateTimeFormatter;
};

export const zonedDateTime = (parameters ?: Parameters) => z.union([
    z.custom<ZonedDateTime>(value => value instanceof ZonedDateTime),
    z.string().refine(
        value => {
            try {
                ZonedDateTime.parse(value, parameters?.dateTimeFormatter);
                return true;
            } catch {
                return false;
            }
        }, 'Invalid zoned date time'
    ).transform(value => ZonedDateTime.parse(value, parameters?.dateTimeFormatter))
]);
