import {DateTimeFormatter, ZonedDateTime} from '@js-joda/core';
import {INVALID, OK, ParseContext, ParseReturnType, ZodIssueCode, ZodParsedType, ZodType, ZodTypeDef} from 'zod';

const typeName = 'ZodJodaZonedDateTime';

export interface ZodJodaZonedDateTimeDef extends ZodTypeDef
{
    typeName : typeof typeName;
    dateTimeFormatter ?: DateTimeFormatter;
}

export class ZodJodaZonedDateTime extends ZodType<ZonedDateTime, ZodJodaZonedDateTimeDef>
{
    public _parse(
        ctx : ParseContext,
        data : string | ZonedDateTime,
        parsedType : ZodParsedType
    ) : ParseReturnType<ZonedDateTime>
    {
        if (data instanceof ZonedDateTime) {
            return OK(data);
        }

        if (parsedType !== ZodParsedType.string) {
            this.addIssue(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.string,
                received: parsedType,
            }, {data});

            return INVALID;
        }

        try {
            data = ZonedDateTime.parse(data, this._def.dateTimeFormatter);
        } catch (e) {
            this.addIssue(ctx, {
                code: ZodIssueCode.custom,
                message: 'Invalid zoned date time',
            }, {data});

            return INVALID;
        }

        return OK(data);
    }

    public static create(options ?: Omit<ZodJodaZonedDateTimeDef, 'typeName'>) : ZodJodaZonedDateTime
    {
        return new ZodJodaZonedDateTime({typeName, ...options});
    }
}

export const zonedDateTime = ZodJodaZonedDateTime.create;
