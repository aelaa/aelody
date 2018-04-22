import React from 'react';

export default () => {
  return (
    <div id="DA-NoteSelection" className="DA-NoteClefSelection">
      <input type="radio" name="notes" id="note-1-1" value="1" />
      <label htmlFor="note-1-1" >1/1</label>

      <input type="radio" name="notes" id="note-1-2" value="2" />
      <label htmlFor="note-1-2" >1/2</label>

      <input type="radio" name="notes" id="note-1-4" defaultChecked value="4" />
      <label htmlFor="note-1-4" >1/4</label>

      <input type="radio" name="notes" id="note-1-8" value="8" />
      <label htmlFor="note-1-8" >1/8</label>

      <input type="radio" name="notes" id="note-1-16" value="6" />
      <label htmlFor="note-1-16" >1/16</label>

      <input type="radio" name="notes" id="note-1-32" value="3" />
      <label htmlFor="note-1-32" >1/32</label>
    </div>
  )
}
