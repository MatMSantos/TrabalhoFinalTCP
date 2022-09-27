import React from 'react';
import Template from '../src/components/template'
import Parser from '../src/classes/parser/index'
import './App.css'


export default class App extends React.Component{
  render(){
    return (
      <div className="App">
        <Template />
        <Parser />
      </div>
    );
  }
}


