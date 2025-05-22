// pages/api/ask.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { message } = req.body;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: "You are Dr. Cleara, a warm and friendly AI dermatologist. Comfort the user, ask good follow-ups, and recommend skincare products based on their skin concern, location, cost, and urgency. Always prioritize safety and explain your choices." },
        { role: 'user', content: message },
      ],
    }),
  });

  const data = await response.json();

  const reply = data.choices?.[0]?.message?.content || "I'm not sure how to respond. Can you rephrase?";

  res.status(200).json({ reply });
}
