import {Selector} from '../lib';
import * as Lib from '../lib';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// feel free to change these :)
const suggestions = ["stop it", "nice one", "look up", "no", "bad"];

interface IExampleProps {
  suggestions: string[];
}

interface IExampleState {
  apiKey: string;
}

class ExampleApp extends React.Component<IExampleProps, IExampleState> {
  state: IExampleState;
  
  constructor (props: IExampleProps) {
    super(props);
    
    this.state = {
      apiKey: ""
    };
    
    this.onKeyChange = this.onKeyChange.bind(this);
  }
  
  public onKeyChange (event: any): void {
    this.setState({apiKey: event.target.value});
  }
  
  public render (): JSX.Element {
    const {apiKey} = this.state;
    const {suggestions} = this.props;
    
    // todo: This pattern will not work as the API key needs to be set before selector is constructed
    
    return (
      <div>
        <div>
          <input type="text" placeholder="Enter your Giphy API Key" value={apiKey} onChange={this.onKeyChange}/>
        </div>
        <div>
          <Selector apiKey={apiKey} suggestions={suggestions}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ExampleApp suggestions={suggestions}/>,
  document.getElementById('example')
);
