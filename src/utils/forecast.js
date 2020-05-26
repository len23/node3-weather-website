const request = require('request');

const forecast = (lat,lng,callback)=>{
  const url = `http://api.weatherstack.com/current?access_key=ff453cd0d93fd12aebed79465b9c2b8a&query=${lat},${lng}&units=f`;
  request({url/* : url */, json: true}, (error, {body}) => {
    if(error){
      callback('Unable to conect to weather service',undefined);
    }else if (body.error){
      callback('Unable to find location', undefined);
    }else{
      const {temperature,feelslike,weather_descriptions} = body.current;
      const {timezone_id, country}=body.location;
      callback(undefined,`It is currently ${temperature} degress out. It fells like ${feelslike} degress out. Weather Descriptions: ${weather_descriptions[0]}<br>
      The time zone is: ${timezone_id}<br>
      Country;${country}
      `);
    } 
  });
}

module.exports = forecast;