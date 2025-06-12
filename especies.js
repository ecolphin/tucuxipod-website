let currentPlayer = null;

function loadYouTubeAPI() {
  if (window.YT && window.YT.Player) {
    return;
  }
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {}

function createPlayer(videoId, callback) {
  const playerId = 'player_' + videoId + '_' + Date.now();
  const playerDiv = document.createElement('div');
  playerDiv.id = playerId;
  document.getElementById('hiddenPlayers').appendChild(playerDiv);

  const player = new YT.Player(playerId, {
    height: '1',
    width: '1',
    videoId: videoId,
    playerVars: {
      'autoplay': 1,
      'controls': 0,
      'disablekb': 1,
      'fs': 0,
      'modestbranding': 1,
      'rel': 0,
      'showinfo': 0
    },
    events: {
      'onReady': function(event) {
        callback(player);
      }
    }
  });

  return player;
}

function stopCurrentAudio() {
  if (currentPlayer) {
    try {
      currentPlayer.stopVideo();
      currentPlayer.destroy();
    } catch (e) {}
    currentPlayer = null;
  }
}

function playAudio(videoId) {
  stopCurrentAudio();
  createPlayer(videoId, function(player) {
    currentPlayer = player;
    player.playVideo();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadYouTubeAPI();
});

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;