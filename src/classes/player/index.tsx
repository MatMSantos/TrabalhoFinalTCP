import React from 'react';
//@ts-ignore
import MIDI from 'midi.js';
import Note from '../note/index'

type InstrumentState = {
    midiNumber: number
    name: string
}

export default class Player extends React.Component {

    instrumentList: { [midiNumber: number]: string } = {
        1: "acoustic_grand_piano",
        2: "bright_acoustic_piano",
        3: "electric_grand_piano",
        4: "honkytonk_piano",
        5: "electric_piano_1",
        6: "electric_piano_2",
        7: "harpsichord",
        8: "clavinet",
        9: "celesta",
        10: "glockenspiel",
        11: "music_box",
        12: "vibraphone",
        13: "marimba",
        14: "xylophone",
        15: "tubular_bells",
        16: "dulcimer",
        17: "drawbar_organ",
        18: "percussive_organ",
        19: "rock_organ",
        20: "church_organ",
        21: "reed_organ",
        22: "accordion",
        23: "harmonica",
        24: "tango_accordion",
        25: "acoustic_guitar_nylon",
        26: "acoustic_guitar_steel",
        27: "electric_guitar_jazz",
        28: "electric_guitar_clean",
        29: "electric_guitar_muted",
        30: "overdriven_guitar",
        31: "distortion_guitar",
        32: "guitar_harmonics",
        33: "acoustic_bass",
        34: "electric_bass_finger",
        35: "electric_bass_pick",
        36: "fretless_bass",
        37: "slap_bass_1",
        38: "slap_bass_2",
        39: "synth_bass_1",
        40: "synth_bass_2",
        41: "violin",
        42: "viola",
        43: "cello",
        44: "contrabass",
        45: "tremolo_strings",
        46: "pizzicato_strings",
        47: "orchestral_harp",
        48: "timpani",
        49: "string_ensemble_1",
        50: "string_ensemble_2",
        51: "synth_string_1",
        52: "synth_string_2",
        53: "choir_aahs",
        54: "voice_oohs",
        //55:
        56: "orchestra_hit",
        57: "trumpet",
        58: "trombone",
        59: "tuba",
        60: "muted_trumpet",
        61: "french_horn",
        62: "brass_section",
        63: "synth_brass_1",
        64: "synth_brass_2",
        65: "soprano_sax",
        66: "alto_sax",
        67: "tenor_sax",
        68: "baritone_sax",
        69: "oboe",
        70: "english_horn",
        71: "bassoon",
        72: "clarinet",
        73: "piccolo",
        74: "flute",
        75: "recorder",
        76: "pan_flute",
        77: "blown_bottle",
        78: "shakuhachi",
        79: "whistle",
        80: "ocarina",
        81: "lead_1_square",
        82: "lead_2_swatooth",
        83: "lead_3_calliope",
        84: "lead_4_chiff",
        85: "lead_5_charang",
        86: "lead_6_voice",
        87: "lead_7_fifths",
        88: "lead_8_square",
        89: "pad_1_new_age",
        90: "pad_2_warm",
        91: "pad_3_polysynth",
        92: "pad_4_choir",
        93: "pad_5_bowed",
        94: "pad_6_metalic",
        95: "pad_7_halo",
        96: "pad_8_sweep",
        97: "fx_1_rain",
        98: "fx_2_soundtrack",
        99: "fx_3_crystal",
        100: "fx_4_atmosphere",
        101: "fx_5_brightness",
        102: "fx_6_goblins",
        103: "fx_7_echoes",
        104: "fx_8_scifi",
        105: "star",
        106: "banjo",
        107: "shamisen",
        108: "koto",
        109: "kalimba",
        110: "bagpipe",
        111: "fiddle",
        112: "shanai",
        113: "tinkle_bell",
        114: "agogo",
        115: "steel_drums",
        116: "woodblock",
        117: "taiko_drum",
        118: "melodic_tom",
        119: "synth_drum",
        120: "reverse_cymbal",
        121: "guitar_fret",
        122: "breath",
        123: "seashore",
        124: "bird_tweet",
        125: "telephone_ring",
        126: "helicopter",
        127: "applause",
        128: "gunshot",
    }

    initialVolume:number = 100;
    // Começamos na oitava 
    initialOctave:number = 4;
    // Em General MIDI, 1 corresponde a "Acoustic Grand Piano"
    initialInstrumentMidiNumber:number = 1;

    currentVolume: number;
    currentOctave: number;
    currentInstrument:InstrumentState = { midiNumber:this.initialInstrumentMidiNumber, name:this.instrumentList[this.initialInstrumentMidiNumber] };

    constructor(props: any) {
        super(props);
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
        this.currentInstrument.name = this.instrumentList[newMidiNumber];
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
                        this.currentInstrument.name = this.instrumentList[114]
                        break
                    case 'O':
                    case 'o':
                    case 'I':
                    case 'i':
                    case 'U':
                    case 'u':
                        // 7 é o número MIDI para o instrumento Cravo
                        this.currentInstrument.midiNumber = 7
                        this.currentInstrument.name = this.instrumentList[7]
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
                        this.currentInstrument.name = this.instrumentList[15]
                        break
                    case ';':
                        // 76 é o número MIDI para o instrumento Flauta de Pã
                        this.currentInstrument.midiNumber = 76
                        this.currentInstrument.name = this.instrumentList[76]
                        break
                    case ',':
                        // 20 é o número MIDI para o instrumento Órgão de Tubos
                        this.currentInstrument.midiNumber = 20
                        this.currentInstrument.name = this.instrumentList[20]
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
            MIDI.noteOn(0, notePlayed, noteVelocity, noteDelay)
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