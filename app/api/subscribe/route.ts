import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
        }

        console.log("Newsletter subscription:", email);

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await sendEmail({
                to: "satyamhimesh@gmail.com",
                subject: `New Newsletter Subscriber`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h2>New Subscriber Alert</h2>
                        <p>A new user has subscribed to the CypherTech newsletter.</p>
                        <p><strong>Email:</strong> ${email}</p>
                    </div>
                `,
            });
        } else {
            console.warn("SMTP credentials missing. Logging subscription to console only.");
            await new Promise((resolve) => setTimeout(resolve, 500));
        }

        return NextResponse.json({ message: "Subscribed successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Subscription error:", error);
        return NextResponse.json({ message: "Failed to subscribe." }, { status: 500 });
    }
}
