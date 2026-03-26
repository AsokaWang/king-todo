import assert from "node:assert/strict"
import { addDays, endOfDay, getDateRanges, startOfDay, toDateKey } from "@/server/time/ranges"

const base = new Date("2026-04-15T10:20:30")

assert.equal(toDateKey(base), "2026-04-15")
assert.equal(startOfDay(base).toISOString(), new Date("2026-04-15T00:00:00.000").toISOString())
assert.equal(endOfDay(base).getHours(), 23)
assert.equal(addDays(base, 2).getDate(), 17)

const ranges = getDateRanges(base)
assert.equal(toDateKey(ranges.startOfToday), "2026-04-15")
assert.equal(toDateKey(ranges.startOfTomorrow), "2026-04-16")
assert.equal(toDateKey(ranges.startOfMonth), "2026-04-01")

console.log("time-ranges.test passed")
