import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
  return new Response(
    JSON.stringify({
      message: 'Hello World',
    }),
    { status: 200 },
  )
}

export async function POST(
  request: Request,
  context: { params: { slug: string } },
) {
  const { slug } = context.params
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')

  return new Response(
    JSON.stringify({
      message: `Hello name ${name}!`,
    }),
    { status: 200 },
  )
}
