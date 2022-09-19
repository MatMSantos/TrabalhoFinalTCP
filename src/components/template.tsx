import React from "react";
import '../styles/template.css'

type TemplateState = {
  text: string
  instruction: string
}

export default class Template extends React.Component {
  state:TemplateState = {text:'', instruction:''}

  keys_top = [
    {
        id: 1,
        text: 'a',
        instruction: 'a tecla a faz isso',
        action: 'a'
    },
    {
        id: 2,
        text: 'b',
        instruction: 'a tecla b faz isso',
        action: 'b'
    },
    {
        id: 3,
        text: 'c',
        instruction: 'a tecla c faz isso',
        action: 'c'
    },
    {
        id: 4,
        text: 'd',
        instruction: 'a tecla d faz isso',
        action: 'd'
    },
    {
        id: 5,
        text: 'e',
        instruction: 'a tecla e faz isso',
        action: 'e'
    },
    {
        id: 6,
        text: 'f',
        instruction: 'a tecla f faz isso',
        action: 'f'
    },
    {
        id: 7,
        text: 'g',
        instruction: 'a tecla g faz isso',
        action: 'g'
    },
    {
        id: 8,
        text: 'space',
        instruction: 'a tecla space faz isso',
        action: ' '
    },
  ]

  keys_bottom = [
    {
        id: 1,
        text: '+',
        instruction: 'a tecla + faz isso',
        action: '+'
    },
    {
        id: 2,
        text: '-',
        instruction: 'a tecla - faz isso',
        action: '-'
    },
    {
        id: 3,
        text: 'rep',
        instruction: 'a tecla rep faz isso',
        action: 'rep'
    },
    {
        id: 4,
        text: 'r+',
        instruction: 'a tecla r+ faz isso',
        action: 'r+'
    },
    {
        id: 5,
        text: 'r-',
        instruction: 'a tecla r- faz isso',
        action: 'r-'
    },
    {
        id: 6,
        text: '?',
        instruction: 'a tecla ? faz isso',
        action: '?'
    },
    {
        id: 7,
        text: 'nl',
        instruction: 'a tecla nl faz isso',
        action: 'nl'
    },
    {
        id: 8,
        text: 'bpm+',
        instruction: 'a tecla bpm+ faz isso',
        action: 'bpm+'
    },
    {
        id: 9,
        text: ';',
        instruction: 'a tecla ; faz isso',
        action: ';'
    },
  ]

  handleChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({text: event.target.value})
  }

  handleText = (text:string) => {
    this.setState({text: text})
  }

  handleInstruction = (instruction:string) => {
    this.setState({instruction: instruction})
  }

  render(){
    const { text, instruction } = this.state;

    return (
      <div className="container">
        <div className='title-container'>
          <div className='title'>trabalho de tcp</div>
          <div className='sub-title'>Gerador de áudio baseado em texto</div>
        </div>
        <div className='content-container'>
          <textarea
            className='text-area grow-one'
            value={instruction}
            // onChange={this.handleChange}
            placeholder="Instruções dos botões"
            style={{ width: '10px', height: '300px' }}
          />
          <textarea
            className='text-area grow-two'
            value={text}
            onChange={this.handleChange}
            placeholder="Escreva a sua melodia aqui 2"
            style={{ width: '30px', height: '300px' }}
          />
          <textarea
            className='text-area grow-three'
            value={instruction}
            // onChange={this.handleChange}
            placeholder="Aqui vai ser o componente de enviar arquivo"
            style={{ width: '10px', height: '300px' }}
          />
        </div>
        <div className='keyBoard'>
          {this.keys_top.map((key:any) => {
            return (
              <button
                className='key'
                key={key.id}
                onMouseEnter={() => this.setState({instruction: key.instruction})}
                onClick={() => this.setState({text: text.concat(key.action)})}>
                {key.text}
              </button>
            );
          })}
        </div>
        <div className='keyBoard'>
          {this.keys_bottom.map((key:any) => {
            return (
              <button
                className='key'
                key={key.id}
                onMouseEnter={() => this.setState({instruction:key.instruction})}
                onClick={() => this.setState({text:text.concat(key.action)})}>
                {key.text}
              </button>
            );
          })}
        </div>
        <div className='play-button'>Play!</div>
      </div>
    )
  }

}

