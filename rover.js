class Rover {
  constructor(position) {
    this.generatorWatts = 110;
    this.mode = "NORMAL";
    this.position = position;

    if (!position) {
      throw Error("Position required.");
    }
  }
  recieveMessage(message) {
    let response = {};
    response.message = message.name;
    let results = [];
    for (let i = 0; i < message.commands.length; i++) {
      let command = message.commands[i];
      if (command.commandType === "MOVE") {
        if (this.mode === "NORMAL") {
          this.position = command.value;
          results.push({ completed: true });
        } else {
          results.push({ completed: false });
        }
      } else if (command.commandType === "STATUS_CHECK") {
        results.push({
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position,
          },
        });
      } else if (command.commandType === "MODE_CHANGE") {
        this.mode = command.value;
        results.push({ completed: true });
      }
    }
    response.results = results;
    return response;
  }
}
module.exports = Rover;



