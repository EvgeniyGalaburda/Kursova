import { Geolocation } from '@capacitor/geolocation';

const getCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  const {latitude, longitude} = coordinates.coords;

  return [latitude, longitude];
};
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
  
    // Перевіряємо, чи є дата сьогоднішньою
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
  
    // Масив днів тижня для виведення назви дня
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Повертаємо день тижня
    return daysOfWeek[date.getDay()];
  };

  function getFormattedTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0'); // Додаємо 0, якщо годин менше 10
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Додаємо 0, якщо хвилин менше 10
  
    return `${hours}:${minutes}`;
  }

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
        const dayWeather = data.list.filter((_, i) => i < 8);
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
                    <img class="icon" src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png">
                    <div class="day">
                    ${formatDate(day.dt_txt)}
                    </div>
                    ${day.weather[0].description}
                    </div>
                    <div class="temp">
                    ${day.main.temp.toFixed(1)}°C</div>
                    </div>`
                )).join('')}`;
        document.querySelector('.hours').innerHTML = `
        ${dayWeather.map(hour => (
            `
            <div class="hour">
                <div class="hour-temp">${hour.main.temp.toFixed(0)}°C</div>
                <img class="icon" src="http://openweathermap.org/img/wn/${hour.weather[0].icon}.png">
                <div>${hour.wind.speed.toFixed(1)}km/h</div>
                <div>${getFormattedTime(hour.dt_txt)}</div>
            </div>
            `
        )).join('')}
        `
    }
}

getWeather();

console.log(new Date());


  