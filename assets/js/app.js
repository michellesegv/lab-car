function initMap() {

	var lima = {lat: -12.1191427, lng: -77.0349046};

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 3,
		center: lima,
		mapTypeControl:false,
		zoomControl: false,
		streetViewControl:false
	});


	var inputInicio = document.getElementById("inicio");
	var inputDestino = document.getElementById("destino");

	var autocomplete1 = new google.maps.places.Autocomplete(inputInicio);
	var autocomplete2 = new google.maps.places.Autocomplete(inputDestino);

	var buttonTrazar = document.getElementById("trazar-ruta");



	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	directionsDisplay.setMap(map);
	var tarifa = document.getElementById("tarifa");
	var calculateAndDisplayRoute=function(directionsService, directionsDisplay) {
		directionsService.route({
			origin: inputInicio.value,
			destination: inputDestino.value,
			travelMode: 'DRIVING',
			unitSystem: google.maps.UnitSystem.METRIC
		}, function(response, status) {
			if (status === 'OK') {
				var distancia =  Number((response.routes[0].legs[0].distance.text.replace(" km","")).replace(",","."));
				tarifa.innerHTML= "S/. " + parseInt(distancia*1.75);
				directionsDisplay.setDirections(response);
			} else {
				window.alert("No encontramos una ruta :(");
			}
		});
	}

	var trazarRuta = function() {
		calculateAndDisplayRoute(directionsService, directionsDisplay);
	};

	buttonTrazar.addEventListener("click",trazarRuta);
}
