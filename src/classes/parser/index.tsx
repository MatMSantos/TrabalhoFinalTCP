import React from "react";
export default class Parser extends React.Component {
  
  constructor(private textToParse: string) {
    super(textToParse);
    this.textToParse = textToParse;
  }

  readCommands() {
    var inputStringVectorized: string[] = this.textToParse.split('')    
    return inputStringVectorized
  }
  
}