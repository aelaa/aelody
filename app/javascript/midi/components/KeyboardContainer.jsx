import React from 'react';
import Keyboard from 'midi/components/Keyboard'
import ClefSelection from 'midi/components/ClefSelection'
import NoteLengthSelection from 'midi/components/NoteLengthSelection'
import NoteLine from 'midi/components/NoteLine'
import * as constants from 'midi/components/constants'
import {
  htmlForKeyboardWithOctaves,
} from 'midi/components/piano.js';

class KeyboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      octave: constants.octaves.C3,
      clef: constants.clefs.G4,
      needClefSelection: true,
      needNoteLengthSelection: true,
      withShiftButtons: false,
    }
  }

  render() {
    return (
      <div id='keyboardContainer'>
        {this.state.needNoteLengthSelection && <NoteLengthSelection />}
        {this.state.needClefSelection && <ClefSelection />}
        <Keyboard
          withShiftButtons={this.withShiftButtons}
          keyboardHTML={htmlForKeyboardWithOctaves(3, constants.octaves.C4)}
        />
        <NoteLine />
      </div>
    )
  }
}

export default KeyboardContainer;
