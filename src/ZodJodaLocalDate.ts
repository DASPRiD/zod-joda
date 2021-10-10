import {DateTimeFormatter, LocalDate} from '@js-joda/core';
import {INVALID, OK, ParseContext, ParseReturnType, ZodIssueCode, ZodParsedType, ZodType, ZodTypeDef} from 'zod';

const typeName = 'ZodJodaLocalDate';

export interface ZodJodaLocalDateDef extends ZodTypeDef
{
    typeName : typeof typeName;
    dateTimeFormatter ?: DateTimeFormatter;
}

export class ZodJodaLocalDate extends ZodType<LocalDate, ZodJodaLocalDateDef>
{
    public _parse(
        ctx : ParseContext,
        data : string | LocalDate,
        parsedType : ZodParsedType
    ) : ParseReturnType<LocalDate>
    {
        if (data instanceof LocalDate) {
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
            data = LocalDate.parse(data, this._def.dateTimeFormatter);
        } catch (e) {
            this.addIssue(ctx, {
                code: ZodIssueCode.custom,
                message: 'Invalid local date',
            }, {data});

            return INVALID;
        }

        return OK(data);
    }

    public static create(options ?: Omit<ZodJodaLocalDateDef, 'typeName'>) : ZodJodaLocalDate
    {
        return new ZodJodaLocalDate({typeName, ...options});
    }
}

export const localDate = ZodJodaLocalDate.create;
