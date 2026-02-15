import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { customer_email, status, public_id } = req.body;

    await resend.emails.send({
      from: "IV Systems <onboarding@resend.dev>",
      to: customer_email,
      subject: "Your repair status has been updated",
      html: `
        <h2>Repair Status Update</h2>
        <p>Your repair (${public_id}) status has been updated.</p>
        <p><strong>Current status:</strong> ${status}</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
