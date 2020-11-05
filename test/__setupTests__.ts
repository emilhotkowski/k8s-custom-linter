import { readFileSync } from "fs";
import YAML from "yaml"

export const properYamlObject = YAML.parse(readFileSync('test/resources/proper_yaml.yaml').toString('utf-8'))