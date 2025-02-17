let url;
let userPosition;
let goldenHourDateTime;
let goldenHourDisplay = document.getElementById("golden_hour_display");

window.addEventListener('load', () => requestGeolocation());

document.getElementById("get_result_button").addEventListener(
	'click', 
	() => updateGoldenHourDisplay(userPosition)
);

function requestGeolocation() {
	navigator.geolocation.getCurrentPosition(
		(position) => {
			userPosition = position;
		},
		(error) => {
			switch(error.code) {
				case error.PERMISSION_DENIED:
					alert("Access denied! Change settings please :)"); 
					break;
				case error.POSITION_UNAVAILABLE:
					alert("Position can't be found - check your connection or enable GPS!"); 
					break;
				case error.TIMEOUT:
					alert("Timed out - try again!"); 
					break;
				default:
					alert("Oops! Something strange happened. Try again!");
			}
		}
	);
}


async function updateGoldenHourDisplay(userPosition) {
	if (userPosition !== undefined) {
		const data = await fetchDataByLongLat(userPosition.coords.latitude, userPosition.coords.longitude);
		const navLang = getNavigatorLanguage();
		const utcOffset = parseInt(data.results.utc_offset);

		goldenHourDateTime = new Date(`${data.results.date}T${data.results.golden_hour}`);
		goldenHourDateTime.setMinutes(goldenHourDateTime.getMinutes() + utcOffset);

		goldenHourDisplay.innerText = goldenHourDateTime.toLocaleString(navLang, {timeZone: data.results.timezone});

		startGoldenHourCountdown();
	}
	else {
		console.log("userPosition was undefined");
	}
}

async function fetchDataByLongLat(lat, long) {
	const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}&time_format=24`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const data = await response.json();
		console.log(data);
		return data;
	}
	catch (error) {
		console.error(error.message);
	}
}

function getNavigatorLanguage() {
	if (navigator.languages && navigator.languages.length) {
		return navigator.languages[0];
	}
	else {
		return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en-GB';
	}
}

function startGoldenHourCountdown() {

var x = setInterval(() => {

	var now = new Date().getTime();

	var distance = goldenHourDateTime.getTime() - now;

	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	document.getElementById("golden_hour_countdown").innerHTML = 
	`
	${Math.abs(hours) < 10 ? hours : `0${hours}`}:
	${Math.abs(minutes) < 10 ? minutes : `0${minutes}`}:
	${Math.abs(seconds) < 10 ? seconds : `0${seconds}`}
	`;

	if (distance < 0) {
		clearInterval(x);
		document.getElementById("golden_hour_countdown").innerHTML = "It's 		Golden Hour!";
	}
}, 1000);

}
