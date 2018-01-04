import * as React from "react";

import { Suggestion } from "./Suggestion";

export interface ISuggestionsProps {
  suggestions: string[];
  onSuggestionSelected: (q: string) => void;
}

export class Suggestions extends React.Component<ISuggestionsProps, {}> {
  constructor(props: ISuggestionsProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { suggestions, onSuggestionSelected } = this.props;

    return (
      <div>
        {suggestions.map((s: string) => (
          <Suggestion
            key={`suggestion-${s}`}
            suggestion={s}
            onSelected={onSuggestionSelected}
          />
        ))}
      </div>
    );
  }
}
