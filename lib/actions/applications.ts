const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export async function applyToAJob(data) {
  const response = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(
      `Request failed (${response.status}): ${text.slice(0, 200)}`
    )
  }

  return response.json()
}
