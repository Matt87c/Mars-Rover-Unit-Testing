const Command = require("../command.js");
const assert = require("assert");
const Message = require("../message.js");

describe("Message class", function () {
  it("throws error if name is NOT passed into constructor as the first parameter", function () {
    assert.throws(
      function () {
        new Message();
      },
      {
        message: "Message type required.",
      }
    );
  });
});

//test 5
it("constructor sets name", function () {
  const messageInstance = new Message("name", []);
  expect(messageInstance.name).toEqual("name");
});

//test 6
it("contains a commands array passed into the constructor as 2nd argument", function () {
  const commands = [
    new Command("MODE_CHANGE", "LOW_POWER"),
    new Command("STATUS_CHECK"),
  ];
  const messageInstance = new Message("name", commands);
  expect(messageInstance.commands).toEqual(commands);
});
