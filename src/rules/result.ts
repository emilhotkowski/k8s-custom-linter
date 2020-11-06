import { Rule } from "./rule";

export interface Result {
    numberOfRules: number,
    validRules: number,
    invalidRules: Rule[],
    fileName: string
}