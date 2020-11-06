
import fs from 'fs'
import YAML from 'yaml'
import { YamlFile } from './yamlFile'

export class YamlParser {

    async parseYamlFiles(folderPath: string): Promise<YamlFile[]> {
        const folder = await fs.promises.readdir(folderPath, { withFileTypes: true })

        return Promise.all(folder.filter(file => file.isFile() && file.name.endsWith('.yaml'))
            .map(file => this.parseYamlFile(folderPath + "/" + file.name)))
            .then(vals => vals.filter(val => val) as YamlFile[])
    }

    async parseYamlFile(filePath: string): Promise<YamlFile | null> {
        return fs.promises.readFile(filePath)
            .then(yamlFile => {
                const result = {
                    fileName: filePath,
                    yamlObject: YAML.parse(yamlFile.toString('utf-8'))
                }
                if (result.yamlObject.errors) {
                    console.error(`Cannot parse YAML file ${filePath}`)
                    return null
                }
                return result
            }).catch(e => {
                console.error(`Cannot read file ${filePath} `, e.name)
                return null
            })
    }

}