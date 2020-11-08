import chalk from 'chalk';
import { Result } from '../rules/result'
import { Severity } from '../rules/severity';
import { ValidationReport } from './validationReport';

export class Reporter {

    createReports(results: Promise<Result>[]): Promise<ValidationReport>[] {
        return results.map(promiseResult => promiseResult.then(result => this.createReport(result)))
    }

    private async createReport(result: Result): Promise<ValidationReport> {
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
        return "Validation of file " + chalk.bold(result.filePath)
    }

    private createValidationInfo(result: Result): string {
        if (result.errorMessage) {
            return this.createErrorInfo(result)
        }
        let info = result.invalidRules.length !== 0 || result.errorMessage ? chalk.bold.red("[FAIL] ") : chalk.bold.green("[SUCCESS] ")
        info += "Correct validations " + result.validRules + "/" + result.numberOfRules
        return info
    }

    private createValidationResultsInfo(result: Result): string[] {
        if (!result.errorMessage) {
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
        return []
    }

    private createErrorInfo(result: Result): string {
        return chalk.bold.red("[ERROR] ") + "An error occured while processing file " + chalk.bold(result.filePath) + "\n" +
        "Error message : " + chalk.bold(result.errorMessage!)
    }

}