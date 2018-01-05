import * as React from "react";

import { IGifObject, IGifImage } from "../types";

export interface ISearchResultProps {
  gifObject: IGifObject;
  onSelected: (gifObject: IGifObject) => void;
}

export class SearchResult extends React.Component<ISearchResultProps, {}> {
  constructor(props: ISearchResultProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  public onClick(event: any): void {
    event.preventDefault();

    this.props.onSelected(this.props.gifObject);
  }

  public render(): JSX.Element {
    const { gifObject } = this.props;

    const sourceImage: IGifImage = gifObject.images.fixed_width;

    const style = {
      width: `${sourceImage.width}px`,
      height: `${sourceImage.height}px`,
      background: `url(${sourceImage.gif_url})`,
      display: "block"
    };

    return (
      <li>
        <a href="javascript:void(0)" onClick={this.onClick} style={style} />
      </li>
    );
  }
}
