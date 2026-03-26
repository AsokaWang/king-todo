import { z } from "zod"
import { ok, fail } from "@/server/api/response"
import { requireSession } from "@/server/auth/require-session"
import { aiConfigSchema, runAiModel } from "@/server/ai/model-client"
import { HttpError } from "@/server/errors/http"

const aiTestBodySchema = z.object({
  config: aiConfigSchema,
})

export async function POST(request: Request) {
  try {
    await requireSession()
    const body = aiTestBodySchema.parse(await request.json())

    const output = await runAiModel({
      config: body.config,
      systemPrompt: "You are a connection test endpoint. Reply briefly with OK and the provider is working.",
      prompt: "Return a one-line success message for model connectivity test.",
    })

    return ok({
      provider: body.config.provider,
      model: body.config.model,
      output,
      testedAt: new Date().toISOString(),
    })
  } catch (error) {
    if (error instanceof Error && !(error instanceof HttpError)) {
      return fail(new HttpError(502, "AI_TEST_FAILED", error.message || "模型测试失败"))
    }

    return fail(error)
  }
}
