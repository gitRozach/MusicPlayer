import '../scss/AudioPlayerContent.css';
import IconCover from '../img/icon_cd.jpg';

function AudioPlayerContent () {
    /*
    useEffect(() => simulateFrequencies(), []);
    function simulateFrequencies() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        const audioAnalyser = audioContext.createAnalyser();
        audioAnalyser.fftSize = 512;

        const audioAnalysisBuffer = new Uint8Array(audioAnalyser.frequencyBinCount);


        const frequencyVisualizer = document.querySelector("#frequency-visualizer");
        const coverImage = document.querySelector('#IconImg');
        const frequencyCircle1 = document.querySelector("#FrequencyCircle1");
        const frequencyCircle2 = document.querySelector("#FrequencyCircle2");
        const frequencyCircle3 = document.querySelector("#FrequencyCircle3");
        const frequencyCircle4 = document.querySelector("#FrequencyCircle4");
        const frequencyCircle5 = document.querySelector("#FrequencyCircle5");
        const frequencyCircle6 = document.querySelector("#FrequencyCircle6");

        function simulateImage() {
            let currentRadius = Math.random() * 50 + 400;
            coverImage.style.borderWidth = (Math.random() * 0.5).toString() + "rem";
            coverImage.style.width = currentRadius.toString() + "px";
            coverImage.style.height = currentRadius.toString() + "px";
        }

        function simulateCircle1() {
            let currentRadius = Math.random() * 700 + 100;
            frequencyCircle1.style.borderWidth = (Math.random() * 4).toString() + "rem";
            frequencyCircle1.style.width = currentRadius.toString() + "px";
            frequencyCircle1.style.height = currentRadius.toString() + "px";
        }

        function simulateCircle2() {
            let currentRadius = Math.random() * 500 + 100;
            frequencyCircle2.style.width = currentRadius.toString() + "px";
            frequencyCircle2.style.height = currentRadius.toString() + "px";
        }

        function simulateCircle3() {
            let currentRadius = Math.random() * 400 + 100;
            frequencyCircle3.style.width = currentRadius.toString() + "px";
            frequencyCircle3.style.height = currentRadius.toString() + "px";
        }

        function simulateCircle4() {
            let currentRadius = Math.random() * 300;
            frequencyCircle4.style.width = currentRadius.toString() + "px";
            frequencyCircle4.style.height = currentRadius.toString() + "px";
        }

        function simulateCircle5() {
            let currentRadius = Math.random() * 200;
            frequencyCircle5.style.width = currentRadius.toString() + "px";
            frequencyCircle5.style.height = currentRadius.toString() + "px";
        }

        function simulateCircle6() {
            let currentRadius = Math.random() * 100;
            frequencyCircle6.style.width = currentRadius.toString() + "px";
            frequencyCircle6.style.height = currentRadius.toString() + "px";
        }

        setInterval(() => {
            simulateImage();
            simulateCircle1();
            simulateCircle2();
            simulateCircle3();
        }, 200);
    }*/

    return (
        <div id="frequency-visualizer">
            <div className="FrequencyRing" id="FrequencyCircle1"></div>
            <div className="FrequencyCircle" id="FrequencyCircle2"></div>
            <div className="FrequencyCircle" id="FrequencyCircle3"></div>
            
            <div id="IconContainer">
                <img id="IconImg" src={IconCover} alt="" width="500px"></img>
            </div>
        </div>
    );
}

export default AudioPlayerContent;