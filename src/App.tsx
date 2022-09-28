import React from 'react';
//@ts-ignore
import MIDI from 'midi.js';
import Template from '../src/components/template'
import Parser from '../src/classes/parser/index'
import './App.css'


export default class App extends React.Component{
  componentDidMount(){
    MIDI.loadPlugin({
      instrument: "acoustic_grand_piano",
      onprogress: function(state:any, progress:any) {
        console.log(state, progress);
      },
      onsuccess: function() {
        var delay = 0; // play one note every quarter second
        var note = 0; // the MIDI note
        var velocity = 127; // how hard the note hits
        // play the note
        MIDI.setVolume(0, 127);
        MIDI.noteOn(0, note, velocity, delay);
        MIDI.noteOff(0, note, delay + 0.75);
      }
    });
  }

  play(){
    var delay = 0; // play one note every quarter second
    var note = 45; // the MIDI note
    var velocity = 127; // how hard the note hits

    MIDI.noteOn(0, note, velocity, delay);
    MIDI.noteOff(0, note, delay + 0.75);
    console.log(MIDI.noteToKey)
  }

  render(){
    return (
      <div className="App">
        <Template />
        <Parser />
      </div>
    );
  }
}


