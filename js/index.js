
var photoMap;
var infowindow = [];
var marker=[];

google.maps.event.addDomListener(window, 'load', initMap);

function displayImages(data) {
  console.log(data);
   $.each(data.photos.photo, function(i, item) {
     var markerLat = item.latitude;
    var markerLong = item.longitude;

    var photoTitle = item.title;
     var photoURL = 'http://farm' + 
        item.farm + '.static.flickr.com/' + 
        item.server + '/' + 
        item.id + '_' + 
        item.secret + '_z.jpg';

    var htmlImageString = '<img src="' + photoURL + '" alt="' + photoTitle + '" />';
    
    
    var imgLink = '<a href="https://www.flickr.com/photos/149606715@N08/' + item.id + '/" target="_blank">View on Flickr</a>'
    
    var contentString = '<div class="pop_up_image_box_text">' + 
        photoTitle + '<br>' + 
        htmlImageString + '<br>' + 
        imgLink + '</div>';
    
   infowindow[i] = new google.maps.InfoWindow({
       content: contentString
    });
    var myLatlngMarker = new google.maps.LatLng(markerLat, markerLong);
    marker[i] = new google.maps.Marker({
      position: myLatlngMarker,
      map: photoMap
    });
    google.maps.event.addListener(marker[i], 'click', function() {
      infowindow[i].open(photoMap, marker[i]);
      this.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
    });

  });

}

function loadPhotos() {
  var flickrCall='https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=36e4ec5d99c813949a321d0558ab3f1e&user_id=149606715@N08&has_geo=1&extras=geo&format=json&jsoncallback=?';
  $.getJSON(flickrCall, displayImages);
}

function initMap() {

  photoMap = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 12.9716, lng: 77.5946}, 
    zoom: 8,
    scaleControl: true,
    streetViewControl: false,
    mapTypeControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  loadPhotos();
}

