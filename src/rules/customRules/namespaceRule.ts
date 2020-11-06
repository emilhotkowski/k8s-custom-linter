import { Rule } from "../rule"
import { Severity } from "../severity"

export class NamespaceRule implements Rule  {

    constructor(private namespace: string) {}

    severity = Severity.CRITICAL
    messageOnFail = "Namespace should be equal to current branch name : " + this.namespace
    validate(yaml: any): boolean {
        if(yaml.kind === "Pod") {
            if(yaml.metadata.namespace && yaml.metadata.namespace !== this.namespace) {
                return false
            }
        }
        return true
    }

}