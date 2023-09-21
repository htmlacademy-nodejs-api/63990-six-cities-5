import { resolve } from 'node:path';
import { Command } from './command.interface.js';
import { readFileSync } from 'node:fs';
import chalk from 'chalk';

type DataFile = {
  version: string;
}

function isValidJson(value: unknown): value is DataFile {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements Command {
  constructor(
    private readonly path: string = './package.json',
  ) {}

  public getName() {
    return '--version';
  }

  private readVersion(): string {
    const fileData = readFileSync(resolve(this.path), { encoding: 'utf-8' });
    const content = JSON.parse(fileData);

    if (!isValidJson(content)) {
      throw new Error('Ошибка чтения файла');
    }

    return content.version;
  }

  public async execute(): Promise<void> {
    try {
      const version = this.readVersion();
      console.log(chalk.green('Version:'), version);

    } catch (e: unknown) {
      console.error('Ошибка чтения файла');

      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }
}
