module.exports = {
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    testRegex: "./test/[A-Za-z].*.ts$",
    setupFilesAfterEnv: [
      "./test/__setupTests__.ts"
    ]
  };