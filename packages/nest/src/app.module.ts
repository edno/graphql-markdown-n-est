import { Module } from "@nestjs/common";

import { AppConfigModule } from "./config/config.module";
import { RendererService } from "./renderer/renderer.service";
import { DiffService } from "./diff/diff.service";
import { GraphQLModule } from "./graphql/graphql.module";
import { GraphQLService } from "./graphql/graphql.service";

@Module({
  imports: [AppConfigModule, GraphQLModule],
  providers: [RendererService, DiffService, GraphQLService],
})
export class AppModule {}
