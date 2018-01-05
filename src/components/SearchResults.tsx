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

  private getColumnGifs(
    gifObjects: Array<IGifObject>
  ): Array<Array<IGifObject>> {
    // todo: Potentially make this an argument/prop
    const numColumns = 3;

    const columnsGifs: Array<Array<IGifObject>> = [];

    let c = 0;

    // fill column array with arrays representing column contents
    while (c < numColumns) {
      columnsGifs.push([]);
      c++;
    }

    let j = 0;

    // sort gifs into columns
    gifObjects.forEach((gifObject: IGifObject) => {
      columnsGifs[j].push(gifObject);

      j++;

      if (j === numColumns) {
        j = 0;
      }
    });

    return columnsGifs;
  }

  public render(): JSX.Element {
    const { gifObjects, onGifSelected } = this.props;

    const columnGifs = this.getColumnGifs(gifObjects);

    return (
      <ul>
        {columnGifs.map((column: IGifObject[], c: number) => (
          <li key={`column-${c}`}>
            <ul>
              {column.map((gifObject: IGifObject) => (
                <SearchResult
                  key={gifObject.id}
                  gifObject={gifObject}
                  onSelected={onGifSelected}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }
}
