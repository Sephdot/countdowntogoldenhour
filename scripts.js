let url;
let userPosition;
var goldenHourTime = document.getElementById("golden_hour_time");

window.addEventListener('load', () => requestGeolocation());

window.addEventListener('load', () => {
	document.getElementById("get_result_button").addEventListener(
		'click', 
		() => updateGoldenHourTime(userPosition)
	)
});

function requestGeolocation() {
	navigator.geolocation.getCurrentPosition(
		(position) => {
			setUserPosition(position);
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

function setUserPosition(position) {
	userPosition = position;
}



async function updateGoldenHourTime(userPosition) {
	if (userPosition !== undefined) {
		const goldenHour = await getGoldenHour(userPosition.coords.latitude, userPosition.coords.longitude);
		console.log(goldenHour);
		goldenHourTime.innerText = goldenHour;
	}
	else {
		console.log("userPosition was undefined");
	}
}

async function getGoldenHour(lat, long) {
	const data = await fetchDataByLongLat(lat, long);

	return data.results.golden_hour;
}

async function fetchDataByLongLat(lat, long) {
	const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${long}`;
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