import fs from 'fs'
import YAML from 'yaml'
import { YamlFile } from './yamlFile'

export class YamlParser {

    async parseYamlFiles(folderPath: string): Promise<Promise<YamlFile>[]> {
        const folder = await fs.promises.readdir(folderPath, { withFileTypes: true })

        return folder.filter(file => file.isFile() && file.name.endsWith('.yaml'))
            .map(file => this.parseYamlFile(folderPath + "/" + file.name))
    }

    async parseYamlFile(filePath: string): Promise<YamlFile> {
        return fs.promises.readFile(filePath)
            .then(yamlFile => {
                try {
                    return {
                        filePath,
                        yamlObject: YAML.parse(yamlFile.toString('utf-8'))
                    }
                } catch (e) {
                    return { filePath, ioError: e }
                }
            }).catch(e => {
                return { filePath, ioError: e }
            })
    }

}