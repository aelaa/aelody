import React from 'react';

class Keyboard extends React.Component {
  render() {
    return (
      <div className="DA-Keyboardcontainer">
        { this.props.withShiftButtons && <button type="button" id="lowerOctave" onclick="lowerOctave()">˂</button> }
        <div dangerouslySetInnerHTML={{__html: this.props.keyboardHTML}} />
        { this.props.withShiftButtons && <button type="button" id="raiseOctave" onclick="raiseOctave()">˃</button> }
      </div>
      //when keys are pressed updatePreview() is called
      // bindKeysToFunction(updatePreviewWithNote)
    )
  }
}

export default Keyboard;
