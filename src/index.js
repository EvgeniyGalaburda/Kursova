import { Geolocation } from '@capacitor/geolocation';

const getCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  const {latitude, longitude} = coordinates.coords;

  return [latitude, longitude];
};

const getWeather = async() => {
    const coords = await getCurrentPosition();
    console.log(coords)
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords[0]}&lon=${coords[1]}&appid=f2c34a6c833f212c4054fd3f08df324e&units=metric`)
    const data = await res.json();
    if(data.cod == '200'){
        document.querySelector('header').innerHTML = `
        <h1>${data.city.name}<i class='bx bx-map'></i></h1>
        `;
        const mainWeather = data.list.filter((_,i) => i % 8 == 0);
        console.log(mainWeather)
        document.querySelector('.today').innerHTML =`
        <div class="todayTemp">
            ${mainWeather[0].main.temp}°C
        </div>
        <div class="weather">
            ${mainWeather[0].weather[0].description}
            <img src="http://openweathermap.org/img/wn/${mainWeather[0].weather[0].icon}.png">
        </div>
        `
        document.querySelector('.day-list').innerHTML = `
            
                ${mainWeather.map(day => (
                    `<div class="card">
                    <div class="left">
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png">
                    ${day.weather[0].description}
                    </div>
                    ${day.main.temp.toFixed(1)}</div>`
                )).join('')}`;
    }
}

getWeather();

console.log(new Date());


  