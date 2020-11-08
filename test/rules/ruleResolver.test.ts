import { RuleResolver } from "../../src/rules/ruleResolver"
import { properYamlObject } from "../__setupTests__"

describe("Rule resolver tests", () => {

    test("Valid yaml according to rules", async () => {
        process.env.REPOSITORY_NAME = "testrepo"
        const objectUnderTest = new RuleResolver()

        const result = await objectUnderTest.resolveRules([
            Promise.resolve({
                filePath: "proper_yaml.yaml",
                yamlObject: properYamlObject
            })
        ])[0]

        expect(result.errorMessage).toBeUndefined()
        expect(result.filePath).not.toBeUndefined()
        expect(result.numberOfRules).toBeGreaterThan(0)
        expect(result.validRules).toEqual(result.numberOfRules)
        expect(result.invalidRules.length).toEqual(0)

    })

    test("Invalid yaml according to rules", async () => {
        process.env.REPOSITORY_NAME = "somedifferentreponame"
        const objectUnderTest = new RuleResolver()

        const result =  await objectUnderTest.resolveRules([
            Promise.resolve({
                filePath: "proper_yaml.yaml",
                yamlObject: properYamlObject
            })
        ])[0]


        expect(result.filePath).not.toBeUndefined()
        expect(result.numberOfRules).toBeGreaterThan(0)
        expect(result.invalidRules.length).toBeGreaterThan(0)

    })

})