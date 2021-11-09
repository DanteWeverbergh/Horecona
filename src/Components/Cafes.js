import Component from '../lib/Component';
import Elements from '../lib/Elements';
import firebase from 'firebase/app';
import 'firebase/auth';
import mapboxgl, { Map } from 'mapbox-gl';
import MapboGxGeocoder from '@mapbox/mapbox-gl-geocoder';
import Location from '../lib/Location';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

class CafesComponent extends Component {
  constructor() {
    super({
      name: 'cafes',
      model: {
        userType: 'client',
      },
      routerPath: '/dashboard/cafes',
    });
  }

  render() {
    //logo uit dom halen
    const bovenkant = document.querySelector('.bovenkant');
    console.log(bovenkant);
    bovenkant.classList.add('hidden');

    const cafesContainer = Elements.createDiv({
      classList: 'cafesContainer',
    });

    const db = firebase.firestore();
    db.collection('businesses')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const adress = doc.data().adres;
          const postcode = doc.data().postcode;
          const gemeente = doc.data().gemeente;
          const name = doc.data().zaaknaam;
          const capacity = doc.data().capacity;
          const maxcapacity = doc.data().maxCapacity;

          const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

          const longitude = () => {
            const long = [];
            mapboxClient.geocoding
              .forwardGeocode({
                query: `${adress}, ${gemeente}`,
                autocomplete: false,
                limit: 1,
              })
              .send()
              .then((response) => {
                if (
                  !response ||
                  !response.body ||
                  !response.body.features ||
                  !response.body.features.length
                ) {
                  console.error('Invalid response:');
                  console.error(response);
                  return;
                }
                const feature = response.body.features[0];

                const coord = feature.center[0];

                long.push(coord);
              });

            return long;
          };

          const latitude = () => {
            const lat = [];
            mapboxClient.geocoding
              .forwardGeocode({
                query: `${adress}, ${gemeente}`,
                autocomplete: false,
                limit: 1,
              })
              .send()
              .then((response) => {
                if (
                  !response ||
                  !response.body ||
                  !response.body.features ||
                  !response.body.features.length
                ) {
                  console.error('Invalid response:');
                  console.error(response);
                  return;
                }
                const feature = response.body.features[0];

                const coord = feature.center[1];

                lat.push(coord);
              });

            return lat;
          };

          const lon = longitude();
          const lat = latitude();
          //console.log(lon[0]);

          const restaurantcard = cafesContainer.appendChild(
            Elements.createRestaurantItem({
              onClick: () =>
                map.flyTo({
                  center: [lon, lat],
                  zoom: 15,
                }),

              name: `${name}: ${capacity}/${maxcapacity}`,
              adres: `${adress}, ${postcode} ${gemeente}`,
            })
          );

          restaurantcard.classList = 'cafesContainer__restaurantButton';

          mapboxClient.geocoding
            .forwardGeocode({
              query: `${adress}, ${gemeente}`,
              autocomplete: false,
              limit: 1,
            })
            .send()
            .then((response) => {
              if (
                !response ||
                !response.body ||
                !response.body.features ||
                !response.body.features.length
              ) {
                console.error('Invalid response:');
                console.error(response);
                return;
              }
              const feature = response.body.features[0];

              //console.log(feature.center[(0, 1)]);

              // Create a marker and add it to the map.
              new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
            });
        });
      });

    //create mapbox container
    const mapboxContainer = document.createElement('div');
    mapboxContainer.classList.add('cafesContainer__mapboxContainer');
    cafesContainer.appendChild(mapboxContainer);

    mapboxgl.accessToken =
      'pk.eyJ1IjoiZGFudGV3ZXZlIiwiYSI6ImNrczljaHVxbTBjOGkydnA0ZWZzeG10Zm0ifQ.bngVsdizMl7u7ce97jD6yA';

    const map = new mapboxgl.Map({
      container: mapboxContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [4.2, 50.2],
      zoom: 3,
    });

    //searchbar
    const geocdoing = map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    const currentLocation = Location.getLocation().then((location) => {
      map.flyTo({
        center: [location.long, location.lat],
        zoom: 12,
      });
    });

    // add marker to current location
    const currentPosition = Location.getLocation().then((location) => {
      //create DOM element for marker
      const pin = Elements.createDiv({
        id: 'pin',
        classList: 'currentLocation',
      });

      pin.addEventListener('click', () => {
        window.alert('huidige locatie');
      });

      // Add markers to the map.

      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([location.long, location.lat])
        .addTo(map);
    });

    cafesContainer.appendChild(
      Elements.createHeader({
        textContent: 'beschikbare horecazaken',
        classList: 'cafesContainer__header',
        size: 2,
      })
    );

    const back = cafesContainer.appendChild(Elements.createBack());
    back.classList = 'cafesContainer__back';

    Location.watchLocation();

    return cafesContainer;
  }
}

export default CafesComponent;
