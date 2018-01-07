import { Selector, Rating } from "../../lib";
import * as React from "react";
import * as ReactDOM from "react-dom";

const customStyle = require("./example.css");

// feel free to change these :)
const suggestions = [
  "watching",
  "quiz",
  "stop it",
  "nice one",
  "learning",
  "reading",
  "working"
];

interface IExampleProps {
  suggestions: string[];
}

interface IExampleState {
  apiKey: string;
  isKeySubmitted: boolean;
}

class ExampleApp extends React.Component<IExampleProps, IExampleState> {
  state: IExampleState;

  constructor(props: IExampleProps) {
    super(props);

    this.state = {
      apiKey: "",
      isKeySubmitted: false
    };

    this.onKeyChange = this.onKeyChange.bind(this);
    this.onKeySubmit = this.onKeySubmit.bind(this);
    this.onGifSelected = this.onGifSelected.bind(this);
  }

  public onKeyChange(event: any): void {
    this.setState({ apiKey: event.target.value });
  }

  public onKeySubmit(event: any): void {
    event.preventDefault();

    this.setState({
      isKeySubmitted: true
    });
  }

  public onGifSelected(gifObject: any): void {
    alert(`You selected a gif! id: ${gifObject.id}`);
  }

  public render(): JSX.Element {
    const { apiKey, isKeySubmitted } = this.state;
    const { suggestions } = this.props;

    if (!isKeySubmitted) {
      return (
        <form onSubmit={this.onKeySubmit}>
          <input
            type="text"
            placeholder="Enter your Giphy API Key"
            value={apiKey}
            onChange={this.onKeyChange}
          />
          <button type="submit">Set API Key</button>
        </form>
      );
    }

    return (
      <div className={customStyle.modal}>
        <Selector
          apiKey={apiKey}
          suggestions={suggestions}
          onGifSelected={this.onGifSelected}
          rating={Rating.G}
          queryFormInputClassName={customStyle.customQueryFormInput}
          queryFormSubmitClassName={customStyle.customQueryFormSubmit}
          searchResultsClassName={customStyle.customSearchResults}
          searchResultClassName={customStyle.customSearchResult}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <ExampleApp suggestions={suggestions} />,
  document.getElementById("example")
);
