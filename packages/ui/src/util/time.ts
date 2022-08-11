const msIn = {
  hour: 3600000,
  day: 3600000 * 24,
}

/**
 * Takes the duration in ms and returns a string representation.
 * If duration is longer than a day: 1d 4h
 * Else: 00:50:30
 *
 * @export
 * @param {number} duration
 * @return {*}  {string}
 */
export function msToString(duration: number): string {
  if (duration > msIn.hour * 24) {
    const days = Math.floor(duration / (msIn.hour * 24))
    const hours = Math.floor((duration % (msIn.hour * 24)) / msIn.hour)
    return `${days}d ${hours}h`
  } else {
    return new Date(duration)
      .toISOString()
      .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')
  }
}

export function getTimeStamp(date: number | string): number {
  if (typeof date === 'string') {
    if (!date.includes('GMT') || !date.includes('Z')) {
      throw Error('Please provide the date in GMT.')
    }

    return Date.parse(date)
  }

  return date
}
