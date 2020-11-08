import { YamlFile } from "../parser/yamlFile";
import { ImageNameRule } from "./customRules/imageNameRule";
import { NamespaceRule } from "./customRules/namespaceRule";
import { Result } from "./result";
import { Rule } from "./rule";

export class RuleResolver {
    #rules: Rule[] = [
        new ImageNameRule(process.env.REPOSITORY_NAME!),
        new NamespaceRule(process.env.NAMESPACE!)
    ]

    resolveRules(yamlFiles: Promise<YamlFile>[]): Promise<Result>[] {
        return yamlFiles.map(filePromise => filePromise.then(yamlFile => this.applyRule(yamlFile)))
    }

    private applyRule(yamlFile: YamlFile): Result {
        if (yamlFile.ioError) {
            return this.getErrorResult(yamlFile)
        }

        const invalidRules = this.#rules.filter(rule => !rule.validate(yamlFile.yamlObject))

        return {
            numberOfRules: this.#rules.length,
            validRules: this.#rules.length - invalidRules.length,
            invalidRules,
            filePath: yamlFile.filePath
        }
    }

    private getErrorResult(yamlFile: YamlFile) : Result {
        return {
            errorMessage: yamlFile.ioError!.message,
            numberOfRules: this.#rules.length,
            validRules: 0,
            invalidRules: [],
            filePath: yamlFile.filePath
        }
    }
}