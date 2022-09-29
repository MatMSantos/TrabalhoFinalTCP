import React from "react";
import '../styles/template.css'
import Parser from '../classes/parser/index'
import Player from '../classes/player/index'

//@ts-ignore
import MIDI from 'midi.js'

type TemplateState = {
  userInputText: string
  instruction: string
  keyAction: string
}
export default class Template extends React.Component {
  state: TemplateState = { userInputText: '', instruction: 'Instruções dos comandos', keyAction: '' }

  keys_top = [
    {
      id: 1,
      text: '!',
      instruction: 'Troca o instrumento para o instrumento General MIDI #114 (Agogo)',
      action: '!'
    },
    {
      id: 2,
      text: ',',
      instruction: 'Trocar instrumento para o instrumento General MIDI #20 (Church Organ)',
      action: ','
    },
    {
      id: 3,
      text: '?',
      instruction: 'Aumenta UMA oitava; Se não puder, aumentar, volta à oitava default (de início)',
      action: '?'
    },
    {
      id: 4,
      text: 'NL',
      instruction: 'Troca o instrumento para o instrument General MIDI #15 (Tubular Bells)',
      action: '\n'
    },
    {
      id: 5,
      text: ';',
      instruction: 'Troca o instrumento para o instrumento General MIDI #76 (Pan Flute)',
      action: ';'
    },
    {
      id: 6,
      text: 'space',
      instruction: 'Aumenta volume para o DOBRO do volume, Se não puder aumentar, volta ao volume default (de início)',
      action: ' '
    },
    {
      id: 7,
      text: 'Par',
      instruction: 'Troca o instrumento para o instrumento General MIDI #76 (Pan Flute)',
      action: ';'
    },
    {
      id: 8,
      text: 'Impar',
      instruction: 'Troca o instrumento para o instrumento General MIDI #76 (Pan Flute)',
      action: this.state.keyAction
    },
    
  ]

  keys_middle = [
    {
      id: 1,
      text: 'A',
      instruction: 'Reproduz a nota "Lá"',
      action: 'A'
    },
    {
      id: 2,
      text: 'B',
      instruction: 'Reproduz a nota "Si"',
      action: 'B'
    },
    {
      id: 3,
      text: 'C',
      instruction: 'Reproduz a nota "Dó"',
      action: 'C'
    },
    {
      id: 4,
      text: 'D',
      instruction: 'Reproduz a nota "Ré"',
      action: 'D'
    },
    {
      id: 5,
      text: 'E',
      instruction: 'Reproduz a nota "Mi"',
      action: 'E'
    },
    {
      id: 6,
      text: 'F',
      instruction: 'Reproduz a nota "Fá"',
      action: 'F'
    },
    {
      id: 7,
      text: 'G',
      instruction: 'Reproduz a nota "Sol"',
      action: 'G'
    },
    {
      id: 8,
      text: 'I',
      instruction: 'Troca o instrumento para o instrumento General MIDI #114 (Harpsichord)',
      action: 'I'
    },
    {
      id: 9,
      text: 'O',
      instruction: 'Troca o instrumento para o instrumento General MIDI #114 (Harpsichord)',
      action: 'O'
    },
    {
      id: 10,
      text: 'U',
      instruction: 'Troca o instrumento para o instrumento General MIDI #114 (Harpsichord)',
      action: 'U'
    },
  ]

  keys_bottom = [
    {
      id: 1,
      text: 'a',
      instruction: 'Repete a nota anterior se for uma nota válida',
      action: 'a'
    },
    {
      id: 2,
      text: 'b',
      instruction: 'Repete a nota anterior se for uma nota válida',
      action: 'b'
    },
    {
      id: 3,
      text: 'c',
      instruction: 'Repete a nota anterior se for uma nota válida',
      action: 'c'
    },
    {
      id: 4,
      text: 'd',
      instruction: 'Repete a nota anterior se for uma nota válida',
      action: 'd'
    },
    {
      id: 5,
      text: 'e',
      instruction: 'Repete a nota anterior se for uma nota válida',
      action: 'e'
    },
    {
      id: 6,
      text: 'f',
      instruction: 'Repete a nota anterior se for uma nota válida',
      action: 'f'
    },
    {
      id: 7,
      text: 'g',
      instruction: 'Repete a nota anterior se for uma nota válida',
      action: 'g'
    },    
  ]

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ userInputText: event.target.value })
  }

  handleText = (text: string) => {
    this.setState({ userInputText: text })
  }

  handleInstruction = (instruction: string) => {
    this.setState({ instruction: instruction })
  }

  handleNewFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const file = event.target && event.target.files && event.target.files[0]

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ userInputText: (reader.result as string) })
      }

      reader.readAsText(file);
    }

  }

  pairGenerator = (min: number, max: number) => String(Math.floor(Math.random() * ((max - min) / 2 + 1)) * 2 + min)
  oddGenerator = (min: number, max: number) => String((Math.floor(Math.random() * ((max - min) / 2 + 1)) * 2 + min) + 1)

  render() {
    const { userInputText, instruction } = this.state;
    const parser = new Parser(userInputText)
    const player = new Player(this.props)

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
            value={userInputText}
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
          {this.keys_top.map((key: {
            id: number
            instruction: string
            action: string
            text: string
          }) => {
            return (
              <button
                className='key'
                key={key.id}
                onMouseEnter={() => this.setState({ instruction: key.instruction })}
                onClick={() => {
                  if (key.text === 'Par') {
                    this.setState({ userInputText: userInputText.concat(this.pairGenerator(0, 10)) })
                  } else if (key.text === 'Impar') {
                    this.setState({ userInputText: userInputText.concat(this.oddGenerator(0, 10)) })
                  } else {
                    this.setState({ userInputText: userInputText.concat(key.action) })
                  }
                }}
              >
                {key.text}
              </button>
            );
          })}
        </div>
        <div className='keyBoard'>
          {this.keys_middle.map((key: {
            id: number
            instruction: string
            action: string
            text: string
          }) => {
            return (
              <button
                className='key'
                key={key.id}
                onMouseEnter={() => this.setState({ instruction: key.instruction })}
                onClick={() => this.setState({ userInputText: userInputText.concat(key.action) })}>
                {key.text}
              </button>
            );
          })}
        </div>
        <div className='keyBoard'>
          {this.keys_bottom.map((key: {
            id: number
            instruction: string
            action: string
            text: string
          }) => {
            return (
              <button
                className='key'
                key={key.id}
                onMouseEnter={() => this.setState({ instruction: key.instruction })}
                onClick={() => this.setState({ userInputText: userInputText.concat(key.action) })}>
                {key.text}
              </button>
            );
          })}
        </div>
        <div
          className='play-button'
          onClick={() => player.play(parser.readCommands())}>Play!</div>
      </div>
    )
  }

}

