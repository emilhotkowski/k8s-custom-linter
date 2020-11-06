import chalk from 'chalk';
import { Result } from '../rules/result'
import { Severity } from '../rules/severity';
import { ValidationReport } from './validationReport';

export class Reporter {

    createReports(results: Result[]): ValidationReport[] {
        return results.map(result => this.createReport(result))
    }

    private createReport(result: Result): ValidationReport {
        const fileInfo = this.createFileInfo(result)
        const validationInfo = this.createValidationInfo(result)
        const validationResultsInfo = this.createValidationResultsInfo(result)

        return {
            fileInfo,
            validationInfo,
            validationResultsInfo
        }
    }

    private createFileInfo(result: Result): string {
        return "Validation of file " + chalk.bold(result.fileName)
    }

    private createValidationInfo(result: Result): string {
        let info = result.invalidRules.length !== 0 ? chalk.bold.red("[FAIL] ") : chalk.bold.green("[SUCCESS] ")
        info += "Correct validations " + result.validRules + "/" + result.numberOfRules
        return info
    }

    private createValidationResultsInfo(result: Result): string[] {
        const info: string[] = []
        for (const ruleResult of result.invalidRules) {
            switch (ruleResult.severity) {
                case Severity.INFO: {
                    info.push(chalk.bold("INFO") + " - " + ruleResult.messageOnFail)
                    break
                }
                case Severity.WARNING: {
                    info.push(chalk.bold.yellowBright("WARNING") + " - " + ruleResult.messageOnFail)
                    break
                }
                case Severity.CRITICAL: {
                    info.push(chalk.bold.redBright("CRITICAL") + " - " + ruleResult.messageOnFail)
                    break
                }
            }
        }
        return info
    }

}