const headerCountry = document.querySelector('#headerCountry')
const remainingCountries = document.querySelector('#remainingCountryArray')
const completedCountries = document.querySelector('#completedCountryArray')
const countries = document.querySelectorAll('path')
const buttonEU = document.querySelector('#euCountries')
const buttonNATO = document.querySelector('#natoCountries')
const buttonReset = document.querySelector('#resetCountries')

const baseCountryArray = ['Albania', 'Armenia', 'Austria', 'Bosnia and Herzegovina', 'Belgium', 'Bulgaria',
    'Belarus', 'Switzerland', 'Cyprus', 'Czech Republic', 'Germany', 'Denmark', 'Estonia', 'Spain',
    'Finland', 'France', 'United Kingdom', 'Georgia', 'Greece', 'Croatia', 'Hungary', 'Ireland', 'Iceland',
    'Italy', 'Lithuania', 'Luxembourg', 'Latvia', 'Moldova', 'Montenegro', 'Macedonia', 'Netherlands',
    'Norway', 'Poland', 'Portugal', 'Romania', 'Serbia', 'Sweden', 'Slovenia', 'Slovakia', 'Turkey',
    'Ukraine', 'Kosovo', 'Andorra']
let remainingCountryArray = ['Albania', 'Armenia', 'Austria', 'Bosnia and Herzegovina', 'Belgium', 'Bulgaria',
    'Belarus', 'Switzerland', 'Cyprus', 'Czech Republic', 'Germany', 'Denmark', 'Estonia', 'Spain',
    'Finland', 'France', 'United Kingdom', 'Georgia', 'Greece', 'Croatia', 'Hungary', 'Ireland', 'Iceland',
    'Italy', 'Lithuania', 'Luxembourg', 'Latvia', 'Moldova', 'Montenegro', 'Macedonia', 'Netherlands',
    'Norway', 'Poland', 'Portugal', 'Romania', 'Serbia', 'Sweden', 'Slovenia', 'Slovakia', 'Turkey',
    'Ukraine', 'Kosovo', 'Andorra']
const EUcountries = ['France', 'Italy', 'Ireland', 'Austria', 'Germany', 'Belgium', 'Netherlands', 'Greece', 'Finland',
    'Lithuania', 'Estonia', 'Poland', 'Spain', 'Slovenia', 'Bulgaria', 'Hungary', 'Croatia', 'Denmark', 'Latvia', 'Sweden',
    'Slovakia', 'Czech Republic', 'Portugal']
const NATOcountries = ['Albania', 'Belgium', 'Bulgaria', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia', 'France',
    'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Montenegro', 'Netherlands',
    'Macedonia', 'Norway', 'Poland', 'Slovakia', 'Slovenia', 'Spain', 'Turkey', 'United Kingdom']

remainingCountryArray.sort()
const completedCountryArray = []
let countryClicked;

const buildRemainingList = function (arr) {
    for (const country in arr) {
        const addCountry = document.createElement('li')
        let addCountryID = String(arr[country]).replace(/\s/g, "");
        addCountry.setAttribute("id", addCountryID);
        addCountry.innerHTML = arr[country]
        remainingCountries.appendChild(addCountry)
    }
}

// put a random country as the country to select & say 
const generateCountry = function () {
    if (remainingCountryArray.length >= 1) {
        const nextCountryIndex = Math.floor(Math.random() * (remainingCountryArray.length))
        headerCountry.innerHTML = remainingCountryArray[nextCountryIndex]
    } else {
        headerCountry.innerHTML = 'COMPLETE'
        stopTimer();
    }
}

function sortList(ul) {
    Array.from(ul.querySelectorAll("li"))
        .sort((a, b) => a.textContent.localeCompare(b.textContent))
        .forEach(li => ul.appendChild(li));
}

