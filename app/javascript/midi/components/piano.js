export var octaves = {
  C1 : 0, //,,,
  C2 : 1, //,,
  C3 : 2, //,
  C4 : 3, //'
  C5 : 4, //''
  C6 : 5, //'''
  C7 : 6  //''''
}

var clefs = {
  G4 : 'G-2',
  F3 : 'F-4'
}

var MAX_OCTAVES =  octaves.C7;
var KEYS_PER_OCTAVE = 17;
var _displayedOctaves = 3;
var _startOctave = 3;
var _selectedClef = clefs.G4

var verovioToolkit = new verovio.toolkit()

function svgNotesForPlaineEasieCode(paeCode, clef, width, scalePercent) {
  if (typeof(clef)==='undefined') clef = _selectedClef
  if (typeof(width)==='undefined') width = 400
  if (typeof(scalePercent)==='undefined') scalePercent = 20

  var data = "@clef:" + clef + "\n"
  data += "@keysig:" + " " + "\n"
  data += "@timesig:" + " " + "\n"
  data += "@data:" + paeCode

  var pageWidth = width * 100/scalePercent //so the resulting width of the SVG element is always as defined in width

  var options = JSON.stringify({
    inputFormat: 'pae',
    pageHeight: 500,
    pageWidth: pageWidth,
    ignoreLayout: 1,
    border: 0,
    scale: scalePercent,
    adjustPageHeight: 1
  })

  var notesSVG = verovioToolkit.renderData(data, options);
  return notesSVG
}

export function htmlForKeyboardWithOctaves(numberOfOctaves, startOctave) {
  function setSelectedClef(newClef) {
    var isF3 = newClef == clefs.F3
    var isG4 = newClef == clefs.G4
    _selectedClef = newClef

    var radioGroup = $('input[name="clef"]')
    radioGroup.val([_selectedClef]); //this does not work. dont know why
    return _selectedClef
  }

  function numberOfDisplayedOctaves() {
    return _displayedOctaves
  }

  function paeCodeForKeyAtIndex(keyIndex, baseOctave, duration) {
    var octaveOffset = Math.floor(keyIndex / KEYS_PER_OCTAVE)
    var octaveIndex = baseOctave + octaveOffset
    var octaveSigns = [",,,", ",,", ",", "'", "''", "'''", "''''"]
    var octaveSign = octaveSigns[octaveIndex]
    var notes = [duration + "C",
      "x" + duration + "C",
      "b" + duration + "D",
      duration + "D",
      "x" + duration + "D",
      "b" + duration + "E",
      duration + "E",
      duration + "F",
      "x" + duration + "F",
      "b" + duration + "G",
      duration + "G",
      "x" + duration + "G",
      "b" + duration + "A",
      duration + "A",
      "x" + duration + "A",
      "b" + duration + "B",
      duration + "B"]
    var note = notes[keyIndex % KEYS_PER_OCTAVE]
    note = octaveSign + note
    return note
  }

  setSelectedClef(clefs.G4)

  if (typeof(numberOfOctaves)==='undefined') numberOfOctaves = 3
  if (typeof(startOctave)==='undefined') startOctave = octaves.C4
  var showLabels = true

  //back keys are seperated to fields sharp and flat; this enables specific input
  _displayedOctaves = limitToRange(numberOfOctaves, 1, MAX_OCTAVES)
  _startOctave = limitToRange(startOctave, octaves.C1, octaves.C6)

  var currentOctave = _startOctave

  var keyhoardHTML = '\
        <ul class="DA-PianoKeyboard">\n'
  for (var i = 0; i < _displayedOctaves; i++) {
    if (showLabels) {
      keyhoardHTML += '\
            <li class="whiteKey"><p>C' + (currentOctave + 1) + '</p></li>\n\
            <li class="blackKeySharp"><p>♯</p></li>\n\
            <li class="blackKeyFlat"><p>♭</p></li>\n'
    } else {
      keyhoardHTML += '\
            <li class="whiteKey"></li>\n\
            <li class="blackKeySharp"></li>\n\
            <li class="blackKeyFlat"></li>\n'
    }
    keyhoardHTML += '\
            <li class="whiteKey"></li>\n\
            <li class="blackKeySharp"></li>\n\
            <li class="blackKeyFlat"></li>\n\
            <li class="whiteKey"></li>\n\
            <li class="whiteKey"></li>\n\
            <li class="blackKeySharp"></li>\n\
            <li class="blackKeyFlat"></li>\n\
            <li class="whiteKey"></li>\n\
            <li class="blackKeySharp"></li>\n\
            <li class="blackKeyFlat"></li>\n\
            <li class="whiteKey"></li>\n\
            <li class="blackKeySharp"></li>\n\
            <li class="blackKeyFlat"></li>\n\
            <li class="whiteKey"></li>\n'
    currentOctave++
  }
  keyhoardHTML += '\
        </ul>\n'
  return keyhoardHTML;
}

