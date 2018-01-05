import * as React from "react";

const style = require("./QueryForm.css");

export interface IQueryFormProps {
  onQueryChange: (q: string) => void;
  onQueryExecute: () => void;
  queryInputPlaceholder: string;
  queryValue: string;
}

export class QueryForm extends React.Component<IQueryFormProps, {}> {
  constructor(props: IQueryFormProps) {
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
    const { queryValue, queryInputPlaceholder } = this.props;

    return (
      <div>
        <form className={style.queryForm} onSubmit={this.onSubmit}>
          <input
            value={queryValue}
            type="text"
            onChange={this.onValueChange}
            placeholder={queryInputPlaceholder}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}
