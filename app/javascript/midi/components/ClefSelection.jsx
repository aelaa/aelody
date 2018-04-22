import React from 'react';

export default () => {
  return (
    <div id="DA-ClefSelection" className="DA-NoteClefSelection">
      <input type="radio" name="clef" id="clef-g" value="G-2" />
      <label htmlFor="clef-g" >&#x1d11e;</label>
      <input type="radio" name="clef" id="clef-f" value="F-4" />
      <label htmlFor="clef-f" >&#x1d122;</label>
    </div>
    ////when the clef is changed updatePreviewWithClef() is called
    //bindClefSelectionToFunction(updatePreviewWithClef)
  )
}
