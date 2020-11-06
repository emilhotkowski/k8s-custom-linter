import { RuleResolver } from "../../src/rules/ruleResolver"
import { properYamlObject } from "../__setupTests__"

describe("Rule resolver tests", () => {

    test("Valid yaml according to rules", () => {
        process.env.REPOSITORY_NAME = "testrepo"
        const objectUnderTest = new RuleResolver()

        const result = objectUnderTest.resolveRules([
            {
                fileName: "proper_yaml.yaml",
                yamlObject: properYamlObject
            }
        ])[0]

        expect(result.fileName).not.toBeUndefined()
        expect(result.numberOfRules).toBeGreaterThan(0)
        expect(result.invalidRules.length).toEqual(0)
        expect(result.validRules).toBeGreaterThan(0)

    })

    test("Invalid yaml according to rules", () => {
        process.env.REPOSITORY_NAME = "somedifferentreponame"
        const objectUnderTest = new RuleResolver()

        const result =  objectUnderTest.resolveRules([
            {
                fileName: "proper_yaml.yaml",
                yamlObject: properYamlObject
            }
        ])[0]


        expect(result.fileName).not.toBeUndefined()
        expect(result.numberOfRules).toBeGreaterThan(0)
        expect(result.invalidRules.length).toBeGreaterThan(0)

    })

})