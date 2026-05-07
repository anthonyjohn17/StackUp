// StackUp — results page figures (derived comparisons, counters, bento stats).

const monthlySalaryUser = localStorage.getItem('userSalary');
let netWorthStar = localStorage.getItem('netWorth');
const annualsalaryUser = monthlySalaryUser * 12;
const annualsalaryStar = Math.floor(netWorthStar / 10);
let netWorthUser = annualsalaryUser * 25;
const earnMinuteStar = netWorthStar / 10 / 525600;
const earnHourStar = netWorthStar / 10 / 8760;

// Profile badge: displayed celebrity net worth (StackUp).
document.querySelector('.price-tag').textContent = "$" + netWorthStar;

// when user can buy jet
let field = document.getElementById('buy-jet-time');
const costJet = 50000000;
let output = Math.floor(costJet / annualsalaryUser);
output > 1 ? output += " years" : output += " year"
field.textContent = output;

// when star can buy jet
field = document.getElementById('buy-jet-time-star');
output = Math.floor(costJet / earnHourStar);
output > 1 ? output += " hours" : output += " hour"
field.textContent = output;

//frac value of salary
const fracField = document.getElementById('frac');
let started = false;
output = (annualsalaryUser * 100) / netWorthStar;
if (output < 1)
	output = jarteDecimal(output, 10);
else
	output = 34.5;
const options = {
	decimalPlaces: getlength(output) - 2,
	duration: 2,
	suffix: '%'
};

let numAnim = new countUp.CountUp('frac', output, options);

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		// Check if the element is visible and animation hasn't started yet
		if (entry.isIntersecting && !started) {
			numAnim.start();
			started = true; // Set the flag so it doesn't start again
		}
	});
}, { threshold: 0.5 }); // Configure to trigger when 50% of the element is visible

observer.observe(fracField);




// -----------------------------
// StackUp bento cards & popups
// -----------------------------

// time for the star to earn user salary

let fields = document.querySelectorAll('.time-to-earn');
let fieldAnnual = document.querySelector('.time-to-earn-annual');
let fieldLife = document.querySelector('.time-to-earn-life');


let timeToEarn = Math.floor(monthlySalaryUser / earnMinuteStar);

for (let field of fields) {
	if (timeToEarn < 1){
		if (timeToEarn < 1) timeToEarn = 0.16;
		field.textContent = Math.floor(timeToEarn * 60, 10) + " seconds";
	}
	else if (timeToEarn > 60){
		field.textContent = Math.floor(timeToEarn / 60, 10) + " hours";
	}
	else{
		field.textContent = Math.floor(timeToEarn, 10) + " minutes";
	}
}

let timeToEarnAnnual = Math.floor(annualsalaryUser / earnMinuteStar);
if (timeToEarnAnnual < 1){
	if (timeToEarnAnnual < 1) timeToEarnAnnual = 0.16;
	fieldAnnual.textContent = Math.floor(timeToEarnAnnual * 60, 10) + " seconds";
}
else if (timeToEarnAnnual > 60){
	fieldAnnual.textContent = Math.floor(timeToEarnAnnual / 60, 10) + " hours";
}
else{
	fieldAnnual.textContent = Math.floor(timeToEarnAnnual, 10) + " minutes";
}



let timeToEarnLife = Math.floor(netWorthUser / earnMinuteStar);
if (timeToEarnLife < 1){
	if (timeToEarnLife < 1) timeToEarnLife = 0.16;
	fieldLife.textContent = Math.floor(timeToEarnLife * 60, 10) + " seconds";
}
else if (timeToEarnLife > 60){
	fieldLife.textContent = Math.floor(timeToEarnLife / 60, 10) + " hours";
}
else{
	fieldLife.textContent = Math.floor(timeToEarnLife, 10) + " minutes";
}






// since how long user have to work
field = document.getElementById("since-christ");
let yearsSinceChrist = annualsalaryStar / annualsalaryUser - 2024;

field.textContent = -Math.abs(Math.floor(yearsSinceChrist));

// one year revenue


field = document.querySelector(".one-year-earn");
field.textContent = "$" + Math.floor(annualsalaryStar / 1.5);



