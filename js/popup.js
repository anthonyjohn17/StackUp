// StackUp — modal panels for bento “see more” tiles.

let rects = document.querySelectorAll(".clickable-rect");
let popups = document.querySelectorAll(".popup-wrapper");
let background = document.querySelector(".background-popup");
let closePopups = document.querySelectorAll(".close-popup");
let continueLink = document.querySelectorAll(".continue-link");

for (let i = 0; i < rects.length; i++){
	rects[i].addEventListener("click", () => {
		console.log("rect clicked !");
		popups[i].classList.add("active");
		background.classList.add("active");
	})
}

for (let i = 0; i < closePopups.length; i++){
	closePopups[i].addEventListener("click", () => {
		popups[i].classList.remove("active");
		background.classList.remove("active");
	})
}

for (let i = 0; i < continueLink.length; i++){
	continueLink[i].addEventListener("click", () => {
		popups[i].classList.remove("active");
		background.classList.remove("active");
	})
}

background.addEventListener("click", () => {
	for (let popup of popups){
		if (popup.classList.contains("active")){
			popup.classList.remove("active");
		}
	}
	background.classList.remove("active");
})