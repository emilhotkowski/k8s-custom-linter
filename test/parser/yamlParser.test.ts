import { fail } from "assert";
import { YamlParser } from "../../src/parser/yamlParser";

describe('Single yaml file parsing', () => {
    const yamlParser = new YamlParser()

    test('Proper yaml parsing', async () => {
        const result = await yamlParser.parseYamlFile('test/resources/proper_yaml.yaml')

        expect(result).not.toBeNull()
        if (result) {
            expect(result.yamlObject).toStrictEqual({
                apiVersion: "v1",
                kind: "Pod",
                metadata: {
                    name: "static-web",
                    labels: {
                        role: "myrole"
                    }
                },
                spec: {
                    containers: [{
                        name: "web",
                        image: "testrepo/nginx",
                        ports: [{
                            name: "web",
                            containerPort: 80,
                            protocol: "TCP"
                        }]
                    }]
                }
            })
        }
    });

    test('Bad yaml file parsing', async () => {
        yamlParser.parseYamlFile('test/resources/bad_yaml.yaml')
            .then(file => fail())
            .catch(e => expect(e).not.toBeNull())
    });

    test('Not existing yaml file parsing', async () => {
        yamlParser.parseYamlFile('test/resources/nonexisting.yaml')
            .then(file => fail())
            .catch(e => expect(e).not.toBeNull())
    });
})

describe('Whole folder yaml file parsing', () => {
    const yamlParser = new YamlParser()

    test('Whole folder yaml parsing', async () => {
        const result = await yamlParser.parseYamlFiles('test/resources')

        const resultsOfPromises = []
        for (const filePromise of result) {
            try {
                const file = await filePromise;
                if (file) {
                    resultsOfPromises.push(file);
                }
            } catch (e) {
                // ignore errors
            }
        }

        expect(resultsOfPromises.length).toBeGreaterThan(0)
    });
})