import { Injectable } from "@nestjs/common";

import {
  getCustomDirectives,
  getDocumentLoaders,
  getGroups,
  getSchemaMap,
  loadSchema,
} from "@graphql-markdown/graphql";
import type {
  CustomDirectiveMap,
  GraphQLSchema,
  LoadSchemaOptions,
  Maybe,
  SchemaMap,
} from "@graphql-markdown/types";

import { InjectAppConfiguration, AppConfiguration } from "../config/app.config";

@Injectable()
export class GraphQLService {
  private _loaders: Maybe<LoadSchemaOptions>;
  private _schema: Maybe<GraphQLSchema>;
  private _map: Maybe<SchemaMap>;
  private _customDirectives: ReturnType<typeof getCustomDirectives>;
  private _groups: ReturnType<typeof getGroups>;

  constructor(
    @InjectAppConfiguration()
    private config: AppConfiguration,
  ) {}

  private async _getDocumentLoaders(): ReturnType<typeof getDocumentLoaders> {
    const loaders = await getDocumentLoaders(this.config.loaders);
    if (!loaders) {
      throw new Error(
        "An error occurred while loading GraphQL loaders. Check your dependencies and configuration.",
      );
    }
    return loaders;
  }

  public get loaders(): Promise<Maybe<LoadSchemaOptions>> {
    return (async (): Promise<Maybe<LoadSchemaOptions>> => {
      if (!this._loaders) {
        this._loaders = await this._getDocumentLoaders();
      }
      return this._loaders;
    })();
  }

  public get schema(): Promise<Maybe<GraphQLSchema>> {
    return (async (): Promise<Maybe<GraphQLSchema>> => {
      if (!this._schema)
        this._schema = await loadSchema(
          this.config.schemaLocation as string,
          (await this.loaders)!,
        );
      return this._schema;
    })();
  }

  public get map(): Promise<Maybe<SchemaMap>> {
    return (async (): Promise<Maybe<SchemaMap>> => {
      if (!this._map) {
        this._map = getSchemaMap(await this.schema);
      }
      return this._map;
    })();
  }

  public get customDirectives(): Promise<Maybe<CustomDirectiveMap>> {
    return (async (): Promise<Maybe<CustomDirectiveMap>> => {
      if (!this._customDirectives) {
        this._customDirectives = getCustomDirectives(
          { directives: (await this.map)?.directives },
          this.config.customDirective,
        );
      }
      return this._customDirectives;
    })();
  }

  public get groups(): Promise<ReturnType<typeof getGroups>> {
    return (async (): Promise<ReturnType<typeof getGroups>> => {
      if (!this._groups) {
        this._groups = getGroups(
          (await this.map)!,
          this.config.groupByDirective,
        );
      }
      return this._groups;
    })();
  }
}
