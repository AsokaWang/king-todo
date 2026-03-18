import { NextResponse } from "next/server"
import { isHttpError } from "@/server/errors/http"

export function ok<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      ok: true,
      data,
      requestId: crypto.randomUUID(),
    },
    { status },
  )
}

export function fail(error: unknown) {
  if (isHttpError(error)) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
        requestId: crypto.randomUUID(),
      },
      { status: error.status },
    )
  }

  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "Something went wrong.",
      },
      requestId: crypto.randomUUID(),
    },
    { status: 500 },
  )
}
