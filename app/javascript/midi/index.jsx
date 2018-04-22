import React from 'react';
import ReactDOM from 'react-dom';
import {
  htmlForKeyboardWithOctaves,
  bindClefSelectionToFunction,
  bindKeysToFunction,
  setSelectedClef,
  deleteLast,
  octaves
} from 'midi/pianoKeyboard/piano.js';

document.addEventListener('DOMContentLoaded', () => {
  var keyboardHTML = htmlForKeyboardWithOctaves(3, octaves.C4, true, true)

  ReactDOM.render(
    <div id='piano'>
      <div id='keyboardContainer' dangerouslySetInnerHTML={{__html: keyboardHTML}}>
      </div>
      <div id='svgNotesContainer'></div>
      <button id='backspaceButton' onClick={deleteLast()}>Delete</button>
    </div>,
    document.getElementById('pianoWrapper')
  );

  //when keys are pressed updatePreview() is called
  // bindKeysToFunction(updatePreviewWithNote)
  ////when the clef is changed updatePreviewWithClef() is called
  //bindClefSelectionToFunction(updatePreviewWithClef)
});
