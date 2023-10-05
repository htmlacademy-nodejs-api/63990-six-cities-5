#!/usr/bin/env node

import { CLIApplication, GenerateCommand, HelpCommand, ImportCommand, VersionCommand } from './cli/index.js';

function bootstrap() {
  const app = new CLIApplication();

  app.registerCommands([
    new HelpCommand(),
    new ImportCommand(),
    new VersionCommand(),
    new GenerateCommand(),
  ]);

  app.processCommand(process.argv);
}

bootstrap();
