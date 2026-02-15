import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import nodemailer from "npm:nodemailer"
import { createClient } from "https://esm.sh/@supabase/supabase-js"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

serve(async (req) => {

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const body = await req.json()
  const repair_id = body.repair_id

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )

  const { data: repair } = await supabase
    .from("repairs")
    .select("*")
    .eq("id", repair_id)
    .single()

  if (!repair) {
    return new Response("Repair not found", {
      status: 404,
      headers: corsHeaders,
    })
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: Deno.env.get("SMTP_EMAIL"),
      pass: Deno.env.get("SMTP_PASSWORD"),
    },
  })

  const fromEmail = Deno.env.get("SMTP_EMAIL")

  await transporter.sendMail({
  from: "IV Systems <" + fromEmail + ">",
  to: repair.customer_email,
  subject: "Your repair status has been updated",
  text:
    "Your repair status has been updated.\n\nCurrent status: " +
    repair.status,
  html: `
  <div style="background:#0f0f10;padding:40px 20px;font-family:Arial,sans-serif;">
    <div style="max-width:480px;margin:0 auto;background:#18181b;border-radius:16px;padding:32px;border:1px solid #27272a;color:#ffffff;">
      
      <h2 style="margin:0 0 20px 0;font-size:20px;">
        Repair Status Updated
      </h2>

      <p style="color:#a1a1aa;font-size:14px;margin-bottom:24px;">
        Your repair status has been updated.
      </p>

      <div style="background:#111111;border:1px solid #27272a;border-radius:12px;padding:16px;margin-bottom:24px;">
        <p style="margin:0;color:#a1a1aa;font-size:12px;">Current Status</p>
        <p style="margin:6px 0 0 0;font-size:18px;font-weight:600;">
          ${repair.status}
        </p>
      </div>

      ${
        repair.estimated_completion
          ? `
        <p style="color:#a1a1aa;font-size:13px;margin-bottom:24px;">
          Estimated completion: 
          <strong style="color:#ffffff;">
            ${repair.estimated_completion}
          </strong>
        </p>
      `
          : ""
      }

      <a href="https://localhost:5173/track/${repair.public_id}"
         style="display:block;text-align:center;background:#ffffff;color:#000000;text-decoration:none;padding:12px;border-radius:10px;font-size:14px;font-weight:600;">
         View Repair Status
      </a>

      <p style="color:#52525b;font-size:11px;margin-top:28px;text-align:center;">
        IV Systems — Repair Transparency
      </p>

    </div>
  </div>
  `,
})

  return new Response("Email sent", {
    headers: corsHeaders,
  })
})