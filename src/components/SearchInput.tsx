import * as React from "react";

export interface ISearchInputProps {
  onQueryChange: (q: string) => void;
  onQueryExecute: () => void;
  queryValue: string;
}

export class SearchInput extends React.Component<ISearchInputProps, {}> {
  constructor(props: ISearchInputProps) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Fires when the search input box has changed value
   * @param event
   */
  public onValueChange(event: any): void {
    this.props.onQueryChange(event.target.value || "");
  }

  /**
   * Fires when the form has been submitted (via "enter" or button)
   * @param event
   */
  public onSubmit(event: any): void {
    event.preventDefault();
    this.props.onQueryExecute();
  }

  public render(): JSX.Element {
    const { queryValue } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input value={queryValue} type="text" onChange={this.onValueChange} />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}
