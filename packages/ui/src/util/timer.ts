import { SequenceStatus } from '../types'
import { msToString } from './time'

type TimerCallbackProps = {
  text: string
  status: SequenceStatus
  remaining: number | null
}

const msHour = 3600000

/**
 * Utility to keep track of the remaining time and status of a sequence.
 *
 * @export
 * @class Timer
 */
export class Timer {
  constructor(
    private _end: EpochTimeStamp,
    private _start?: EpochTimeStamp | undefined,
    public callback?: Function
  ) {
    this._start = _start
    this._end = _end
  }

  set end(val: EpochTimeStamp) {
    this._end = val
  }

  get status() {
    if (Date.now() > this._end) return SequenceStatus.Passed
    if (this._start && Date.now() > this._start) return SequenceStatus.Running
    if (this._start && Date.now() < this._start) return SequenceStatus.Upcoming
    return SequenceStatus.Running
  }

  get remaining() {
    if (this.status === SequenceStatus.Upcoming && this._start) {
      return this._start - Date.now()
    }

    if (this.status === SequenceStatus.Passed) {
      return null
    }

    return this._end - Date.now()
  }

  /**
   * Gets called whenever there is an update in the string representation of the timer.
   *
   * @param {(props: TimerCallbackProps) => void} callback
   * @memberof Timer
   */
  onUpdate = (callback: (props: TimerCallbackProps) => void) => {
    let text: string
    let props = {
      status: this.status,
      remaining: this.remaining,
    }

    if (this.status === SequenceStatus.Passed || this.remaining === null) {
      text = 'Oh you missed it'
      callback({ text, ...props })
      return
    } else {
      const isLongerThanADay = msHour * 24 < this.remaining

      if (this.status === SequenceStatus.Running && this.remaining) {
        text = msToString(this.remaining) + ' left'
        callback({ text, ...props })
      } else if (this.status === SequenceStatus.Upcoming && this.remaining) {
        text = 'In ' + msToString(this.remaining)
        callback({ text, ...props })
      }

      setTimeout(
        () => {
          this.onUpdate(callback)
        },
        isLongerThanADay ? this.remaining % 3600000 : 1000
      )
    }
  }
}
