type ParsedCommands = Record<string, string[]>

export class CommandParser {
  static parse(args: string[]): ParsedCommands {

    const commands: ParsedCommands = {};
    let currentCommand = '';

    for (const argument of args) {
      if (argument.startsWith('--')) {
        commands[argument] = [];

        currentCommand = argument;
      } else if (currentCommand && argument) {
        commands[currentCommand].push(argument);
      }
    }

    return commands;
  }
}
