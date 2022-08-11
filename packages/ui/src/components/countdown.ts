import { SequenceStatus } from '../types'
import { onDocumentReady, getTimeStamp, Timer } from '../util/index'

type CountdownOpts = {
  start?: number | string
  end: number | string
}

export class Countdown {
  static elementId: string = 'countdown'
  static elementList: NodeListOf<HTMLElement> = document.querySelectorAll(
    `[data-element=${this.elementId}]`
  )

  public timer: Timer
  public refs: Record<string, HTMLElement | NodeListOf<HTMLElement>>

  private $ref: HTMLElement
  private $text: HTMLElement
  private $styled: NodeListOf<HTMLElement>

  constructor(ref: HTMLElement, public opts: CountdownOpts) {
    this.initializeTimer(opts)

    this.$ref = ref
    this.$text = this.$ref.querySelector('[data-bind-text="countdown"]')
    this.$styled = this.$ref.querySelectorAll('[data-styled-status]')

    // Initialize the timer
    onDocumentReady(this.update())
  }

  initializeTimer(props: CountdownOpts) {
    if (props.start && props.end) {
      this.timer = new Timer(getTimeStamp(props.end), getTimeStamp(props.start))
    } else {
      this.timer = new Timer(getTimeStamp(props.end))
    }
  }

  set(props: CountdownOpts) {
    this.timer.end = parseInt(props.end as string)
  }

  update() {
    this.timer.onUpdate(({ text, status }) => {
      // Set the timer text to the value (e.g. "1d left")
      this.$text.innerText = text
      this.$styled.forEach((styledElement) => {
        styledElement.classList.toggle(
          'status--running',
          this.timer.status === SequenceStatus.Running
        )
        styledElement.classList.toggle(
          'status--passed',
          this.timer.status === SequenceStatus.Passed
        )
        styledElement.classList.toggle(
          'status--upcoming',
          this.timer.status === SequenceStatus.Upcoming
        )
      })
    })
  }
}
