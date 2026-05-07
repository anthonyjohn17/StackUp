// StackUp — fixed header scroll styling + mobile nav toggle.

var header = document.querySelector('header');
let	overlayVid = document.querySelector('.vignette-overlay');
let	textVid = document.querySelector('.text-vid');

window.addEventListener('scroll', function() {
	var scrollY = window.scrollY;
    var maxScroll = 100; // Scroll distance where the blur/header transition tops out.
    var progress = Math.min(scrollY / maxScroll, 1);

    // Adjust StackUp header chrome while scrolling.
    if (scrollY > 0) {
		header.style.marginTop = '0';
		header.style.borderBottom = '1px solid #d2d2d7';
		if (overlayVid)
			overlayVid.style.backdropFilter = `blur(0px)`;
		if (textVid)
			textVid.classList.add("active");
    } else {
		header.style.marginTop = '10px';
		header.style.borderBottom = '';
		if (overlayVid)
			overlayVid.style.backdropFilter = `blur(5px)`;
		if (textVid)
			textVid.classList.remove("active");
    }

	// Fade `text-vid` over the hero video (StackUp results intro).
	var gradientStart = 0 + (progress * 100);
	var gradientEnd = 100 - (progress / 100);
	if (overlayVid)
		overlayVid.style.background = `radial-gradient(circle, rgba(0, 0, 0, 0) ${gradientStart}%, rgba(0, 0, 0, 0.8) ${gradientEnd}%)`;
});
// StackUp — mobile menu open/close on `.menu-icon`.
document.querySelector('.menu-icon').addEventListener('click', toggleMenu);

function toggleMenu() {
	console.log("menu icon clicked");
	document.querySelector('.menu-icon').classList.toggle('active');
	document.querySelector('.navbar').classList.toggle('active');
	document.querySelector('.background-nav').classList.toggle('active');
}









