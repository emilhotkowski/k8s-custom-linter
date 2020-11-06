import { Rule } from "../rule";
import { Severity } from "../severity";

export class ImageNameRule implements Rule {

    constructor(private repositoryName: string) {}

    severity = Severity.WARNING
    messageOnFail = "Image name should start with : " + this.repositoryName
    validate(yaml: any): boolean {
        if(yaml.kind === "Pod") {
            for(const container of yaml.spec.containers) {
                const containerName : string = container.image
                if(!containerName.startsWith(this.repositoryName)) {
                    return false
                }
            }
        }
        return true
    }

}