// script to execute if country guess is true/falses 
const countryGuess = function (country) {
    const countryName = country.getAttribute('name')
    if (countryName === headerCountry.innerHTML) {

        // add class to turn selected country green
        country.classList.add("correct")
        // find where the country is
        var index = remainingCountryArray.indexOf(countryName);

        // make sure the remainingCountryArray isn't empty
        if (index >= 0) {
            const liCountryName = String(countryName).replace(/\s/g, "");
            const correctCountryLI = document.querySelector(`ul > li#${liCountryName}`)
            completedCountries.append(correctCountryLI)

            // remove correct country from remainingCountryArray
            remainingCountryArray.splice(index, 1)
            completedCountryArray.push(countryName)

            // Sort the completedCountryArray if it is over 2
            if (completedCountryArray.length >= 2) { sortList(completedCountries); }
        }

        // display new country
        generateCountry();
    } else {           // store current country into a varaible, input string for failure notice, then replace OG country
        let currentCountry = headerCountry.innerHTML
        headerCountry.innerHTML = String('Incorrect, guess again.')
        setTimeout(() => { headerCountry.innerHTML = currentCountry }, 500)
        country.setAttribute('style', 'fill: #ec9a9a')
        if (!country.classList.contains('correct')) { setTimeout(() => { country.setAttribute('style', 'fill: #a8dadc') }, 1000) }
        else if (country.classList.contains('correct')) { setTimeout(() => { country.setAttribute('style', 'fill: #4d9078') }, 1000) }
    }
}


var Interval;
var seconds = 00;
var tens = 00;
var appendTens = document.querySelector("#tens")
var appendSeconds = document.querySelector("#seconds")
const startTimer = function () {

    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
    tens++;
    if (tens <= 9) { appendTens.innerHTML = "0" + tens; }
    if (tens > 9) { appendTens.innerHTML = tens; }
    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }
    if (seconds > 9) { appendSeconds.innerHTML = seconds; }
}

const stopTimer = function () {
    clearInterval(Interval);
    appendSeconds.innerHTML = '00'
    appendTens.innerHTML = '00'
}

const highlightCountries = function (arr) {
    for (country in countries) {
        if (typeof (countries[country]) === 'object' && arr.includes(countries[country].getAttribute('name'))) {
            try {
                countries[country].setAttribute('style', 'fill: #4d9078')
            }
            catch (e) {
                console.log(e)
            }
        }
    }
}

const resetCountries = function () {
    for (country in countries) {
        if (typeof (countries[country]) === 'object') { countries[country].setAttribute('style', 'fill: #a8dadc') }
    }
}

const addClickEvent = function () {
    countries.forEach(function (country) {
        country.addEventListener('click', function () {
            startTimer();
            countryGuess(country);
        });
    });
}

buttonEU.addEventListener('click', function () {
    highlightCountries(EUcountries);
    setTimeout(() => { resetCountries() }, 1500)
})

buttonNATO.addEventListener('click', function () {
    highlightCountries(NATOcountries);
    setTimeout(() => { resetCountries() }, 1500)
})

buttonReset.addEventListener('click', function () {
    // reset timer
    stopTimer();
    // reset the fill of each country 
    resetCountries();
    // blank the completed list
    const completeCountriesToDelete = completedCountries.querySelectorAll('li');
    Array.prototype.forEach.call(completeCountriesToDelete, function (node) {
        node.parentNode.removeChild(node);
    });
    // blank the remaining list
    const remainingCountriesToDelete = remainingCountries.querySelectorAll('li');
    Array.prototype.forEach.call(remainingCountriesToDelete, function (node) {
        node.parentNode.removeChild(node);
    });
    // reset the completed list
    console.log(remainingCountryArray)
    baseCountryArray.sort()
    buildRemainingList(baseCountryArray);
    // reset the countries needing to guess array
    for (country in baseCountryArray) {
        if (!remainingCountryArray.includes(baseCountryArray[country])) {
            console.log(baseCountryArray[country])
            remainingCountryArray.push(baseCountryArray[country])
        }
    }
})

generateCountry();
addClickEvent();
buildRemainingList(remainingCountryArray);