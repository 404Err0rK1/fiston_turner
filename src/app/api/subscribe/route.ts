import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const subscribersFile = path.join(process.cwd(), 'subscribers.json')

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    let subscribers = []
    if (fs.existsSync(subscribersFile)) {
      const fileContent = fs.readFileSync(subscribersFile, 'utf-8')
      subscribers = JSON.parse(fileContent)
    }

    if (subscribers.includes(email)) {
      return NextResponse.json({ message: 'Email already subscribed' }, { status: 200 })
    }

    subscribers.push(email)
    fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2))

    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error subscribing:', error)
    return NextResponse.json({ error: 'An error occurred while subscribing' }, { status: 500 })
  }
}