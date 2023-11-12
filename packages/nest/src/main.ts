import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";

import type { GeneratorOptions, Options } from "@graphql-markdown/types";
import { DiffMethod } from "@graphql-markdown/core";

import { AppModule } from "./app.module";
import { appConfiguration } from "./config/app.config";
import { RendererService } from "./renderer/renderer.service";
import { DiffService } from "./diff/diff.service";

async function main(): Promise<void> {
  await app();
}

export async function app(configOptions?: Options): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule);

  const config: Options = configOptions ?? app.get<GeneratorOptions>(appConfiguration.KEY);

  const diffService = app.get(DiffService);
  const renderService = app.get(RendererService);

  try {
    if (
      config.diffMethod !== DiffMethod.NONE &&
      !(await diffService.hasChanges())
    ) {
      Logger.log(
        `No changes detected in schema "${String(config.schemaLocation)}".`,
        "info",
      );
    }

    const pages = await renderService.render();

    Logger.log(
      `Documentation successfully generated in "${config.outputDir}" with base URL "${config.baseURL}".`,
      "success",
    );
    Logger.log(
      `${pages.flat().length} pages generated from schema "${String(
        config.schemaLocation,
      )}".`,
      "info",
    );
  } catch (e) {
    Logger.fatal(e);
  } finally {
    await app.close();
  }
}

void main();
