const assert = require("assert");
const Rover = require("../rover.js");
const Command = require("../command.js");
const Message = require("../message.js");

describe("Rover class", function () {
  //test 7
  it("constructor sets position and default values for mode and generatorWatts", function () {
    const roverInstance = new Rover(999);
    expect(roverInstance.position).toEqual(999);
    expect(roverInstance.mode).toEqual("NORMAL");
    expect(roverInstance.generatorWatts).toEqual(110);
  });

  //Test 8
  it("response returned by receiveMessage contains name of message", function () {
    const roverInstance = new Rover(999);
    const commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    const messageInstance = new Message("Message with one command", commands);
    let response = roverInstance.recieveMessage(messageInstance);
    expect(response.message).toEqual(messageInstance.name);
  });

  //Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    const roverInstance = new Rover(999);
    const commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    const messageInstance = new Message("Message with two commands", commands);
    let response = roverInstance.recieveMessage(messageInstance);
    expect(response.results.length).toEqual(2);
  });

  //Test 10
  it("response correctly to status check command", function () {
    const roverInstance = new Rover(999);
    const commands = [new Command("STATUS_CHECK")];
    const messageInstance = new Message("Message with one command", commands);
    let response = roverInstance.recieveMessage(messageInstance);
    expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(999);
  });

  //Test 11
  it("responds correctly to mode change command", function () {
    const roverInstance = new Rover(999);
    const commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    const messageInstance = new Message("Message with mode change", commands);
    let response = roverInstance.recieveMessage(messageInstance);
    assert.deepEqual(roverInstance.mode, "LOW_POWER");
  });

  //Test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function () {
    const roverInstance = new Rover(999);
    const commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("MOVE", 100),
    ];
    const messageInstance = new Message(
      "Message low power position ending",
      commands
    );
    let response = roverInstance.recieveMessage(messageInstance);
    assert.deepEqual(response.results[1], { completed: false });
  });

  //Test 13
  it("responds with position for move command", function () {
    const roverInstance = new Rover(999);
    const commands = [new Command("MOVE", 100)];
    const messageInstance = new Message("Message with one command", commands);
    let response = roverInstance.recieveMessage(messageInstance);
    expect(roverInstance.position).toEqual(100);
  });
});
