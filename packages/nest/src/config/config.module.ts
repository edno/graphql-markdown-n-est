import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { appConfiguration } from "./app.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
      isGlobal: true,
    }),
  ],
  providers: [],
})
export class AppConfigModule {}