export function bindClefSelectionToFunction(callback) {
  $("#DA-ClefSelection input").click(function () {
    var selectedRadioBox = $("#DA-ClefSelection input[type='radio']:checked")
    if (selectedRadioBox.length > 0) {
      _selectedClef = selectedRadioBox.val();
    }
    callback(this, _selectedClef)
  })
}

export function bindKeysToFunction(callback) {

  $(".DA-PianoKeyboard li").click(function () {
    var indexOfKey = $(this).index()
    var noteDuration = 4;
    var selectedRadioBox = $("#DA-NoteSelection input[type='radio']:checked")
    if (selectedRadioBox.length > 0) {
      noteDuration = selectedRadioBox.val();
    }
    var paeNote = paeCodeForKeyAtIndex(indexOfKey, _startOctave, noteDuration)
    callback(this, paeNote)
  })
}

function raiseOctave() {
  _startOctave = Math.min(_startOctave + 1, MAX_OCTAVES - numberOfDisplayedOctaves() + 1)
  updateOctaveLabels()
  updateShiftOctaveButtonsEnabled()
}

function lowerOctave() {
  _startOctave = Math.max(_startOctave - 1, 0)
  updateOctaveLabels()
  updateShiftOctaveButtonsEnabled()
}

function updateShiftOctaveButtonsEnabled() {
  var isMax = _startOctave == MAX_OCTAVES - _displayedOctaves + 1
  var isMin = _startOctave == 0
  $("#raiseOctave").prop('disabled', isMax)
  $("#lowerOctave").prop('disabled', isMin)
}

function updateOctaveLabels(){
  $('.whiteKey>p').each(function(i, domLabel) {
    var label = $(domLabel)
    var currentOctave = _startOctave + 1 + i
    label.text("C" + currentOctave)
  })
}

function limitToRange(number, min, max) {
  return Math.min(Math.max(min, number), max)
}

//this stores all keyboard input
var plaineEasieCodes = []
var selectedClef = clefs.G4

//this is called whenever a piano key is pressed
function updatePreviewWithNote(sender, paeNote) {
  plaineEasieCodes.push(paeNote)
  updateNotesSVG()
}

//this is called when the user changes the clef for display
function updatePreviewWithClef(sender, clef) {
  selectedClef = clef
  updateNotesSVG()
}

//delete last input
export function deleteLast() {
  plaineEasieCodes.pop()
  updateNotesSVG()
}

function updateNotesSVG() {
  //render the notes to an SVG using the Verovio tookit
  //width of the svg is 800px and note scaling 50%
  var notesSVG = svgNotesForPlaineEasieCode(plaineEasieCodes.join(""), selectedClef, 800, 50)
  //insert thes SVG code in our div
  var svgContainerDiv = $('#svgNotesContainer')
  svgContainerDiv.html(notesSVG)
}
