import { Rule } from "./rule";

export interface Result {
    numberOfRules: number,
    validRules: number,
    invalidRules: Rule[],
    filePath: string,
    errorMessage? : string
}