import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const contentType = req.headers.get("content-type") || "";
        let name, email, phone, message, company;
        let attachments: any[] = [];

        if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            name = formData.get("name") as string;
            email = formData.get("email") as string;
            phone = formData.get("phone") as string;
            company = formData.get("company") as string;
            message = formData.get("message") as string;
            
            const cv = formData.get("cv") as File | null;
            if (cv) {
                const bytes = await cv.arrayBuffer();
                const buffer = Buffer.from(bytes);
                attachments.push({
                    filename: cv.name,
                    content: buffer
                });
            }
        } else {
            const body = await req.json();
            ({ name, email, phone, message, company } = body);
        }

        console.log("Contact form submission:", { name, email });

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await sendEmail({
                to: "satyamhimesh@gmail.com",
                subject: `New Portfolio Inquiry - ${name}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">New Portfolio Inquiry</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                        <p><strong>Company:</strong> ${company || "N/A"}</p>
                        <br/>
                        <p><strong>Message:</strong></p>
                        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #6366f1; white-space: pre-wrap;">${message}</div>
                        <br/>
                        <p style="font-size: 12px; color: #999;">Sent from CypherTech Portfolio Contact Form</p>
                    </div>
                `,
                attachments,
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
