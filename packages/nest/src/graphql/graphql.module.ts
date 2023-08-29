import { Module } from "@nestjs/common";

import { GraphQLService } from "./graphql.service";

@Module({
  imports: [],
  providers: [GraphQLService],
})
export class GraphQLModule {}
