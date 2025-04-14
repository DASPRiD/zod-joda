import { type ZodMiniType, transform } from "@zod/mini";
import {
    type CoreParams,
    type TransformConstructorConfig,
    durationConfig,
    localDateConfig,
    localDateTimeConfig,
    localTimeConfig,
    zonedDateTimeConfig,
} from "./core.js";

const createParseConstructor =
    <T, P extends CoreParams>({
        isInstance,
        parse,
        invalidMessage,
        schemaFormat,
        example,
    }: TransformConstructorConfig<T, P>) =>
    (params?: P): ZodMiniType<T, T | string> => {
        const instance = transform<T | string, T>((input: unknown, context) => {
            if (isInstance(input)) {
                return input;
            }

            if (typeof input === "string") {
                try {
                    return parse(input, params);
                } catch {
                    // Noop
                }
            }

            context.issues.push({
                code: "custom",
                message: params?.error ?? invalidMessage,
                input: context.value,
            });

            return undefined as never;
        });

        instance._zod.toJSONSchema = () => ({
            type: "string",
            format: schemaFormat,
            example: example(params),
        });

        return instance;
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
