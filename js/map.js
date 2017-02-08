function initMap() {
    var myLatLng = { lat: 22.419808, lng: 114.207444 };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: myLatLng,
        scrollwheel: false
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'The Chinese University of Hong Kong'
    });

    var contentString = '<div id="content">' +
        '<h3 class="text-dark">The Chinese University of Hong Kong</h3>' + '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
        infowindow.open(map, marker);
    });
}
