const setBtn = document.getElementById('set-btn')
const startBtn = document.getElementById('start-btn')
const resetBtn = document.getElementById('reset-btn')
const durationVal = document.getElementById('duration-val')
const rangeElement = document.querySelector('#timer-settings input')
const hoursElement = document.getElementById('hours')
const minutesElement = document.getElementById('minutes')
const secondsElement = document.getElementById('seconds')
const settingsElement = document.getElementById('timer-settings')
const alarmSound = document.getElementById('alarm-sound');
hoursElement.innerText = "00"
minutesElement.innerText = "00"
secondsElement.innerText = "00"


rangeElement.value = 1
durationVal.innerText = rangeElement.value + 'm'


rangeElement.addEventListener('input', e => {
    let minuteInput = rangeElement.value
    let totalSeconds = minuteInput * 60;
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    hoursElement.innerText = String(hours).padStart(2, '0');
    minutesElement.innerText = String(minutes).padStart(2, '0');
    secondsElement.innerText = String(seconds).padStart(2, '0');
    durationVal.innerText = minuteInput + 'm'
})

function setTimer(){
    settingsElement.classList.add('active')
}

let timerInterval

function startTimer() {
    setBtn.disabled = true;
    setBtn.style.cursor = 'not-allowed';
    settingsElement.classList.remove('active');

    let totalSeconds = Number(rangeElement.value) * 60;
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    hoursElement.innerText = String(hours).padStart(2, '0');
    minutesElement.innerText = String(minutes).padStart(2, '0');
    secondsElement.innerText = String(seconds).padStart(2, '0');

    timerInterval = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
            console.log('Zaman doldu!');
            alarmSound.currentTime = 0;            
            alarmSound.play();
            setBtn.disabled = false;
            setBtn.style.cursor = "pointer";
            clearInterval(timerInterval);
            return;
        }

        if (seconds === 0) {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else if (hours > 0) {
                hours--;
                minutes = 59;
                seconds = 59;
            }
        } else {
            seconds--;
        }

        hoursElement.innerText = String(hours).padStart(2, '0');
        minutesElement.innerText = String(minutes).padStart(2, '0');
        secondsElement.innerText = String(seconds).padStart(2, '0');
    }, 1000);
}


setBtn.addEventListener('click', setTimer)
startBtn.addEventListener('click', startTimer)


resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    setBtn.disabled = false;
    setBtn.style.cursor = "pointer"
    hoursElement.innerText = "00";
    minutesElement.innerText = "00";
    secondsElement.innerText = "00";
});

document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Kullanıcı sekmeye döndü
        alarmSound.pause();
    }
});