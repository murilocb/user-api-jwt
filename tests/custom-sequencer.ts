const TestSequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends TestSequencer {
  constructor() {
    super();
    this.testFiles = [
      'swapiController.test.ts',
      'userController.test.ts',
    ];
  }

  sort(tests) {
    const orderedTests = this.testFiles
      .map((file) => tests.find((test) => test.path.endsWith(file)))
      .filter((test) => test !== undefined);

    const remainingTests = tests.filter(
      (test) => !orderedTests.includes(test)
    );

    return [...orderedTests, ...remainingTests];
  }
}

module.exports = CustomSequencer;