// StackUp — celebrity grid search, sort, and picker persistence.

// Show salary entered on the landing page (localStorage).
(function showUserSalaryInHeader() {
	const wrap = document.getElementById('header-user-salary');
	const amountEl = document.getElementById('header-user-salary-amount');
	if (!wrap || !amountEl) return;
	const raw = localStorage.getItem('userSalary');
	const n = Number(String(raw ?? '').replace(/,/g, ''));
	if (!Number.isFinite(n) || n <= 0) return;
	amountEl.textContent =
		'$' +
		n.toLocaleString('en-US', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		}) +
		'/mo';
	wrap.hidden = false;
})();

// =======================================
// Search cards by celebrity name.
// =======================================
const searchInput = document.getElementById('search-box');

searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();

    const cards = document.querySelectorAll('.link-result-page');

    cards.forEach(card => {
        const name = card.querySelector('.name').textContent.toLowerCase();
        console.log(name);
        if (name.includes(searchTerm)) {
            card.style.display = ''; // Match — show row.
        } else {
            card.style.display = 'none'; // Hide non-matching row.
        }
    });
});


// =======================================
// Sort cards by displayed net worth.
// =======================================


function sortCards() {
    const sortBy = document.getElementById('sort-select').value;

    const cardsContainer = document.querySelector('.cards');

    const cards = Array.from(cardsContainer.querySelectorAll('.link-result-page'));

	
    const sortedCards = cards.sort((a, b) => {
        const netWorthA = parseInt(a.querySelector('.net-worth').textContent.replace(/[\$\,]/g, ''));
        const netWorthB = parseInt(b.querySelector('.net-worth').textContent.replace(/[\$\,]/g, ''));

        if (sortBy === 'high-to-low') {
            return netWorthB - netWorthA;
        } else {
            return netWorthA - netWorthB;
        }
    });

    cardsContainer.innerHTML = '';

    sortedCards.forEach(card => cardsContainer.appendChild(card));
}

document.getElementById('sort-select').addEventListener('change', sortCards);


// Search box focus styling.
var salaryInput = document.getElementById("search-box");

salaryInput.addEventListener("focus", function() {
	this.classList.add("focused");
});

salaryInput.addEventListener("blur", function() {
	this.classList.remove("focused");
});

searchInput.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        searchInput.blur(); // Dismiss keyboard after Enter.
    }
});

// Sort <select> focus styling.
var selectSort = document.getElementById("sort-select");
selectSort.addEventListener("focus", function() {
	this.classList.add("focused");
});
selectSort.addEventListener("blur", function() {
	this.classList.remove("focused");
});

selectSort.addEventListener('change', function() {
    selectSort.blur();
});


// Persist chosen celebrity for StackUp results (localStorage).
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
	card.addEventListener('click', function() {
		console.log("click !");
		const name = card.querySelector('.name').textContent;
		localStorage.setItem('starName', name);

		const netW = card.querySelector('.net-worth').textContent.replace(/[\$\,]/g, '');
		localStorage.setItem('netWorth', netW);
		
		const imageUrl = card.querySelector('.card-image img').src;
		localStorage.setItem('profileImage', imageUrl);
	
	});
});






