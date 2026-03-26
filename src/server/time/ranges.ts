export function startOfDay(date: Date) {
  const next = new Date(date)
  next.setHours(0, 0, 0, 0)
  return next
}

export function endOfDay(date: Date) {
  const next = new Date(date)
  next.setHours(23, 59, 59, 999)
  return next
}

export function addDays(date: Date, amount: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

export function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function getDateRanges(now = new Date()) {
  const startOfToday = startOfDay(now)
  const endOfToday = endOfDay(now)

  const startOfTomorrow = addDays(startOfToday, 1)
  const endOfTomorrow = endOfDay(startOfTomorrow)

  const startOfWeek = new Date(startOfToday)
  const weekday = startOfWeek.getDay()
  const diffToMonday = weekday === 0 ? -6 : 1 - weekday
  startOfWeek.setDate(startOfWeek.getDate() + diffToMonday)
  const endOfWeek = endOfDay(addDays(startOfWeek, 6))

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  startOfMonth.setHours(0, 0, 0, 0)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

  return {
    now,
    startOfToday,
    endOfToday,
    startOfTomorrow,
    endOfTomorrow,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
  }
}
