const steps = [
  { name: "Pieczenie", duration: 60 },
  { name: "Foremka + ostatnie wyrastanie", duration: 120 },
  { name: "Wyrabianie ciasta + drugie wyrastanie", duration: 90 },
  { name: "Pierwsze wyrastanie", duration: 300 },
  { name: "Pierwsze mieszanie", duration: 30 },
  { name: "Czekanie aż zakwas osiągnie temperaturę pokojową", duration: 120 },
  { name: "Wyjęcie zakwasu z lodówki", duration: 0 }
];

function calculateSchedule(endTimeStr) {
  const [hours, minutes] = endTimeStr.split(":").map(Number);
  let time = new Date();
  time.setHours(hours, minutes, 0, 0);
  const schedule = [];
  for (let step of steps) {
    schedule.unshift({
      name: step.name,
      time: new Date(time.getTime()),
    });
    time.setMinutes(time.getMinutes() - step.duration);
  }
  return schedule;
}

function formatTime(date) {
  return date.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

document.getElementById("planner-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const endTime = document.getElementById("endTime").value;
  const schedule = calculateSchedule(endTime);
  const scheduleDiv = document.getElementById("schedule");
  scheduleDiv.innerHTML = "<h4>📅 Harmonogram:</h4><ul class='list-group'>";
  schedule.forEach(step => {
    scheduleDiv.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        <span>${step.name}</span>
        <strong>${formatTime(step.time)}</strong>
      </li>`;
  });
  scheduleDiv.innerHTML += "</ul>";
});