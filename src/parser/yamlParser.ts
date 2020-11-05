
import fs from 'fs'
import YAML from 'yaml'

export class YamlParser {

    public async parseYamlFiles(folderPath: string) : Promise<Promise<object>[]> {
        const folder = await fs.promises.readdir(folderPath, { withFileTypes: true })

        return folder.filter(file => file.isFile() && file.name.endsWith('.yaml'))
            .map(file => this.parseYamlFile(folderPath + "/" + file.name))
    }

    public async parseYamlFile(filePath: string) : Promise<object> {
        return fs.promises.readFile(filePath)
            .then(yamlFile => YAML.parse(yamlFile.toString('utf-8')))
            .catch(e => console.error(`Cannot load rule : ${filePath} with error ${e}`))
    }

}