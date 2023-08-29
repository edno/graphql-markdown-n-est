import { buildConfig } from "@graphql-markdown/core";
import { Inject } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { registerAs } from "@nestjs/config";

export const appConfiguration = registerAs("app", async () =>
  buildConfig({}, {}),
);

export type AppConfiguration = ConfigType<typeof appConfiguration>;

export const InjectAppConfiguration = (): ReturnType<typeof Inject> =>
  Inject(appConfiguration.KEY);
