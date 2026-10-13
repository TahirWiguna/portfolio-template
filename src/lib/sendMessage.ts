export type ContactMessage = {
  name: string
  email: string
  message: string
}

export async function sendMessage(message: ContactMessage): Promise<void> {
  if (!navigator.onLine) throw new Error('offline')
  await new Promise((resolve) => setTimeout(resolve, 900)) // stands in for a real endpoint, see README
  void message
}
