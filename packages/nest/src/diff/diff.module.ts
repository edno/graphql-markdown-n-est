import { Module } from "@nestjs/common";

import { DiffService } from "./diff.service";
import { GraphQLModule } from "../graphql/graphql.module";

@Module({
  imports: [GraphQLModule],
  providers: [DiffService],
})
export class DiffModule {}
