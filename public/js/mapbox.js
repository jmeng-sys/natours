/* eslint-disable */
const mapBox = document.getElementById('map');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);

  mapboxgl.accessToken =
    'pk.eyJ1Ijoiamluc21hcCIsImEiOiJjbHBmeTRycDExaHA2MmpvYnJycXhxOTJ6In0.YNLbTdxRwrcm8AX8mp4QJw';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jinsmap/clpg1nceq004t01r8htqd3o30',
    scrollZoom: false,
    center: [-114.066666, 51.049999],
    zoom: 10
  });
  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
}
