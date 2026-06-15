import { NextResponse } from "next/server";
import { notifyNewsletterSignupEmail } from "@/lib/email-notifications";
import { renderTemplate, sendEmail } from "@/lib/email";
import { getCurrentUser } from "@/helper/user/action";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    try {
      const loggedInUser = await getCurrentUser();
      await sendEmail({
        to: loggedInUser?.email!,
        subject: "New Newsletter Subscription - Morzze",
        html: renderTemplate(
          `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Newsletter Subscriber</h2>

          <p>
            <strong>Email:</strong> {{Email}}
          </p>
        </div>
      `,
          { Email: email },
        ),
      });
    } catch (emailError) {
      console.error("Unable to send newsletter admin email:", emailError);
    }

    try {
      await notifyNewsletterSignupEmail({ email });
    } catch (emailError) {
      console.error("Unable to send newsletter signup email:", emailError);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
