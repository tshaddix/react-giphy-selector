// Documentation on the Giphy SDK client can be
// found here: https://github.com/Giphy/giphy-js-sdk-core
import * as GiphyJSClient from "giphy-js-sdk-core";

import { Rating, ResultSort, IGifObject } from "../types";

export interface ITrendingParams {
  rating: Rating;
  limit: number;
  offset: number;
}

export interface IRandomParams {
  tag: string;
  rating: Rating;
}

export interface ISearchParams {
  q: string;
  rating: Rating;
  sort: ResultSort;
  limit: number;
  offset: number;
}

export interface ISearchResult {
  gifObjects: IGifObject[];
}

export class GiphyClient {
  private client: any;

  constructor(apiKey: string) {
    // create a new Giphy JS SDK client
    this.client = GiphyJSClient(apiKey);
  }

  /**
   * Execute a search for gifs based on a search string
   * @param params ITrendingParams
   */
  public searchGifs(params: ISearchParams): Promise<ISearchResult> {
    return this.client.search("gifs", params).then(response => {
      return { gifObjects: response.data };
    });
  }

  /**
   * Load GIPHY trending endpoint
   * @param params IRandomParams
   */
  public trendingGifs(params: ITrendingParams): Promise<ISearchResult> {
    return this.client.trending("gifs", params).then(response => {
      console.log("trendingGifs response", response);
      return { gifObjects: response.data };
    });
  }

  /**
   * Load GIPHY random endpoint
   * @param params ISearchParams
   */
  public randomGifs(params: IRandomParams): Promise<ISearchResult> {
    return this.client.random("gifs", params).then(response => {
      console.log("reandomGifs response", response);
      return { gifObjects: response.data };
    });
  }
}
