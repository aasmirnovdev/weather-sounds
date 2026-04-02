import data from './data';
import './main.scss';
import './calc';
import './normalizer';
import './fetch';

const DEFAULT_VOLUME = 0.5;
const mainBlock:HTMLDivElement | null = document.querySelector('.weather');
const weatherList = document.querySelector('.sounds');
const soundVolume = document.createElement('input');

if (mainBlock) {
  mainBlock.append(soundVolume);
}

if (weatherList) {
  weatherList.classList.add('sound-list');
}

if (soundVolume) {
  soundVolume.type = 'range';
  soundVolume.min = '0';
  soundVolume.max = '100';
  soundVolume.value = String(DEFAULT_VOLUME * 100);
}


function changeVolume(evt:Event) {
  const audio = document.querySelector('audio');
  if (!audio) return;
  const inputElement = evt.target as HTMLInputElement;
  audio.volume =  +inputElement.value / 100;
}

soundVolume.addEventListener('input', changeVolume);

function playSound(src:string) {
  let audio = document.querySelector('audio');

  if (audio && audio.src.includes(src)) {
    audio.paused ? audio.play() : audio.pause();
    return;
  }

  if (audio) {
    audio.pause();
    audio.remove();
  }

  if (weatherList) {
    audio = document.createElement('audio');
    audio.src = src;
    audio.volume = +soundVolume.value / 100;
    weatherList.append(audio);
    audio.play();
  }
}

data.forEach(item => {
  const button = document.createElement('button');
  const icon = document.createElement('img');
  const img = document.createElement('img');
  const soundList = document.createElement('div');

  icon.src = item.icon;
  img.src = item.bg;
  icon.classList.add('sound-icon');
  img.classList.add('sound-bg');
  button.classList.add('sound-button');

  button.append(icon);
  button.append(img);
  if (weatherList && mainBlock) {
    weatherList.append(soundList);
    soundList.append(button);

    button.addEventListener('click', () => {
      mainBlock.style.backgroundImage = `url(${item.bg})`;
      playSound(item.sound);
    });
  }
});
