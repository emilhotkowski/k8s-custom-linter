import chalk from "chalk"
import { mainModule } from "process"
import { YamlParser } from "./parser/yamlParser"
import { Reporter } from "./report/reporter"
import { RuleResolver } from "./rules/ruleResolver"

const folderPath = process.argv[2]


// for a moment
process.env.REPOSITORY_NAME = "wrong"

class App {
    yamlParser = new YamlParser()
    ruleResolver = new RuleResolver()
    reporter = new Reporter()

    async main() {
        console.log("\n\n" + chalk.bold("***** Validation report *****"))
        const results = await this.yamlParser.parseYamlFiles(folderPath)
            .then(files => this.ruleResolver.resolveRules(files))
        const reports = this.reporter.createReports(results)

        for(const report of reports) {
            if(report) {
                console.log("")
                console.log(report.fileInfo)
                console.log(report.validationInfo)
                report.validationResultsInfo.forEach(info => console.log("\t" + info))
            }
        }
    }
}

const app = new App()
Promise.resolve(app.main())