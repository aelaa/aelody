import React from 'react';
import { deleteLast } from 'midi/components/piano.js';

export default () => {
  return (
    <div>
      <div id='svgNotesContainer'></div>
      <button id='backspaceButton' onClick={deleteLast()}>Delete</button>
    </div>
  )
}
