import { Injectable, Inject } from "@nestjs/common";

import type {
  Category,
  Maybe,
  Printer,
  SchemaEntity,
} from "@graphql-markdown/types";
import { Renderer, getPrinter } from "@graphql-markdown/core";

import { AppConfiguration, InjectAppConfiguration } from "../config/app.config";
import { GraphQLService } from "../graphql/graphql.service";

@Injectable()
export class RendererService {
  private printer: Maybe<Printer>;
  private renderer: Maybe<Renderer>;

  constructor(
    @InjectAppConfiguration()
    private config: AppConfiguration,
    @Inject(GraphQLService) private graphqlService: GraphQLService,
  ) {}

  async render(): Promise<Maybe<Maybe<Category>[]>[]> {
    const schema = await this.graphqlService.schema;
    const rootTypes = (await this.graphqlService.map) ?? {};
    const customDirectives = await this.graphqlService.customDirectives;
    const groups = await this.graphqlService.groups;

    this.printer = await getPrinter(
      this.config.printer,
      { baseURL: this.config.baseURL, linkRoot: this.config.linkRoot, schema },
      {
        customDirectives,
        groups,
        printTypeOptions: this.config.printTypeOptions,
        skipDocDirective: this.config.skipDocDirective,
      },
    );

    this.renderer = new Renderer(
      this.printer,
      this.config.outputDir,
      this.config.baseURL,
      groups,
      this.config.prettify,
      {
        ...this.config.docOptions,
        deprecated: this.config.printTypeOptions.deprecated,
      },
    );

    return Promise.all(
      Object.keys(rootTypes).map(async (typeName) =>
        this.renderer!.renderRootTypes(
          typeName as SchemaEntity,
          rootTypes[typeName as SchemaEntity],
        ),
      ),
    );
  }
}
