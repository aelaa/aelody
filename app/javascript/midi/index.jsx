import React from 'react';
import ReactDOM from 'react-dom';
import KeyboardContainer from 'midi/components/KeyboardContainer';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <KeyboardContainer />,
    document.getElementById('pianoWrapper')
  );
});
