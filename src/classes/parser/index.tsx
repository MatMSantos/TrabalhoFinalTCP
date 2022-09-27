import React from "react";

export default class Parser extends React.Component {
    
  str: string = "abbpm+cr+der+r+r+r-frepbpm+r-" 

  handleParser = (str: string) => {
      
    var arr:string[] = str.split('')
    let aux: string[] = []

    for(var i = 0; i<arr.length;i++){
      if (arr[i] === 'b' && arr[i+1]==='p' && arr[i+2]==='m' && arr[i+3]==='+') {
        aux = []
        aux.push(arr[i])
        aux.push(arr[i+1])
        aux.push(arr[i+2])
        aux.push(arr[i+3])   
        arr[i] = aux.join('')  
        arr[i+1] = ''       
        arr[i+2] = '' 
        arr[i+3] = ''         
      } else if (arr[i] === 'r' && arr[i+1]==='+') {
        aux = []
        aux.push(arr[i])
        aux.push(arr[i+1])
        arr[i] = aux.join('') 
        arr[i+1] = ''          
      } else if (arr[i] === 'r' && arr[i+1]==='-') {
        aux = []
        aux.push(arr[i])
        aux.push(arr[i+1])
        arr[i] = aux.join('') 
        arr[i+1] = ''           
      } else if (arr[i] === 'r' && arr[i+1]==='e' && arr[i+2]==='p') {
        aux = []
        aux.push(arr[i])
        aux.push(arr[i+1])
        aux.push(arr[i+2])
        arr[i] = aux.join('') 
        arr[i+1] = ''    
        arr[i+2] = ''          
      }        
    }       

    arr = arr.filter(item => item)      

    return arr
  }

  render() {
    console.log('result',this.handleParser(this.str))
    return (
      <>{this.handleParser(this.str)}</>
    )
  }
}
