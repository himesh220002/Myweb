import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message, company } = body;

        console.log("Contact form submission:", body);

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await sendEmail({
                to: "satyamhimesh@gmail.com",
                subject: `New Inquiry from ${name} (${company || "No Company"})`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h2>New Portfolio Inquiry</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Company:</strong> ${company || "N/A"}</p>
                        <p><strong>Message:</strong></p>
                        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
                            ${message}
                        </div>
                    </div>
                `,
            });
        } else {
            console.warn("SMTP credentials missing. Logging submission to console only.");
            await new Promise((resolve) => setTimeout(resolve, 800));
        }

        return NextResponse.json({ message: "Inquiry received successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Email error:", error);
        return NextResponse.json({ message: "Failed to process inquiry." }, { status: 500 });
    }
}
