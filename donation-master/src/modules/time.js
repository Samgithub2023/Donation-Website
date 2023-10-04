const formatter = new Intl.RelativeTimeFormat('en')
const hour = 3.6e+6
const day = 8.64e+7

export function relativeTime(time) {
    const difference = time - Date.now()
    if (Math.abs(difference) < day) return formatter.format(Math.ceil(difference / hour), 'hours')
    return formatter.format(Math.ceil(difference / day), 'days')
}