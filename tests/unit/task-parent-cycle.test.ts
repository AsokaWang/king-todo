import assert from "node:assert/strict"

function wouldCreateCycle(taskId: string, parentTaskId: string | null | undefined, parentChain: Record<string, string | null>) {
  if (!parentTaskId) return false

  let currentParentId: string | null = parentTaskId
  while (currentParentId) {
    if (currentParentId === taskId) {
      return true
    }

    currentParentId = parentChain[currentParentId] ?? null
  }

  return false
}

assert.equal(wouldCreateCycle("task-a", "task-b", { "task-b": "task-c", "task-c": null }), false)
assert.equal(wouldCreateCycle("task-a", "task-b", { "task-b": "task-a" }), true)
assert.equal(wouldCreateCycle("task-a", null, {}), false)

console.log("task-parent-cycle.test passed")
