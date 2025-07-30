import { globalRegistry, pipe, string, transform, type ZodMiniType } from "zod/v4/mini";
import {
    type CoreParams,
    durationConfig,
    localDateConfig,
    localDateTimeConfig,
    localTimeConfig,
    type TransformConfig,
    zonedDateTimeConfig,
} from "./core.js";

const createParseConstructor =
    <T, P extends CoreParams>({
        parse,
        invalidMessage,
        schemaFormat,
        example,
    }: TransformConfig<T, P>) =>
    (params?: P): ZodMiniType<T, T | string> => {
        const inputSchema = string().register(globalRegistry, { example: example(params) });
        inputSchema._zod.toJSONSchema = () => ({
            format: schemaFormat,
            type: "string",
        });

        return pipe(
            inputSchema,
            transform((value, context) => {
                try {
                    return parse(value, params);
                } catch {
                    context.issues.push({
                        code: "custom",
                        message: params?.error ?? invalidMessage,
                        input: context.value,
                    });

                    return undefined as never;
                }
            }),
        );
    };

export const duration = createParseConstructor(durationConfig);
export const localDate = createParseConstructor(localDateConfig);
export const localDateTime = createParseConstructor(localDateTimeConfig);
export const localTime = createParseConstructor(localTimeConfig);
export const zonedDateTime = createParseConstructor(zonedDateTimeConfig);

export const zj = {
    duration,
    localDate,
    localDateTime,
    localTime,
    zonedDateTime,
};

export default zj;
