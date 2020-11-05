import { Severity } from "./severity";

export interface Rule {
    severity: Severity
    messageOnFail: string
    validate(yaml: any): boolean
}