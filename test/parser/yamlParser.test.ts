import { YamlParser } from "../../src/parser/yamlParser";

describe('Single yaml file parsing', () => {
    const yamlParser = new YamlParser()

    test('Proper yaml parsing', async () => {
        const result = await yamlParser.parseYamlFile('test/resources/proper_yaml.yaml')

        expect(result).toStrictEqual({
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
    });

    test('Bad yaml file parsing', async () => {
        const result = await yamlParser.parseYamlFile('test/resources/bad_yaml.yaml')

        expect(result).toBeUndefined()
    });

    test('Not existing yaml file parsing', async () => {
        const result = await yamlParser.parseYamlFile('test/resources/nonexisting.yaml')

        expect(result).toBeUndefined()
    });
})

describe('Whole folder yaml file parsing', () => {
    const yamlParser = new YamlParser()

    test('Whole folder yaml parsing', async () => {
        const result = await yamlParser.parseYamlFiles('test/resources')

        const resultsOfPromises = []
        for(const filePromise of result) {
            const file = await filePromise;
            if(file) {
                resultsOfPromises.push(file);
            }
        }

        expect(resultsOfPromises.length).toBeGreaterThan(0)
    });
})