var msIn = {
  hour: 36e5,
  day: 36e5 * 24
};
function msToString(duration) {
  if (duration > msIn.hour * 24) {
    const days = Math.floor(duration / (msIn.hour * 24));
    const hours = Math.floor(duration % (msIn.hour * 24) / msIn.hour);
    return `${days}d ${hours}h`;
  } else {
    return new Date(duration).toISOString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  }
}
function getTimeStamp(date) {
  if (typeof date === "string") {
    if (!date.includes("GMT") || !date.includes("Z")) {
      throw Error("Please provide the date in GMT.");
    }
    return Date.parse(date);
  }
  return date;
}
var msHour = 36e5;
var Timer = class {
  constructor(_end, _start, callback) {
    this._end = _end;
    this._start = _start;
    this.callback = callback;
    this.onUpdate = (callback2) => {
      let text;
      let props = {
        status: this.status,
        remaining: this.remaining
      };
      if (this.status === "passed" || this.remaining === null) {
        text = "Oh you missed it";
        callback2({ text, ...props });
        return;
      } else {
        const isLongerThanADay = msHour * 24 < this.remaining;
        if (this.status === "running" && this.remaining) {
          text = msToString(this.remaining) + " left";
          callback2({ text, ...props });
        } else if (this.status === "upcoming" && this.remaining) {
          text = "In " + msToString(this.remaining);
          callback2({ text, ...props });
        }
        setTimeout(
          () => {
            this.onUpdate(callback2);
          },
          isLongerThanADay ? this.remaining % 36e5 : 1e3
        );
      }
    };
    this._start = _start;
    this._end = _end;
  }
  set end(val) {
    this._end = val;
  }
  get status() {
    if (Date.now() > this._end)
      return "passed";
    if (this._start && Date.now() > this._start)
      return "running";
    if (this._start && Date.now() < this._start)
      return "upcoming";
    return "running";
  }
  get remaining() {
    if (this.status === "upcoming" && this._start) {
      return this._start - Date.now();
    }
    if (this.status === "passed") {
      return null;
    }
    return this._end - Date.now();
  }
};
var _Countdown = class {
  constructor(ref, opts) {
    this.opts = opts;
    this.initializeTimer(opts);
    this.$ref = ref;
    this.$text = this.$ref.querySelector('[data-bind-text="countdown"]');
    this.$styled = this.$ref.querySelectorAll("[data-styled-countdown]");
    this.update();
  }
  initializeTimer(props) {
    if (props.start && props.end) {
      this.timer = new Timer(getTimeStamp(props.end), getTimeStamp(props.start));
    } else {
      this.timer = new Timer(getTimeStamp(props.end));
    }
  }
  set(props) {
    this.timer.end = parseInt(props.end);
  }
  update() {
    this.timer.onUpdate(({ text, status }) => {
      this.$text.innerText = text;
      this.$styled.forEach((styledElement) => {
        styledElement.classList.toggle(
          "is--running",
          this.timer.status === "running"
        );
        styledElement.classList.toggle(
          "is--passed",
          this.timer.status === "passed"
        );
        styledElement.classList.toggle(
          "is--upcoming",
          this.timer.status === "upcoming"
        );
      });
    });
  }
};
var Countdown = _Countdown;
Countdown.elementId = "countdown";
Countdown.elementList = document.querySelectorAll(
  `[data-element=${_Countdown.elementId}]`
);
new Countdown(
  document.querySelector('[data-component="countdown"]'),
  { end: Date.now() + 1e4 }
);
