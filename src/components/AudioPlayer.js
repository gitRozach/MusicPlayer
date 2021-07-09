import '../scss/AudioPlayer.css';
import AudioPlayerContent from './AudioPlayerContent';
import AudioPlayerItem from './AudioPlayerItem';
import { useState, useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';

var audioContext = new AudioContext();
var audioAnalyser = audioContext.createAnalyser();
audioAnalyser.fftSize = 64;
var audioGain = audioContext.createGain();

var audioAnalysisBuffer = new Uint8Array(audioAnalyser.frequencyBinCount);

var audioPlayer = document.getElementById('audioPlayer');
var audioSource = audioContext.createMediaElementSource(audioPlayer);

var bassStartIndex = 0;
var bassEndIndex = audioAnalyser.frequencyBinCount / 6;
var melodicStartIndex = audioAnalyser.frequencyBinCount * (5 / 6);
var melodicEndIndex = audioAnalyser.frequencyBinCount;

function AudioPlayer() {
  const $ = window.$;
  
  const [currentDuration, setCurrentDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [isTracklistOpen, setTracklistOpen] = useState(false);

  let tracks = ['../audio/Track1.mp3', '../audio/Track2.mp3', '../audio/Track3.mp3'];
  let currentTrackIndex = 0;

  /*useEffect(() => {
    setInterval(() => {
      visualizeAudioFrequency();
    }, 100);
  });*/

  $( document ).ready(() => {
    audioContext.resume()
    audioPlayer.onplay = () => audioContext.resume();

    audioSource.connect(audioGain);
    audioSource.connect(audioContext.destination);
    audioSource.connect(audioAnalyser);

    audioPlayer.addEventListener('timeupdate', (event) => {
      //$('#SliderTime').stop(true,true).animate({'value':(currentTime +.25)/totalDuration*100+'%'},50,'linear');
      document.getElementById('SliderTime').value = ((audioPlayer.currentTime / audioPlayer.duration) * 100.0).toString();
    });

    visualizeAudioFrequency();
  });

  function onPlayModeClicked() {
    console.log('Changing Playmode');
  }

  function onLibraryClicked() {
    console.log('Open/Close Library');
    setTracklistOpen(!isTracklistOpen);
  }

  function onOpenTracksClicked() {
    $( "#FileInput" ).trigger("click");
  }

  function playTrack(trackIndex) {
    document.getElementById('audioPlayer').src = tracks[trackIndex];
    document.getElementById('audioPlayer').play();

    document.getElementById('IconPlayPause').classList.add("fa-pause");
    //setPlaying(true);
  }

  function resumeTrack() {
    document.getElementById('audioPlayer').play();

    document.getElementById('IconPlayPause').classList.add("fa-pause");
    setPlaying(true);
  }

  function pauseTrack() {
    document.getElementById('audioPlayer').pause();

    document.getElementById('IconPlayPause').classList.add("fa-play");
    setPlaying(false);
  }

  function handleOpenedTracks(fileEvent) {
    /*var jsmediatags = require("jsmediatags");

    new jsmediatags.Reader(content).setTagsToRead(["title", "artist","picture","lyrics"]).read({
      onSuccess: function(tag) {
        var tags = tag.tags;
        var base64String = "";

        for (var i = 0; i < tags.picture.data.length; i++) {
          base64String += String.fromCharCode(tags.picture.data[i]);
        }
        var dataUrl = "data:" + tags.picture.format + ";base64," +window.btoa(base64String);

        document.getElementById('IconImg').setAttribute('src', dataUrl);
      },
      onError: function(error) {
        console.log(':(', error.type, error.info);
      }
    });*/

    var openedFiles = fileEvent.target.files;
    var uploadDatei = openedFiles[0];

    // Ein Objekt um Dateien einzulesen
    var reader = new FileReader();

    // Auslesen der Datei-Metadaten
    var senddata = new Object();
    senddata.name = uploadDatei.name;
    senddata.date = uploadDatei.lastModified;
    senddata.size = uploadDatei.size;
    senddata.type = uploadDatei.type;

    // Wenn der Dateiinhalt ausgelesen wurde...
    reader.onload = function(theFileData) {
      senddata.fileData = theFileData.target.result;
      console.log('File upload finished: ' + senddata.fileData);
      document.querySelector('#audioPlayer').src = senddata.fileData;
    }

    // Die Datei einlesen und in eine Data-URL konvertieren
    reader.readAsDataURL(uploadDatei);
    setTracklistOpen(false);
  }

  function handleSliderTimeChange(changeEvent) {
    console.log(changeEvent.value);
  }

  function onPlayPauseClicked() {
    if(audioContext.state === 'suspended') {
      audioContext.resume().then(() => {});
    }

    if (isPlaying) {
      pauseTrack();
      setPlaying(false);
    } else {
      resumeTrack();
      setPlaying(true);
    }
  }

  function onPreviousClicked() {
    currentTrackIndex -= 1;
    if (currentTrackIndex < 0) {
      currentTrackIndex = tracks.length - 1;
    }
    playTrack(currentTrackIndex);

    console.log('Previous Song');
  }

  function onNextClicked() {
    currentTrackIndex += 1;
    if (currentTrackIndex >= tracks.length) {
      currentTrackIndex = 0;
    }
    playTrack(currentTrackIndex);

    console.log('Next Song');
  }

  function visualizeAudioFrequency() {
    if (!isPlaying) return;
    
    requestAnimationFrame(visualizeAudioFrequency);
    audioAnalyser.getByteFrequencyData(audioAnalysisBuffer);

    const frequencyRing = document.getElementById("FrequencyCircle1");
    const frequencyCircle1 = document.getElementById("FrequencyCircle2");
    const frequencyCircle2 = document.getElementById("FrequencyCircle3");

    for (let bassIndex = bassStartIndex; bassIndex < bassEndIndex; ++bassIndex) {
      let newWidth = Math.pow(audioAnalysisBuffer[bassIndex], 1.25).toString() + "px";
      frequencyCircle1.style.width = newWidth;
      frequencyCircle1.style.height = newWidth;
      frequencyCircle2.style.width = newWidth / 1.5;
      frequencyCircle2.style.height = newWidth / 1.5;
    }

    for (let melodicIndex = melodicStartIndex; melodicIndex < melodicEndIndex; ++melodicIndex) {
      let newWidth = Math.pow(audioAnalysisBuffer[melodicIndex], 1.5).toString() + "px";
      frequencyRing.style.width = newWidth;
      frequencyRing.style.height = newWidth;
    }
  }

  var loadedItems = [];
  for (let loadIndex = 0; loadIndex < 10; ++loadIndex) {
    loadedItems.push(<AudioPlayerItem title={`Title${loadIndex + 1}`} album="Unbekannt" artist="Unbekannt" duration="1000" cover="../img/icon_cd.jpg"/>);
  }

  return (

    <div className="App">

      <nav className="AppHeader">
      </nav>

      <div className="AppContent">
        <AudioPlayerContent />
        
        <div id="TrackList" className={isTracklistOpen ? "TracklistOpen" : "TracklistClosed"}>
          {loadedItems}
          <button onClick={onOpenTracksClicked}>
            <i className="far fa-folder-open"></i>
            <input id="FileInput" type="file" accept="audio/mp3" onChange={handleOpenedTracks} multiple/>
          </button>
        </div>
      </div>

      <div className="AppControls">
        
        <div id="SliderTimeContainer">
          <p>0:00</p>
          <input id="SliderTime" type="range" min="0" max="100" value="0" step="0.001" onInput="handleSliderTimeChange(this.value)"/>
          <p>3:09</p>
        </div>
        
        <div id="ButtonContainer">
          <button id="ButtonPlayMode" onClick={onPlayModeClicked}><i className="fas fa-random"></i></button>
          <button id="ButtonPreviousTrack" onClick={onPreviousClicked}><i className="fas fa-step-backward"></i></button>
          <button id="ButtonPlayPause" onClick={onPlayPauseClicked}><i id="IconPlayPause" className="fas fa-play"></i></button>
          <button id="ButtonNextTrack" onClick={onNextClicked}><i className="fas fa-step-forward"></i></button>
          <button id="ButtonTracklist" onClick={onLibraryClicked}><i className="fas fa-list"></i></button>
        </div>
        
      </div>
      
    </div>
  );
}

export default AudioPlayer;
