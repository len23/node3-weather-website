const request =  require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibG1vbnRhbHZvIiwiYSI6ImNrYWoweHMxazA1d3YycW1udGJ1MWltczkifQ.hFYgYWEHfWaBZ8ivlnJ4rA&limit=1`;

  request({url: url, json:true}, (err, response) => {
      if(err){
        callback('Unable to connect to location services!', undefined);
      }else if(response.body.features.length===0){
        callback('Unable to find location. Try another search', undefined);
      }else{
        const lat = response.body.features[0].center[1];
        const lng = response.body.features[0].center[0];
        callback(undefined, {
          latitude: lat,
          longitude: lng,
          location: response.body.features[0].place_name
        })
      }
  })
}

module.exports = geocode;