window.addEventListener('load', requestGeolocation);

function requestGeolocation() {
	navigator.geolocation.getCurrentPosition(
	(position) => {
		console.log(`${position.coords.latitude}, ${position.coords.longitude}`);
	},
	(error) => {
		switch(error.code) {
			case error.PERMISSION_DENIED:
				alert("Access denied! Change settings please :)"); break;
			case error.POSITION_UNAVAILABLE:
				alert("Position can't be found - check your connection or enable GPS!"); break;
			case error.TIMEOUT:
				alert("Timed out - try again!"); break;
			default:
				alert("Oops! Something strange happened. Try again!");
		}
	}
	);
}