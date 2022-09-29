import React from "react";
export default class Parser extends React.Component {
  
  constructor(private str: string) {
    super(str);
    this.str = str;
  }

  readCommands() {
    var inputStringVectorized: string[] = this.str.split('')    
    return inputStringVectorized
  }
  
}