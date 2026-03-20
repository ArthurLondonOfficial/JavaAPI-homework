// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // Select buttons and containers
    const dogapiButton = document.getElementById('dog-api');
    const dogOutput = document.getElementById('dog-output');

    // Function to fetch and display a single random dog image
    async function getDogImage() {
        try {
            // Fetch data from the Dog API
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();

            // Clear previous image
            dogOutput.innerHTML = '';

            // Create an image element and set its source
            const img = document.createElement('img');
            img.src = data.message;

            // Append the image to the container
            dogOutput.appendChild(img);
        } catch (err) {
            console.error(err);
            dogOutput.textContent = 'Failed to load dog image.';
        }
    }

    // Function to fetch and display multiple random dog images
    async function getMultipleDogImages() {
        try {
            // Fetch data from the Dog API (fetching 3 random images)
            const response = await fetch('https://dog.ceo/api/breeds/image/random/3');
            const data = await response.json();

            // Clear previous images
            dogOutput.innerHTML = '';

            // Create and append image elements
            (data.message || []).forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                dogOutput.appendChild(img);
            });
        } catch (err) {
            console.error(err);
            dogOutput.textContent = 'Failed to load dog images.';
        }
    }

    // Add event listeners to buttons
    dogapiButton.addEventListener('click', getDogImage);

});
document.addEventListener('DOMContentLoaded', () => {
 // Select buttons and containers
 // Select buttons and containers
    const catapiButton = document.getElementById('cat-api');
    const catOutput = document.getElementById('cat-output');
    // Function to fetch and display a single random cat image
    async function getCatImage() {
        try {
            // Fetch data from the Cat API
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();

            // Clear previous image
            catOutput.innerHTML = '';

            // Create an image element and set its source
            const img = document.createElement('img');
            img.src = data[0].url;

            // Append the image to the container
            catOutput.appendChild(img);
        } catch (err) {
            console.error(err);
            catOutput.textContent = 'Failed to load cat image.';
        }
    }

    // Function to fetch and display multiple random cat images
    async function getMultipleCatImages() {
        try {
            // Fetch data from the Cat API (fetching 3 random images)
            const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=3');
            const data = await response.json();

            // Clear previous images
            catOutput.innerHTML = '';

            // Create and append image elements
            data.forEach(cat => {
                const img = document.createElement('img');
                img.src = cat.url;
                catOutput.appendChild(img);
            });
        } catch (err) {
            console.error(err);
            catOutput.textContent = 'Failed to load cat images.';
        }
    }


    // Add event listeners to buttons
    catapiButton.addEventListener('click', getCatImage);
});
document.addEventListener('DOMContentLoaded', () => {
    // Select buttons and containers
    const weatherapiButton = document.getElementById('weather-api');
    const weatherOutput = document.getElementById('weather-output');

    // Function to fetch and display weather information
    async function getWeatherInfo() {
        try {
            // Fetch data from the Weather API
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m');
            const data = await response.json();

            // Clear previous weather information
            weatherOutput.innerHTML = '';

            // Build a simple weather info element using returned data
            const weatherInfo = document.createElement('div');

            const title = document.createElement('h3');
            title.textContent = 'Weather Data';
            weatherInfo.appendChild(title);

            const coords = document.createElement('p');
            coords.textContent = `Latitude: ${data.latitude}, Longitude: ${data.longitude}`;
            weatherInfo.appendChild(coords);

            if (typeof data.elevation !== 'undefined') {
                const elevation = document.createElement('p');
                elevation.textContent = `Elevation: ${data.elevation} m`;
                weatherInfo.appendChild(elevation);
            }

            if (typeof data.utc_offset_seconds !== 'undefined') {
                const utc = document.createElement('p');
                utc.textContent = `UTC offset (seconds): ${data.utc_offset_seconds}`;
                weatherInfo.appendChild(utc);
            }

            // Show the first few hourly temperatures if available
            if (data.hourly && Array.isArray(data.hourly.temperature_2m)) {
                const temps = document.createElement('div');
                temps.textContent = 'Hourly temperatures (first 5): ' + data.hourly.temperature_2m.slice(0, 5).join(', ');
                weatherInfo.appendChild(temps);
            }

            weatherOutput.appendChild(weatherInfo);
        } catch (err) {
            console.error(err);
            weatherOutput.textContent = 'Failed to load weather info.';
        }
    }

    // Add event listeners to buttons
    weatherapiButton.addEventListener('click', getWeatherInfo);
});

