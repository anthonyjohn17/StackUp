

// StackUp — scroll-synced hero video + inject saved celebrity into results DOM.

// Drive video playback from scroll position (StackUp results hero).
let lastPosition = -1;
var frameNumber = 0, // start video at frame 0
    // lower numbers = faster playback
    playbackConst = 200, 
    // get page height from video duration
    setHeight = document.getElementById("videoContainer"), 
    // select video element         
    vid = document.getElementById('scroll-video'); 

// dynamically set the page height according to video length
vid.addEventListener('loadedmetadata', function() {
  setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
});

// Throttle scroll handler so scroll-linked playback stays smooth.
function throttle(func, limit) {
	let lastFunc;
	let lastRan;
	return function() {
	  const context = this;
	  const args = arguments;
	  if (!lastRan) {
		func.apply(context, args);
		lastRan = Date.now();
	  } else {
		clearTimeout(lastFunc);
		lastFunc = setTimeout(function() {
		  if ((Date.now() - lastRan) >= limit) {
			func.apply(context, args);
			lastRan = Date.now();
		  }
		}, limit - (Date.now() - lastRan));
	  }
	}
  }
  
  var scrollPlayThrottled = throttle(function() {
	var frameNumber  = window.pageYOffset / playbackConst;
	vid.currentTime  = frameNumber;
  }, 100); // Run at most every ~100ms while scrolling.
  
  window.addEventListener('scroll', scrollPlayThrottled);
  


  // Fill `.star-name` slots from StackUp selection step (localStorage).
  const starNameStorage = localStorage.getItem('starName');
  const starName = starNameStorage.replace(/([a-z])([A-Z])/g, '$1 $2'); // camelCase line breaks → spaced name.


  if (starName){
	const elements = document.querySelectorAll('.star-name');
	elements.forEach(function(element) {
		element.textContent = starName;
	});
  }
  else{
	console.log('StackUp: no celebrity in localStorage.');
  }


// Profile image URL from StackUp selection step (localStorage).

let profileImage = localStorage.getItem("profileImage");
document.querySelector(".profileImage").src = profileImage;