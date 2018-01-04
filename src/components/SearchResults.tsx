import * as React from "react";

import { IGifObject } from "../types";
import { SearchResult } from "./SearchResult";

export interface ISearchResultsProps {
  gifObjects: IGifObject[];
  onGifSelected: (gifObject: IGifObject) => void;
}

export class SearchResults extends React.Component<ISearchResultsProps, {}> {
  constructor(props: ISearchResultsProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { gifObjects, onGifSelected } = this.props;

    return (
      <div>
        {gifObjects.map((gifObject: IGifObject) => (
          <SearchResult
            key={gifObject.id}
            gifObject={gifObject}
            onSelected={onGifSelected}
          />
        ))}
      </div>
    );
  }
}
