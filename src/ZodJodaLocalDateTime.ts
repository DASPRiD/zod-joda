import {DateTimeFormatter, LocalDateTime} from '@js-joda/core';
import {INVALID, OK, ParseContext, ParseReturnType, ZodIssueCode, ZodParsedType, ZodType, ZodTypeDef} from 'zod';

const typeName = 'ZodJodaLocalDateTime';

export interface ZodJodaLocalDateTimeDef extends ZodTypeDef
{
    typeName : typeof typeName;
    dateTimeFormatter ?: DateTimeFormatter;
}

export class ZodJodaLocalDateTime extends ZodType<LocalDateTime, ZodJodaLocalDateTimeDef>
{
    public _parse(
        ctx : ParseContext,
        data : string | LocalDateTime,
        parsedType : ZodParsedType
    ) : ParseReturnType<LocalDateTime>
    {
        if (data instanceof LocalDateTime) {
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
            data = LocalDateTime.parse(data, this._def.dateTimeFormatter);
        } catch (e) {
            this.addIssue(ctx, {
                code: ZodIssueCode.custom,
                message: 'Invalid local date time',
            }, {data});

            return INVALID;
        }

        return OK(data);
    }

    public static create(options ?: Omit<ZodJodaLocalDateTimeDef, 'typeName'>) : ZodJodaLocalDateTime
    {
        return new ZodJodaLocalDateTime({typeName, ...options});
    }
}

export const localDateTime = ZodJodaLocalDateTime.create;
