module.exports = {
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    setupFilesAfterEnv: [
      "./test/__setupTests__.ts"
    ]
  };