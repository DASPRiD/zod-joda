import { describe } from "node:test";
import { zj as zjFull } from "../src/index.js";
import { zj as zjMini } from "../src/mini.js";

const matrix = [
    ["zod", zjFull],
    ["@zod/mini", zjMini],
] as const;

export const describeMatrix = (
    name: string,
    runner: (zj: typeof zjFull | typeof zjMini) => void,
) => {
    describe(name, () => {
        for (const [subName, zj] of matrix) {
            describe(subName, () => {
                runner(zj);
            });
        }
    });
};
