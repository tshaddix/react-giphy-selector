import * as React from "react";

import { Rating, ResultSort } from "../types";
import { GiphyClient, ISearchResult } from "../lib/GiphyClient";
import { SearchInput } from "./SearchInput";
import { Suggestions } from "./Suggestions";

export interface ISelectorProps {
  apiKey: string;
  rating: Rating;
  sort: ResultSort;
  limit: number;
  suggestions: string[];
}

export interface ISelectorState {
  query: string;
  isPending: boolean;
  searchError?: Error;
  searchResult?: ISearchResult;
}

export class Selector extends React.Component<ISelectorProps, ISelectorState> {
  public static defaultProps: Partial<ISelectorProps> = {
    rating: Rating.G,
    sort: ResultSort.Relevant,
    limit: 20,
    suggestions: []
  };

  public client: GiphyClient;

  constructor(props: ISelectorProps) {
    super(props);

    // Setup a new giphy client
    this.client = new GiphyClient(props.apiKey);

    // Set initial state
    this.state = {
      query: "",
      isPending: false,
      searchError: null,
      searchResult: null
    };

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onQueryExecute = this.onQueryExecute.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  /**
   * Fired when the query value changes for the
   * search
   * @param q string
   */
  public onQueryChange(q: string): void {
    // Update the query
    this.setState({ query: q });
  }

  /**
   * Fired when the query should be executed
   */
  public onQueryExecute(): void {
    const { query } = this.state;
    const { rating, sort, limit } = this.props;

    this.setState({
      isPending: true,
      searchError: null
    });

    this.client
      .searchGifs({
        q: query,
        rating,
        limit,
        sort,
        offset: 0
      })
      .then((result: ISearchResult) => {
        this.setState({
          isPending: false,
          searchResult: result
        });
      })
      .catch((err: Error) => {
        this.setState({
          isPending: false,
          searchError: err
        });
      });
  }

  /**
   * Fired when a suggestion has been selected
   */
  public onSuggestionSelected(q: string): void {
    this.onQueryChange(q);
    this.onQueryExecute();
  }

  public render(): JSX.Element {
    const { query, searchResult, isPending, searchError } = this.state;
    const { suggestions } = this.props;

    const showSuggestions =
      !!suggestions.length && !searchResult && !isPending && !searchError;

    return (
      <div>
        <SearchInput
          onQueryChange={this.onQueryChange}
          onQueryExecute={this.onQueryExecute}
          queryValue={query}
        />

        {showSuggestions && (
          <Suggestions
            suggestions={suggestions}
            onSuggestionSelected={this.onSuggestionSelected}
          />
        )}

        {isPending && <div>Loading</div>}

        {!isPending && !!searchError && <div>Error: {searchError.message}</div>}
      </div>
    );
  }
}
