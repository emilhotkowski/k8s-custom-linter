import { YamlFile } from "../parser/yamlFile";
import { ImageNameRule } from "./customRules/imageNameRule";
import { Result } from "./result";
import { Rule } from "./rule";

export class RuleResolver {
    #rules: Rule[] = [
        new ImageNameRule(process.env.REPOSITORY_NAME!)
    ]

    resolveRules(yamlFiles: YamlFile[]): Result[] {
        const results: Result[] = []
        for (const yamlFile of yamlFiles) {
            results.push(
                this.applyRule(yamlFile)
            )
        }

        return results
    }

    private applyRule(yamlFile: YamlFile): Result {
        let validRules = 0;
        const invalidRules: Rule[] = []
        for (const rule of this.#rules) {
            const validationResult = rule.validate(yamlFile.yamlObject)
            if (validationResult) {
                validRules++
            } else {
                invalidRules.push(rule)
            }
        }

        return {
            numberOfRules: this.#rules.length,
            validRules,
            invalidRules,
            fileName: yamlFile.fileName
        }
    }

}