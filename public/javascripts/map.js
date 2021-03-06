let myLatLng
let emer


function initMap() {
  let directionsService = new google.maps.DirectionsService();
  let directionsDisplay = new google.maps.DirectionsRenderer();
  let chicago = new google.maps.LatLng(41.850033, -87.6500523);


  //// BEGIN INFO FOR ICONS
  function addFire(coords) {
    let marker = new google.maps.Marker({
      position: coords,
      map: map,
      icon: fireIcon
    })
  }

  function addAmb(coords) {
    let marker = new google.maps.Marker({
      position: coords,
      map: map,
      icon: ambIcon
    })
  }
  let fireIcon = {
    url: "https://cdn.emojidex.com/emoji/seal/fire.png?1466441570", // url
    scaledSize: new google.maps.Size(25, 25), // scaled size
    origin: new google.maps.Point(0, 0), //
    anchor: new google.maps.Point(0, 0) //
  }

  let ambIcon = {
    url: "https://images.emojiterra.com/google/android-pie/512px/1f691.png", // url
    scaledSize: new google.maps.Size(25, 25),
    origin: new google.maps.Point(0, 0), //
    anchor: new google.maps.Point(0, 0) //
  }
  ////END INFO FOR ICONS


  // ToDo Center the map on something more sensible, this is a placeholder
  let options = {
    zoom: 15,
    center: {
      lat: 40.0150,
      lng: -105.2705,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    }
  }
  let map = new google.maps.Map(document.getElementById('map'), options);
  directionsDisplay.setMap(map);

  function geo_success(position) {
    myLatLng = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    emer = {
      lat: 40.019500,
      lng: -105.280622
    }

    addAmb(myLatLng)
    addFire(emer)
    let start = myLatLng
    let end = emer
    let request = {
      origin: myLatLng,
      destination: end,
      travelMode: 'DRIVING',
    }
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(result);
      }
    })

  }

  function geo_error() {
    alert("Sorry, no position available.");
  }

  let geo_options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };

  let wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
}
//// experimental code end
