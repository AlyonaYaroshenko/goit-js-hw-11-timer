class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.createHTML();
        this.element = this.getElement(selector);
        this.start();
    }
    
    createHTML() {
        const year = this.selector.slice(this.selector.length - 1)
        const timerHTML =
            `<div class="timer" id="${this.selector.slice(1)}">
      <div class="field">
        <span class="value" data-value="days">00</span>
        <span class="label">Days</span>
      </div>
      
      <div class="field">
        <span class="value" data-value="hours">00</span>
        <span class="label">Hours</span>
      </div>
      
      <div class="field">
        <span class="value" data-value="mins">00</span>
        <span class="label">Minutes</span>
      </div>
      
      <div class="field">
        <span class="value" data-value="secs">00</span>
        <span class="label">Seconds</span>
      </div>
    </div>`;
        document.body.insertAdjacentHTML('beforeend', timerHTML);
    };
    getElement(id) {
        const refs = {
             daysTimer: document.querySelector(`${id} [data-value="days"]`),
             hoursTimer: document.querySelector(`${id} [data-value="hours"]`),
             minsTimer: document.querySelector(`${id} [data-value="mins"]`),
             secsTimer: document.querySelector(`${id} [data-value="secs"]`),
        };
            return refs;
    }

    setInterval() {
        
        const distance = this.targetDate - new Date();
    
        const days = this.pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((distance % (1000 * 60)) / 1000));
        return {days, hours, mins, secs}
    };
    pad(value) {
        return String(value).padStart(2, '0');
    }

    setTimer() {
        const time = this.setInterval();
        this.element.daysTimer.textContent = `${time.days}`;
        this.element.hoursTimer.textContent = `${time.hours}`;
        this.element.minsTimer.textContent = `${time.mins}`;
        this.element.secsTimer.textContent = `${time.secs}`;
    }
    start() {
        const goTimer = setInterval(() => {
            this.setTimer()
        }, 1000);
    };
};

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('August 3, 2021'),
});