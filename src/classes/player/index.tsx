import React from 'react';
//@ts-ignore
import MIDI from 'midi.js';
import Note from '../note/index'
import InstrumentList from '../instrumentList/index'

type InstrumentState = {
    midiNumber: number
    name: string
}

export default class Player extends React.Component {

    initialChannel:number = 0;
    initialVolume:number = 100;
    // Começamos na oitava 
    initialOctave:number = 4;
    // Em General MIDI, 1 corresponde a "Acoustic Grand Piano"
    initialInstrumentMidiNumber:number = 1;

    currentChannel: number;
    currentVolume: number;
    currentOctave: number;
    currentInstrument:InstrumentState = { midiNumber:this.initialInstrumentMidiNumber, name:InstrumentList.instrumentList[this.initialInstrumentMidiNumber] };

    constructor(props: any) {
        super(props);
        this.currentChannel = this.initialChannel;
        this.currentVolume = this.initialVolume;
        this.currentOctave = this.initialOctave;
    }

    volumeUp() {
        this.currentVolume *= 2;
        MIDI.setVolume(0, this.currentVolume);
    }

    resetVolume() {
        this.currentVolume = this.initialVolume;
        MIDI.setVolume(0, this.currentVolume);
    }

    octaveUp() {
        this.currentOctave += 1;
    }

    resetOctave() {
        this.currentOctave = this.initialOctave;
    }

    changeInstrument(newMidiNumber:number) {
        this.currentInstrument.midiNumber = newMidiNumber;
        this.currentInstrument.name = InstrumentList.instrumentList[newMidiNumber];
    }

    play(commandList:Array<string>) {

        var noteWasPlayed:boolean = false;
        var lastNotePlayed:number;
        var notePlayed:number = 0;
        var noteVelocity:number = 127;
        var noteDelay:number = 0;

        commandList.forEach((command, idx) => {
            if(isNaN(parseInt(command, 10))) {
                switch(command) {
                    case 'A':
                        noteWasPlayed = true;
                        if(this.currentOctave < 8)
                            notePlayed = Note.A[this.currentOctave]
                            lastNotePlayed = notePlayed;
                        break
                    case 'B':
                        noteWasPlayed = true;
                        if(this.currentOctave < 8)
                            notePlayed = Note.B[this.currentOctave]
                            lastNotePlayed = notePlayed;
                        break
                    case 'C':
                        noteWasPlayed = true;
                        if(this.currentOctave > 0)
                            notePlayed = Note.C[this.currentOctave]
                            lastNotePlayed = notePlayed;
                        break
                    case 'D':
                        noteWasPlayed = true;
                        if(this.currentOctave > 0 && this.currentOctave < 8)
                            notePlayed = Note.D[this.currentOctave]
                            lastNotePlayed = notePlayed;
                        break
                    case 'E':
                        noteWasPlayed = true;
                        if(this.currentOctave > 0 && this.currentOctave < 8)
                            notePlayed = Note.E[this.currentOctave]
                            lastNotePlayed = notePlayed;
                        break
                    case 'F':
                        noteWasPlayed = true;
                        if(this.currentOctave > 0 && this.currentOctave < 8)
                            notePlayed = Note.F[this.currentOctave]
                            lastNotePlayed = notePlayed;
                        break
                    case 'G':
                        noteWasPlayed = true;
                        if(this.currentOctave > 0 && this.currentOctave < 8)
                            notePlayed = Note.G[this.currentOctave]
                            lastNotePlayed = notePlayed;
                        break
                    case ' ':
                        this.volumeUp();
                        if(this.currentVolume > 127)
                            this.resetVolume();
                        break
                    case '!':
                        // 114 é o número MIDI para o instrumento Agogô
                        this.currentInstrument.midiNumber = 114
                        this.currentInstrument.name = InstrumentList.instrumentList[114]
                        break
                    case 'O':
                    case 'o':
                    case 'I':
                    case 'i':
                    case 'U':
                    case 'u':
                        // 7 é o número MIDI para o instrumento Cravo
                        this.currentInstrument.midiNumber = 7
                        this.currentInstrument.name = InstrumentList.instrumentList[7]
                        break
                    case '?':
                    case '.':
                        this.octaveUp()
                        if(this.currentOctave > 8)
                            this.resetOctave()
                        break
                    case '\n':
                        // 15 é o número MIDI para o instrumento Carrilhão de Orquestra
                        this.currentInstrument.midiNumber = 15
                        this.currentInstrument.name = InstrumentList.instrumentList[15]
                        break
                    case ';':
                        // 76 é o número MIDI para o instrumento Flauta de Pã
                        this.currentInstrument.midiNumber = 76
                        this.currentInstrument.name = InstrumentList.instrumentList[76]
                        break
                    case ',':
                        // 20 é o número MIDI para o instrumento Órgão de Tubos
                        this.currentInstrument.midiNumber = 20
                        this.currentInstrument.name = InstrumentList.instrumentList[20]
                        break
                    default:
                        if(idx === 0) {
                            notePlayed = 0
                            break
                        }
                        else if(noteWasPlayed) {
                            notePlayed = lastNotePlayed;
                        }
                        noteWasPlayed = false;
                        break
                }
            }
            else {
                this.currentInstrument.midiNumber += parseInt(command, 10)
                // A lista General MIDI é cíclica, ou seja, caso o valor passe de 128 "damos a volta" e contamos a partir do 1 novamente
                if(this.currentInstrument.midiNumber > 128)
                    this.currentInstrument.midiNumber -= 128
            }

            // Toca a nota, a uma frequência de uma nota a cada um quarto de segundo
            // Talvez usar um listener para tocar a próxima nota
            if(!MIDI.Player.playing)
                MIDI.noteOn(this.currentChannel, notePlayed, noteVelocity, noteDelay)
            //MIDI.noteOff(0, notePlayed, noteDelay)

            //MIDI.noteOn(0, 60, velocity, time);
            //MIDI.noteOff(0, 60, time + 1);

            //MIDI.noteOn(0, 64, velocity, time+2);
            //MIDI.noteOff(0, 64, time + 3);

            // Para a nota antes de a repetir
            //MIDI.noteOff(0, notePlayed, noteDelay + 0.75);
        })
    }
}