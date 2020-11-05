import { ImageNameRule } from "../../../src/rules/customRules/imageNameRule"

import { properYamlObject } from '../../__setupTests__'

describe("Testing if images have repository names at the beginning", () => {
    const imageNameRule = new ImageNameRule("testrepo")

    test("Proper repository name", () => {
        const result = imageNameRule.validate(properYamlObject)

        expect(result).toBeTruthy()
    })

})