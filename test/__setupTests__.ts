import { readFileSync } from "fs";
import YAML from "yaml"

export const properYamlObject = YAML.parse(readFileSync('test/resources/proper_yaml.yaml').toString('utf-8'))
export const exampleYamlObject = YAML.parse(readFileSync('test/resources/example.yaml').toString('utf-8'))
export const namespaceYamlObject = YAML.parse(readFileSync('test/resources/namespace_pod.yaml').toString('utf-8'))