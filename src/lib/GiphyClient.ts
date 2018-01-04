// Documentation on the Giphy SDK client can be
// found here: https://github.com/Giphy/giphy-js-sdk-core
import * as GiphyJSClient from "giphy-js-sdk-core";

import { Rating, ResultSort } from "../types";

export interface IGifObject {
  id: string;
  slug: string;
  url: string;
  embedUrl: string;
  source: string;
  rating: Rating;
  title: string;
}

export interface ISearchParams {
  q: string;
  rating: Rating;
  sort: ResultSort;
  limit: number;
  offset: number;
}

export interface ISearchResult {
  gifs: IGifObject[];
}

export class GiphyClient {
  private client: any;

  constructor(apiKey: string) {
    // create a new Giphy JS SDK client
    this.client = GiphyJSClient(apiKey);
  }

  /**
   * Execute a search for gifs based on a search string
   * @param params ISearchParams
   */
  public searchGifs(params: ISearchParams): Promise<ISearchResult> {
    return this.client.search("gifs", params).then(response => {
      return response.data.map(rawGifObject => {
        return {
          id: rawGifObject.id,
          slug: rawGifObject.slug,
          url: rawGifObject.url,
          embedUrl: rawGifObject.embed_url,
          source: rawGifObject.source,
          rating: rawGifObject.rating,
          title: rawGifObject.title
        };
      });
    });
  }
}
