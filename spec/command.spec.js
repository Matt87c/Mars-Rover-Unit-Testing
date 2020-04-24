const assert = require("assert");
const Command = require("../command.js");

describe("Command class", function () {
  // test 1
  it("throws error if command type is NOT passed into constructor as the first parameter", function () {
    assert.throws(
      function () {
        new Command();
      },
      {
        message: "Command type required.",
      }
    );
  });

  // test 2
  it("constructor sets command type", function () {
    const INPUT_COMMAND_TYPE = "MOVE";
    const CommandInstance = new Command(INPUT_COMMAND_TYPE);
    expect(CommandInstance.commandType).toEqual(INPUT_COMMAND_TYPE);
  });

  // test 3
  it("constructor sets a value passed in as the 2nd argument", function () {
    const INPUT_COMMAND_TYPE = "MOVE";
    const INPUT_VALUE = 300;
    const CommandInstance = new Command(INPUT_COMMAND_TYPE, INPUT_VALUE);
    expect(CommandInstance.value).toEqual(INPUT_VALUE);
  });
});
