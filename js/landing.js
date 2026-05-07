// StackUp — landing page (salary input → selection).

// Upper bound avoids absurd input and JS precision issues; well above typical monthly salaries.
const MAX_SALARY = 999_999_999_999;

// Toggle menu icon active state on header/mobile nav.
document.querySelector('.menu-icon').addEventListener('click', toggleMenu);
function toggleMenu() {
	document.querySelector('.menu-icon').classList.toggle('active');
	document.querySelector('.navbar').classList.toggle('active');
	document.querySelector('.background-nav').classList.toggle('active');
}


// For border when input focus
const salaryInput = document.getElementById("salary");

salaryInput.addEventListener("focus", function () {
	this.parentNode.classList.add("focused");
});

salaryInput.addEventListener("blur", function () {
	this.parentNode.classList.remove("focused");
});


// Persist salary for StackUp comparison flow (localStorage).

function handleSalaryInput() {
	let salary = salaryInput.value.replace(/,/g, ''); // Get the raw number without commas
	let currency = document.getElementById('currency-check-box');
	if (currency.checked){
		salary *= 1.09;
		Math.floor(salary);
	}
	if (isNaN(salary) || salary <= 0) {
		alert('Please enter a valid positive number for your salary.');
		return; // Abort if invalid input.
	}
	else if (salary > MAX_SALARY) {
		alert('That number is too large to compare. Please enter a smaller amount.');
		return;
	}
	localStorage.setItem('userSalary', salary);
	window.location.href = 'pages/selection.html'; // StackUp selection step.
}

const buttonCompare = document.getElementById('button-compare');
// Compare button click.
buttonCompare.addEventListener('click', function () {
	handleSalaryInput();
});

// Submit salary on Enter.
salaryInput.addEventListener('keypress', function (event) {
	if (event.keyCode === 13 || event.which === 13) {
		handleSalaryInput();
	}
});

// Max digits of integer part (before commas) so very large salaries can be entered.
const MAX_SALARY_DIGITS = String(MAX_SALARY).length;

salaryInput.addEventListener('input', (event) => {
    const value = salaryInput.value.replace(/,/g, ''); // Remove existing commas
    if (!isNaN(value) && value !== '') {
        if (value.length <= MAX_SALARY_DIGITS) {
            let formatted = Number(value).toLocaleString('en');
            salaryInput.value = formatted;
            salaryInput.parentNode.classList.remove("wrong-input");
        } else {
            salaryInput.value = value.slice(0, MAX_SALARY_DIGITS);
            salaryInput.parentNode.classList.add("wrong-input");
        }
    }
});

// When returning from selection/results, show the last salary so it can be edited.
(function prefillSalaryFromStorage() {
	const saved = localStorage.getItem('userSalary');
	if (!saved) return;
	const n = Number(String(saved).replace(/,/g, ''));
	if (!Number.isFinite(n) || n <= 0) return;
	salaryInput.value = n.toLocaleString('en');
})();


