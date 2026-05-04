const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (btnSearch) {
    btnSearch.addEventListener('click', function() {
        const query = searchInput.value.toLowerCase().trim();
        searchResults.innerHTML = ''; // Clear previous results

        if (!query) return;

        fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                let results = [];

                // Check keyword matches based on project requirements
                if (query.includes('beach')) {
                    results = data.beaches;
                } else if (query.includes('temple')) {
                    results = data.temples;
                } else if (query.includes('countr')) {
                    // "country" or "countries" triggers this.
                    // Flattens the cities arrays inside each country so they display as cards
                    results = data.countries.map(country => country.cities).flat();
                }

                // Display logic
                if (results.length > 0) {
                    results.forEach(item => {
                        searchResults.innerHTML += `
                            <div class="card">
                                <img src="${item.imageUrl}" alt="${item.name}">
                                <h3>${item.name}</h3>
                                <p>${item.description}</p>
                            </div>
                        `;
                    });
                } else {
                    searchResults.innerHTML = '<p>No recommendations found. Try searching for "beach", "temple", or "country".</p>';
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    });
}

if (btnClear) {
    btnClear.addEventListener('click', function() {
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
}