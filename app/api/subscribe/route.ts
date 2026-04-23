import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;

        console.log("New newsletter subscription:", email);

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await sendEmail({
                to: "satyamhimesh@gmail.com",
                subject: `New Newsletter Subscriber! - ${email}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #22d3ee; border-bottom: 2px solid #22d3ee; padding-bottom: 10px;">New Subscription</h2>
                        <p>You have a new subscriber to your newsletter!</p>
                        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #22d3ee; margin: 20px 0;">
                            <p style="margin: 0;"><strong>Subscriber Email:</strong> <a href="mailto:${email}" style="color: #6366f1;">${email}</a></p>
                        </div>
                        <p style="font-size: 12px; color: #999;">Sent from CypherTech Portfolio Footer</p>
                    </div>
                `,
            });
        }

        return NextResponse.json({ message: "Subscription successful!" }, { status: 200 });
    } catch (error) {
        console.error("Subscription error:", error);
        return NextResponse.json({ message: "Failed to process subscription." }, { status: 500 });
    }
}