// size of appartment
const priceMeter = 10000;
field = document.getElementById("size-appart");
let appartSize = Math.floor(monthlySalaryUser / 2 / priceMeter);
if (appartSize < 1) appartSize = 1;
field.textContent = appartSize + "m²";

field = document.querySelector(".size-appart-class");
field.textContent = appartSize + " square meters (" + Math.floor(appartSize * 10.6) + " square feet)"

// how long user stay in maldive
field = document.getElementById("days-maldives");
let dayCostMaldive = 500;
let dayInMaldives = Math.floor(annualsalaryUser / dayCostMaldive);
field.textContent = dayInMaldives + " Days";
// and star in maldives
field = document.getElementById("days-maldives-star");
field.textContent = Math.floor(netWorthStar / dayCostMaldive);


// how many time user can go to maldives
document.querySelector(".day-maldive-1").textContent = dayInMaldives;
document.querySelector(".day-maldive-2").textContent = Math.floor(netWorthStar / dayCostMaldive);
document.querySelector(".day-maldive-3").textContent = Math.floor((netWorthStar / dayCostMaldive) / 365);


field = document.querySelector(".nb-iphone");
let iphoneCost = 1200;
let nbIphone = Math.floor(earnMinuteStar * 5 / iphoneCost);
if (nbIphone < 1) nbIphone = 1;
field.textContent = nbIphone + "x";



// dumb purchase section
field = document.querySelector(".green-twingo");
let twingoCost = 10000;
let nbTwingo = Math.floor(earnMinuteStar * 5 / twingoCost);
if (nbTwingo < 1) nbTwingo = 1;
field.textContent = nbTwingo;

field = document.querySelector(".ps5");
let ps5Cost = 500;
let nbPs5 = Math.floor(earnMinuteStar * 5/ ps5Cost);
if (nbPs5 < 1) nbPs5 = 1;
field.textContent = nbPs5;


field = document.querySelector(".baguette");
let baguetteCost = 1;
let nbBaguette = Math.floor(earnMinuteStar * 5 / baguetteCost);
if (nbBaguette < 1) nbBaguette = 1;
field.textContent = nbBaguette;



// charity section
field = document.querySelector(".charity1");
let percentageUser = Math.floor(0.2 * monthlySalaryUser);
let percentageStar = Math.floor(0.2 * netWorthStar);

field.textContent = "$" + percentageUser;

field = document.querySelector(".charity2");
field.textContent = "$" + percentageStar;










// Helpers for StackUp percentage formatting.

// Trim noisy fractional digits for small percentages.
function jarteDecimal(num, numberDecimal) {
	console.log(num);
	if (num === 0) return 0;
	let scale = 10;
	while (num * scale < 1) {
		scale *= 100;
	}
	return Math.floor(num * scale * numberDecimal) / (scale * numberDecimal);
}



// Digit count helper for CountUp decimal precision.
function getlength(number) {
	return number.toString().length;
}
	




// -----------------------------
// StackUp live “star earnings since load” counter
// -----------------------------

let startTime = Date.now();
let salaryRate = earnMinuteStar / 60; // Earnings per second (derived rate).
let salaryPerTenth = salaryRate / 10; // Earnings per tenth of a second.


// Format elapsed wall-clock time for the counter label.
function formatElapsedTime(elapsedTime) {
	let minutes = Math.floor(elapsedTime / 60);
	let seconds = Math.floor((elapsedTime % 60));
	let timeString = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}, ` : '';
	timeString += `${seconds} second${seconds > 1 ? 's' : ''}`;
	return timeString;
}

// Push updated dollar + elapsed labels into the DOM.
function updateCounters() {
  let elapsedTime = (Date.now() - startTime) / 1000;
  let elapsedTenths = Math.floor(elapsedTime * 10);
  let salary = (elapsedTenths * salaryPerTenth).toFixed(2);

  document.getElementById('time-counter').innerText = formatElapsedTime(elapsedTime);
  document.getElementById('salary-counter').innerText = parseFloat(salary).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Tick frequently enough for a smooth StackUp-style ticker (~10 Hz).
setInterval(updateCounters, 100);