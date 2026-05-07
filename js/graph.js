// StackUp — Chart.js visuals on the results page (expects globals from `result.js` + `fieldSalary.js`).

const monthlySalary = localStorage.getItem('userSalary');
const annualsalary = monthlySalary * 12;
const nameStar =  starNameStorage.replace(/([a-z])([A-Z])/g, '$1 $2');
const percentageMin = 0.57;
const gdpKenya = 50000000000;
const gdpCroatia = 107000000000;

const gdpNewYork = 2163208;
const gdpParis = 934168;



// Keep a minimum “you” slice so the doughnut stays readable (StackUp UX guardrail).
if (netWorthUser * 100 / netWorthStar < percentageMin){
	netWorthUser = percentageMin * netWorthStar / 100;
	console.log("User salary upgrade !");
}

console.log("User Worth: ", netWorthUser);
console.log("Star Worth: ", netWorthStar);


// -----------------------------
// StackUp doughnut chart
// -----------------------------

const canvas = document.getElementById('donnut');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = '../images/chart.png';

img.onload = () => {
	const fillPattern = ctx.createPattern(img, 'repeat');

	const data = {
		labels: ['You', nameStar],
		datasets: [{
			data: [netWorthUser, netWorthStar],
			backgroundColor: [
				'#2D2D2D',
				fillPattern
			],
			hoverBackgroundColor: [
				'#2D2D2D',
				fillPattern
			],
			borderColor: "transparent",
			borderRadius: 10,
			hoverBorderJoinStyle: "miter",
			rotation: -60,
			borderJoinStyle: "bevel",
		}]
	};

	const config = {
		type: 'doughnut',
		data: data,
		options: {
			plugins: {
				tooltip: {
					enabled: false
				}
			},
			animation: {
				animateRotate: true,
				animateScale: false,
				duration: 2000,
			},
			cutout: '60%',
			responsive: true,
			maintainAspectRatio: true
		}
	};

	var myChart = new Chart(ctx, config);
};










// StackUp — old Chart.js pattern scratchpad (kept for reference).


// -----------------------------
// StackUp horizontal bar chart (GDP scale gag)
// -----------------------------

var barchart = document.getElementById('barchart');
var bar = barchart.getContext('2d');
var img3 = new Image();
img3.src = '../images/chart3.png';
var img2 = new Image();
img2.src = '../images/chart2.png';


netWorthStar = Number(netWorthStar);
netWorthUser = Number(netWorthUser);

let gdp1 = gdpKenya;
let gdp2 = gdpCroatia;

let gdpString1 = 'GDP Kenya 🇰🇪';
let gdpString2 = 'GDP Croatia 🇭🇷';
if (netWorthStar < 20000000000){
	console.log("Star is not that rich !");
	gdp1 = gdpParis;
	gdp2 = gdpNewYork;
	gdpString1 = 'GDP Paris 🇫🇷';
	gdpString2 = 'GDP New York 🇺🇸';
	netWorthUser = gdpNewYork / 2;
}

img2.onload = function() {
	var fillPattern = bar.createPattern(img2, 'repeat');
	var fillPatternBlack = bar.createPattern(img3, 'repeat');

	var myChart = new Chart(bar, {
		type: 'bar',
		data: {
			labels: ['You', gdpString1, gdpString2, nameStar],
			datasets: [{
				data: [netWorthUser, gdp1, gdp2, netWorthStar],
				backgroundColor: [
					fillPatternBlack,
					fillPatternBlack,
					fillPatternBlack,
					fillPattern
				],
				borderRadius: 50,
				categoryPercentage: .7,
				barPercentage: 1
			}]
		},
		options: {
			animation: {
				animateRotate: true,
				animateScale: true,
				duration: 2000,
			},
			indexAxis: 'y',
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					enabled: false
				}
			},
			scales: {
				x: {
					display: false,
					grid: {
						display: false
					}
				},
				y: {
					position: 'right',
					grid: {
						display: false
					}
				},
			}
		}
	});
};










































