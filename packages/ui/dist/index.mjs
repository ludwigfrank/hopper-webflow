// src/util/param.ts
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
function bindQueryPramTexts() {
  const attribute = "data-bind-query-param";
  const textElements = document.querySelectorAll(`[${attribute}]`);
  textElements.forEach((el) => {
    const text = getUrlParam(el.getAttribute(attribute));
    if (!text)
      throw Error(`Url query parameter for "${attribute}" is not set.`);
    el.innerHTML = text;
  });
}

// src/util/time.ts
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

// src/util/timer.ts
var msHour = 36e5;
var Timer = class {
  constructor(_end, _start, callback) {
    this._end = _end;
    this._start = _start;
    this.callback = callback;
    this.onUpdate = (callback) => {
      let text;
      let props = {
        status: this.status,
        remaining: this.remaining
      };
      if (this.status === "passed" /* Passed */ || this.remaining === null) {
        text = "Oh you missed it";
        callback({ text, ...props });
        return;
      } else {
        const isLongerThanADay = msHour * 24 < this.remaining;
        if (this.status === "running" /* Running */ && this.remaining) {
          text = msToString(this.remaining) + " left";
          callback({ text, ...props });
        } else if (this.status === "upcoming" /* Upcoming */ && this.remaining) {
          text = "In " + msToString(this.remaining);
          callback({ text, ...props });
        }
        setTimeout(
          () => {
            this.onUpdate(callback);
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
      return "passed" /* Passed */;
    if (this._start && Date.now() > this._start)
      return "running" /* Running */;
    if (this._start && Date.now() < this._start)
      return "upcoming" /* Upcoming */;
    return "running" /* Running */;
  }
  get remaining() {
    if (this.status === "upcoming" /* Upcoming */ && this._start) {
      return this._start - Date.now();
    }
    if (this.status === "passed" /* Passed */) {
      return null;
    }
    return this._end - Date.now();
  }
};

// src/util/document.ts
function onDocumentReady(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

// src/components/countdown.ts
var _Countdown = class {
  constructor(ref, opts) {
    this.opts = opts;
    this.initializeTimer(opts);
    this.$ref = ref;
    this.$text = this.$ref.querySelector('[data-bind-text="countdown"]');
    this.$styled = this.$ref.querySelectorAll("[data-styled-status]");
    onDocumentReady(this.update());
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
          "status--running",
          this.timer.status === "running" /* Running */
        );
        styledElement.classList.toggle(
          "status--passed",
          this.timer.status === "passed" /* Passed */
        );
        styledElement.classList.toggle(
          "status--upcoming",
          this.timer.status === "upcoming" /* Upcoming */
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
export {
  Countdown,
  Timer,
  bindQueryPramTexts,
  getTimeStamp,
  getUrlParam,
  msToString,
  onDocumentReady
};
