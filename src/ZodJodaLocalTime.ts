import {DateTimeFormatter, LocalTime} from '@js-joda/core';
import {INVALID, OK, ParseContext, ParseReturnType, ZodIssueCode, ZodParsedType, ZodType, ZodTypeDef} from 'zod';

const typeName = 'ZodJodaLocalTime';

export interface ZodJodaLocalTimeDef extends ZodTypeDef
{
    typeName : typeof typeName;
    dateTimeFormatter ?: DateTimeFormatter;
}

export class ZodJodaLocalTime extends ZodType<LocalTime, ZodJodaLocalTimeDef>
{
    public _parse(
        ctx : ParseContext,
        data : string | LocalTime,
        parsedType : ZodParsedType
    ) : ParseReturnType<LocalTime>
    {
        if (data instanceof LocalTime) {
            return OK(data);
        }

        if (parsedType !== ZodParsedType.string) {
            ctx.addIssue(data, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.string,
                received: parsedType,
            });

            return INVALID;
        }

        try {
            data = LocalTime.parse(data, this._def.dateTimeFormatter);
        } catch (e) {
            ctx.addIssue(data, {
                code: ZodIssueCode.custom,
                message: 'Invalid local time',
            });

            return INVALID;
        }

        return OK(data);
    }

    public static create(options ?: Omit<ZodJodaLocalTimeDef, 'typeName'>) : ZodJodaLocalTime
    {
        return new ZodJodaLocalTime({typeName, ...options});
    }
}

export const localTime = ZodJodaLocalTime.create;
