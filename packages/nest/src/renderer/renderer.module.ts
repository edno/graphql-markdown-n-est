import { Module } from "@nestjs/common";

import { RendererService } from "./renderer.service";
import { GraphQLModule } from "../graphql/graphql.module";

@Module({
  imports: [GraphQLModule],
  providers: [RendererService],
})
export class RendererModule {}
