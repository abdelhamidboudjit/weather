let body = document.querySelector("body");
let hr = document.querySelectorAll(".hr");
let dayar = document.querySelectorAll(".dayar");
let input = document.querySelector(".input");
let button = document.querySelector("button");
let info = document.querySelector(".weather-info");
let preHeader = document.querySelector(".pre-header");
let hro = document.querySelector(".hro");
navigator.geolocation.getCurrentPosition(position, eropos);

document.querySelector(".doty").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(position, eropos);
});

function eropos() {
  let ara = document.createElement("div");
  ara.innerHTML = `
    <header class="heid" style= "
    flex-direction: column;
    width: 100%;
    position:fixed;
    height:100%;
    top:0;
    left:0;
    justify-content: unset;
    margin-top:0;
    padding-top:40px;
    backdrop-filter: blur(7px);
    ">
      <h2 class="srr-h2" style= "font-size: 7.2vw">Sorry can't find location :( <br> Try Manually</h2>
      <div class="input" style= "width: 90%">
        <input class="mearch" placeholder="Search place...">
          <i class="fa-solid fa-magnifying-glass"></i>
        </input>
      </div>
      </header>`;
  ara.classList.add("ara");
  body.appendChild(ara);
  let input = document.querySelector(".mearch");
  input.addEventListener("input", () => {
    getPlaces(input.value.trim());
  });
  async function getPlaces(value) {
    let header = document.querySelector(".heid");
    const api = `//api.weatherapi.com/v1/search.json?key=889a539c6b4e479f994133346220707&q='${value}'`;
    const response = await fetch(api);
    const data = await response.json();
    const places = document.createElement("div");
    places.classList.add("places");
    places.style.cursor = "unset";
    places.innerHTML = "";
    header.appendChild(places);
    data.forEach((e) => {
      const child = document.createElement("div");
      child.classList.add("list");
      child.style.display = "block";
      child.style.cursor = "pointer";
      child.innerHTML = `
        <span class="li-list" data-name="${e.name}">
         <i class="fa-solid fsfs fa-location-dot"></i>
        <span class="name">${e.name}</span>
        <span class="region">${e.region}</span>
        <span class="country">${e.country}</span>
        </span>
        `;
      places.appendChild(child);
    });
    header.removeChild(header.children[2]);
    header.appendChild(places);
    if (places.innerHTML == "") {
      places.remove();
    }
    let lili = document.querySelectorAll(".li-list");
    lili.forEach((e) => {
      e.addEventListener("click", () => {
        getloaction(e.dataset.name);
        ara.remove();
      });
    });
  }
}

async function position(position) {
  const api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=10&appid=273a8e0c9b7d6a7fa66fc2cb70e71a4e`;
  let res = await fetch(api);
  let data = await res.json();
  let dataArr = await [
    data[0].local_names.en,
    data[0].local_names.fr,
    data[0].local_names.sv,
  ];
  getloaction(dataArr);
}

async function getloaction(value) {
  const api = `https://api.weatherapi.com/v1/forecast.json?key=889a539c6b4e479f994133346220707&q=${value}&days=4&aqi=no&alerts=no`;
  const response = await fetch(api);
  const data = await response.json();
  document.querySelector(".place").innerHTML = data.location.name;
  hro.innerHTML = data.location.localtime.substring(11, 16);
  let dayMonth = new Date(data.location.localtime).getDate();
  document.querySelector(
    ".imager"
  ).src = `images/icons/${data.current.condition.icon.substring(35, 42)}.png`;
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".tempo").innerHTML = data.current.temp_c + "&#176";
  document.querySelector(".wnd").innerHTML = data.current.wind_kph + " Km/h";
  document.querySelector(".hmd").innerHTML = data.current.humidity + "%";

  document.querySelector(".month-day").innerHTML =
    month[new Date(data.location.localtime).getMonth()] + " " + dayMonth;
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  document.querySelector(".day").innerHTML =
    day[new Date(data.location.localtime).getDay()];
  let time = new Date(data.location.localtime).getHours();
  hrs = document.querySelectorAll(".hr");
  let nbrTime = document.querySelectorAll(".timed");
  let wdd = document.querySelectorAll(".wdd");
  let hmm = document.querySelectorAll(".hmm");
  let temp = document.querySelectorAll(".temp");
  let mg = document.querySelectorAll(".mg");
  hrs.forEach((e, i) => {
    subData = data.forecast.forecastday[0].hour[time + 1 + i];
    nbrTime[i].innerHTML = time + 1 + i + ":00";
    wdd[i].innerHTML =
      data.forecast.forecastday[0].hour[time + 1 + i].wind_kph + " Km/h";
    hmm[i].innerHTML = subData.humidity + "%";
    temp[i].innerHTML = Math.round(subData.temp_c) + "&#176";
    mg[i].src = `images/icons/${subData.condition.icon.substring(35, 42)}.png`;
  });
  let may = document.querySelectorAll(".day-nbr");
  let bay = document.querySelectorAll(".nbr-temp");
  let mig = document.querySelectorAll(".mig");
  dayar.forEach((e, i) => {
    const dare = new Date(data.forecast.forecastday[i].date).getDay();
    let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    may[i].innerHTML = day[dare];
    bay[i].innerHTML = data.forecast.forecastday[i].day.avgtemp_c;
    mig[i].src = `images/icons/${data.forecast.forecastday[
      i
    ].day.condition.icon.substring(35, 42)}.png`;
  });
  if (time >= 8 && time < 16) {
    bg("day", -200, "#0000001f");
  } else if (time >= 16 && time < 20) {
    bg("evening", -400, "#0000001f");
  } else if (time >= 20 && time < 25) {
    bg("night", -200, "#ffffff18");
  } else if (time >= 00 && time < 6) {
    bg("night", -200, "#ffffff18");
  } else if (time >= 6 && time < 8) {
    bg("morning", -200, "#0000001f");
  }
}
function bg(time, pos, bg) {
  body.style.background = `url('./images/backgrounds/${time}.svg')`;
  body.style.backgroundSize = "cover";
  body.style.backgroundPositionX = pos + "px";
  preHeader.style.background = bg;
  if (time == "evening") {
    document.querySelector(".month-day").style.color = "#faff00";
    document.querySelector(".day").style.color = "#242424";
  }
  hr.forEach((ele) => {
    ele.style.backgroundColor = bg;
  });
  dayar.forEach((ele) => {
    ele.style.backgroundColor = bg;
  });
  button.style.backgroundColor = bg;
  input.style.background = bg;
  info.style.background = bg;
}

input.addEventListener("click", () => {
  eropos();
  document.querySelector(".srr-h2").innerHTML = "Find location";
  document.querySelector(".heid").style.paddingTop = 0;
});
