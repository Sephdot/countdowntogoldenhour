



document.body.addEventListener('load', handlePageLoad);

function handlePageLoad() {
	navigator.geolocation.getCurrentPosition(position => console.log(`${position.latitude}, ${position.longitude}`);
}