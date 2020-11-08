import { Document } from "yaml";

export interface YamlFile {
    filePath: string,
    yamlObject?: any
    ioError?: Error
}