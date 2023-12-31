import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Vimeo(iframe);
const saveTime = localStorage.getItem('videoplayer-current-time');

if (!saveTime) {
  saveTime = '0';
}

const newLocalStorage = throttle((currentTime) => {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000); 

if (saveTime) {
  player.setCurrentTime(parseFloat(saveTime)).catch((error) => {
    console.error('Unable to set current time:', error);
  });
}

player.on('timeupdate', ({ seconds }) => {
  newLocalStorage(seconds);
});
player.on('play', () => {
});