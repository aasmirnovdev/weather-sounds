import data from './data';
import './main.scss';

const DEFAULT_VOLUME = 0.5;
const mainBlock = document.querySelector('.weather');
const weatherList = document.querySelector('.sounds');
const soundVolume = document.createElement('input');

mainBlock.append(soundVolume);
weatherList.classList.add('sound-list');
soundVolume.type = 'range';
soundVolume.min = 0;
soundVolume.max = 100;
soundVolume.value = DEFAULT_VOLUME * 100;

function changeVolume(evt) {
  const audio = document.querySelector('audio');
  if (!audio) return;
  audio.volume = evt.target.value / 100;
}

soundVolume.addEventListener('input', changeVolume);

function playSound(src) {
  let audio = document.querySelector('audio');

  if (audio && audio.src.includes(src)) {
    audio.paused ? audio.play() : audio.pause();
    return;
  }

  if (audio) {
    audio.pause();
    audio.remove();
  }

  audio = document.createElement('audio');
  audio.src = src;
  audio.volume = soundVolume.value / 100;
  weatherList.append(audio);
  audio.play();
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
  weatherList.append(soundList);
  soundList.append(button);

  button.addEventListener('click', () => {
    mainBlock.style.backgroundImage = `url(${item.bg})`;
    playSound(item.sound);
  });
});
