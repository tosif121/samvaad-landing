const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';

export async function bookDemo(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  useCase?: string;
  callVolume?: string;
  message?: string;
}) {
  const res = await fetch(`${API_BASE}/v2/demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
