import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
  render (){
    <div>
      <h1>Welcome to Duper</h1>
      <h3>Hope you think it's super!</h3>
      {this.props.children}
      <DummyText />
    </div>
  }
}

export default DragDropContext(HTML5Backend)(App);
