window.addEventListener('load', handlePageLoad);

function handlePageLoad() {
	navigator.geolocation.getCurrentPosition(position => console.log(`${position.coords.latitude}, ${position.coords.longitude}`));
}