import React from "react";
import '../styles/template.css'

type TemplateState = {
  text: string
  instruction: string
}

export default class Template extends React.Component {
  state:TemplateState = {text:'', instruction:'Instruções dos comandos'}

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
        action: '\n'
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

  handleNewFile = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const file = event.target && event.target.files && event.target.files[0]

    if(file) {
      const reader = new FileReader();

      reader.onloadend= () => {
        this.setState({text: (reader.result as string)})
      }

      reader.readAsText(file);
    }

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
          <div
            className='text-area grow-one'
            style={{ height: '300px' }}
          >
            {instruction}
          </div>
          <textarea
            className='text-area grow-two'
            value={text}
            onChange={this.handleChange}
            placeholder="Escreva a sua melodia aqui"
            style={{ height: '300px' }}
          />
          <div
            className='text-area grow-three'
            style={{ height: '300px' }}
          >
            <input
              type="file"
              className=""
              onChange={this.handleNewFile}
            />
          </div>
        </div>
        <div className='keyBoard'>
          {this.keys_top.map((key:{
            id: number
            instruction: string
            action: string
            text: string
          }) => {
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
          {this.keys_bottom.map((key:{
            id: number
            instruction: string
            action: string
            text: string
          }) => {
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

