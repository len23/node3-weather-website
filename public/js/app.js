/* console.log('Client side javascript is loaded');*/
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


// messageOne.textContent = 'Mensaje';

function getWeather(city) {
  messageTwo.textContent = 'Loading...';
  fetch(`/weather?address=${city}`).then((response)=>{
  response.json().then((data)=>{
    if(data.error){
      return messageTwo.textContent=data.error;
    }
    const {location, forecast} = data;
    messageTwo.textContent=location;
    messageOne.textContent=forecast;
  })
})
}




weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const location = search.value;
  getWeather(location);
})