document.addEventListener('DOMContentLoaded', () => {
    // Select buttons and containers
    const currencyapiButton = document.getElementById('currency-api');
    const currencyOutput = document.getElementById('currency-output');

    // Function to fetch and display exchange rates
    async function getExchangeRate() {
        try {
            // Fetch data from the Currency API
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();

            // Clear previous output
            currencyOutput.innerHTML = '';

            const title = document.createElement('h3');
            title.textContent = `Exchange rates (base: ${data.base || 'USD'})`;
            currencyOutput.appendChild(title);

            const list = document.createElement('ul');

            // Show a handful of common currencies first
            const currenciesToShow = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
            if (data.rates) {
                currenciesToShow.forEach(code => {
                    if (typeof data.rates[code] !== 'undefined') {
                        const li = document.createElement('li');
                        li.textContent = `${code}: ${data.rates[code]}`;
                        list.appendChild(li);
                    }
                });

                // If none of the preferred currencies were found, show the first 5 available
                if (!list.hasChildNodes()) {
                    Object.keys(data.rates).slice(0, 5).forEach(code => {
                        const li = document.createElement('li');
                        li.textContent = `${code}: ${data.rates[code]}`;
                        list.appendChild(li);
                    });
                }
            } else {
                const msg = document.createElement('p');
                msg.textContent = 'No rates available.';
                currencyOutput.appendChild(msg);
            }

            currencyOutput.appendChild(list);
        } catch (err) {
            console.error(err);
            currencyOutput.textContent = 'Failed to load currency data.';
        }
    }

    // Add event listener to the currency button if it exists
    if (currencyapiButton) {
        currencyapiButton.addEventListener('click', getExchangeRate);
    }
});

document.addEventListener('DOMContentLoaded', () => {
 // Select buttons and containers
    const pokemonapiButton = document.getElementById('pokemon-api');
    const pokemonOutput = document.getElementById('pokemon-output');

    // Function to fetch and display a single random Pokemon sprite
    async function getPokemon() {
        try {
            // Fetch data from the Pokemon API
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + (Math.floor(Math.random() * 898) + 1));
            const data = await response.json();

            // Clear previous image
            pokemonOutput.innerHTML = '';

            // Create an image element and set its source
            const img = document.createElement('img');
            img.src = data.sprites.front_default;

            // Append the image to the container
            pokemonOutput.appendChild(img);
        } catch (err) {
            console.error(err);
            pokemonOutput.textContent = 'Failed to load Pokemon sprite.';
        }
    }

    // Function to fetch and display multiple random Pokemon sprites
    async function getMultiplePokemonSprites() {
        try {
            // Fetch data from the Pokemon API (fetching 3 random sprites)
            const responses = await Promise.all([
                fetch('https://pokeapi.co/api/v2/pokemon/' + (Math.floor(Math.random() * 898) + 1)),
                fetch('https://pokeapi.co/api/v2/pokemon/' + (Math.floor(Math.random() * 898) + 1)),
                fetch('https://pokeapi.co/api/v2/pokemon/' + (Math.floor(Math.random() * 898) + 1))
            ]);
            const data = await Promise.all(responses.map(res => res.json()));

            // Clear previous images
            pokemonOutput.innerHTML = '';

            // Create and append image elements
            data.forEach(pokemon => {
                const img = document.createElement('img');
                img.src = pokemon.sprites.front_default;
                pokemonOutput.appendChild(img);
            });
        } catch (err) {
            console.error(err);
            pokemonOutput.textContent = 'Failed to load Pokemon sprites.';
        }
    }


    // Add event listeners to buttons
    pokemonapiButton.addEventListener('click', getPokemon);
    // double-click to load multiple sprites (uses the function so it's not unused)
    pokemonapiButton.addEventListener('dblclick', getMultiplePokemonSprites);
});

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // Select buttons and containers
    const randomfactapiButton = document.getElementById('randomfact-api');
    const randomfactOutput = document.getElementById('randomfact-output');

    // Function to fetch and display a single random fact
    async function getRandomFact() {
        try {
            // Fetch data from the Random Fact API
            const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
            const data = await response.json();

            // Clear previous fact
            randomfactOutput.innerHTML = '';

            // Display the random fact
            randomfactOutput.textContent = data.text;
        } catch (err) {
            console.error(err);
            randomfactOutput.textContent = 'Failed to load random fact.';
        }
    }

    // Add event listener to the button if it exists
    if (randomfactapiButton) {
        randomfactapiButton.addEventListener('click', getRandomFact);
    }
});


// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // Select buttons and containers
    const jokeapiButton = document.getElementById('joke-api');
    const jokeOutput = document.getElementById('joke-output');

    // Function to fetch and display a single random joke
    async function getJoke() {
        try {
            // Fetch data from the Joke API
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            const data = await response.json();


            // Clear previous joke
            jokeOutput.innerHTML = '';

            // Display the random joke
            jokeOutput.textContent = `${data.setup} - ${data.punchline}`;
        } catch (err) {
            console.error(err);
            jokeOutput.textContent = 'Failed to load random joke.';
        }
    }

    // Add event listener to the button if it exists
    if (jokeapiButton) {
        jokeapiButton.addEventListener('click', getJoke);
    }
});


// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // Select buttons and containers
    const foxapiButton = document.getElementById('fox-api');
    const foxOutput = document.getElementById('fox-output');

    // Function to fetch and display a single random fox image
    async function getFoxImage() {
        try {
            // Fetch data from the Fox API
            const response = await fetch('https://randomfox.ca/floof');
            const data = await response.json();

            // Clear previous fox image
            foxOutput.innerHTML = '';

            // Display the random fox image
            const img = document.createElement('img');
            img.src = data.image;
            foxOutput.appendChild(img);
        } catch (err) {
            console.error(err);
            foxOutput.textContent = 'Failed to load random fox image.';
        }
    }

    // Add event listener to the button if it exists
    if (foxapiButton) {
        foxapiButton.addEventListener('click', getFoxImage);
    }
});







