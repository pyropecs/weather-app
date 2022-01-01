window.addEventListener("load", () => {
  let lat;
  let long;
  const location = navigator.geolocation;
  if (location) {
    location.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      request(long, lat);
    });
  }
});
const img = document.querySelector(".icon");
const temperatureDes = document.querySelector(".temperature-description");
const temperatureDeg = document.querySelector(".temperature-degree");
const timeZone = document.querySelector(".location-timezone");
const place = document.querySelector(".place");

async function request(long, lat) {
  const url = `https://api.weatherapi.com/v1/current.json?key=25b38bf5c1374b6491132032220101&q=${lat},${long}&aqi=no`;
  const response = await fetch(url);
  const responseJson = await response.json();
  render(responseJson);
}

function render(responseObj) {
  const icon = responseObj.current.condition.icon;
  const description = responseObj.current.condition.text;
  const temperature = responseObj.current.temp_f;
  const timeLine = responseObj.location.localtime;
  const locationName = responseObj.location.name;

  timeZone.innerText = getTime(timeLine);
  place.textContent = locationName;
  temperatureDes.innerText = description;
  temperatureDeg.textContent = temperature;

  img.setAttribute("src", `${icon}`);
}

function getTime(timeZone) {
  const time = timeZone.split(" ");
  return time[1];
}
