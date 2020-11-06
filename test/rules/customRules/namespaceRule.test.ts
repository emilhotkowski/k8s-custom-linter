import { NamespaceRule } from "../../../src/rules/customRules/namespaceRule"
import { namespaceYamlObject, exampleYamlObject } from "../../__setupTests__"

describe("Testing if namespace of resources has proper value", () => {
    const namespaceRule = new NamespaceRule("development")

    test("Correct namespace", () => {
        const result = namespaceRule.validate(exampleYamlObject)

        expect(result).toBeTruthy()
    })

    test("Incorrect namespace", () => {
        const result = namespaceRule.validate(namespaceYamlObject)

        expect(result).toBeFalsy()
    })
})