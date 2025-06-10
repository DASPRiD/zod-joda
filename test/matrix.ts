import { describe } from "node:test";
import { z as zFull } from "zod/v4";
import { z as zMini } from "zod/v4/mini";
import { zj as zjFull } from "../src/index.js";
import { zj as zjMini } from "../src/mini.js";

const matrix = [
    ["zod", zjFull, zFull],
    ["@zod/mini", zjMini, zMini],
] as const;

export const describeMatrix = (
    name: string,
    runner: (zj: typeof zjFull | typeof zjMini, z: typeof zFull | typeof zMini) => void,
) => {
    describe(name, () => {
        for (const [subName, zj, z] of matrix) {
            describe(subName, () => {
                runner(zj, z);
            });
        }
    });
};
