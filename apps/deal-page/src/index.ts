import { Countdown } from 'ui'

const countdown = new Countdown(
  document.querySelector('[data-component="countdown"]') as HTMLElement,
  { end: Date.now() + 10000 }
)
