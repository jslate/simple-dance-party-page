const getLocalTime = (date) => {
  const currentTimeZoneOffset = date.getTimezoneOffset() * 60_000;
  return new Date(date - currentTimeZoneOffset)
}

const getTimeString = (date) => (
  date.toLocaleString(
    Intl.DateTimeFormat().resolvedOptions().locale,
    { weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    }
  )
);

const pad = (number) => number >= 10 ? number : `0${number}`;

const countdown = (date, element) => {
  const setCountdownValue = () => {
    const totalSeconds = Math.floor((date.valueOf() - new Date().valueOf()) / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24)
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    element.innerHTML = `${totalDays}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  setCountdownValue(date, element)
  setInterval(() => setCountdownValue(date, element), 1000)
}


window.addEventListener('DOMContentLoaded', (event) => {
  const date1 = getLocalTime(new Date('2021-02-06T19:00:00.000000'));
  countdown(date1, document.getElementById("round1-countdown"))
  document.getElementById("round1-time").innerHTML = getTimeString(date1);

  const zoomDate1 = getLocalTime(new Date('2021-02-06T18:30:00.000000'));
  document.getElementById("round1-zoom-time").innerHTML = getTimeString(zoomDate1);

  const date2 = getLocalTime(new Date('2021-02-07T01:00:00.000000'));
  countdown(date2, document.getElementById("round2-countdown"))
  document.getElementById("round2-time").innerHTML = getTimeString(date2);

  const zoomDate2 = getLocalTime(new Date('2021-02-07T00:30:00.000000'));
  document.getElementById("round2-zoom-time").innerHTML = getTimeString(zoomDate2);

  [...document.getElementsByClassName("more")].forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      const crop = event.target.parentElement.parentElement.querySelector(".crop");
      crop.style.whiteSpace = "normal";
      crop.style.height = "auto";
      event.target.parentElement.style.display = "none";
    });
  })


});
