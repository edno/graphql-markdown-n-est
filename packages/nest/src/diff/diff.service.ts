import { Inject, Injectable } from "@nestjs/common";

import { hasChanges } from "@graphql-markdown/core";
import type { DiffMethodName } from "@graphql-markdown/types";

import { InjectAppConfiguration, AppConfiguration } from "../config/app.config";
import { GraphQLService } from "../graphql/graphql.service";

@Injectable()
export class DiffService {
  constructor(
    @InjectAppConfiguration()
    private config: AppConfiguration,
    @Inject(GraphQLService) private graphqlService: GraphQLService,
  ) {}

  async hasChanges(): Promise<boolean> {
    return hasChanges(
      (await this.graphqlService.schema)!,
      this.config.tmpDir,
      this.config.diffMethod as DiffMethodName,
    );
  }
}
