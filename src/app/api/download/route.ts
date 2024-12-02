import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const ytDlpProcess = spawn('yt-dlp', ['-o', '-', url])

    const stream = new ReadableStream({
      start(controller) {
        ytDlpProcess.stdout.on('data', (chunk) => {
          controller.enqueue(chunk)
        })

        ytDlpProcess.stdout.on('end', () => {
          controller.close()
        })

        ytDlpProcess.stderr.on('data', (data) => {
          console.error(`yt-dlp error: ${data}`)
        })

        ytDlpProcess.on('error', (error) => {
          controller.error(error)
        })
      },
      cancel() {
        ytDlpProcess.kill()
      },
    })

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'attachment; filename="twitter_space.mp3"',
      },
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Streaming failed' }, { status: 500 })
  }
}
