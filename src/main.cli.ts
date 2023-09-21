#!/usr/bin/env node

import { CLIApplication, HelpCommand, ImportCommand, VersionCommand } from './cli/index.js';

function bootstrap() {
  const app = new CLIApplication();

  app.registerCommands([
    new HelpCommand(),
    new ImportCommand(),
    new VersionCommand(),
  ]);

  app.processCommand(process.argv);
}

bootstrap();
