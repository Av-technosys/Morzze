"use server";
import nodemailer from "nodemailer";


export async function sendOrderConfirmationEmail(email: string,firstName:string, orderId:string, orderDate:string, amount:any) {
    try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Your Potent Hygiene Order Confirmation ",
      html: `
       <body
    style="
      margin: 0;
      padding: 10px;
      background-color: #e6f2f3;
      font-family: &quot;Segoe UI&quot;, Roboto, Arial, sans-serif;
    "
  >
    <center>
      <!-- Container -->
      <div
        class="container"
        style="
          max-width: 500px;
          margin: 0px auto;
          background-color: #fff;
          border-radius: 12px 12px 0px 0px;
          overflow: hidden;
        "
      >
        <div style="padding: 10px 20px; text-align: left">
          <!-- Logo -->
          <h1
            style="
              text-align: center;
              color: #1b7f85;
              font-size: 28px;
              margin-bottom: 5px;
            "
          >
            Potent
          </h1>

          <h2
            style="
              text-align: center;
              font-size: 16px;
              color: #333;
              margin-bottom: 25px;
            "
          >
            Order Confirmation
          </h2>

          <!-- Greeting -->
          <p style="font-size: 14px; color: #555">
            Hi ${firstName},
          </p>

          <p style="font-size: 14px; color: #555; line-height: 1.6">
            Your order has been successfully placed, and we’re already getting
            it ready for you.
          </p>

          <!-- Order Summary -->
          <h3
            style="
              font-size: 15px;
              color: #333;
              margin-top: 25px;
              margin-bottom: 10px;
            "
          >
            Order Summary
          </h3>

          <p style="font-size: 14px; color: #555; line-height: 1.6">
            Order ID: ${orderId}<br />
            Order Date: ${orderDate}<br />
            Total Amount: ${amount}
          </p>

          <!-- What Happens Next -->
          <h3
            style="
              font-size: 15px;
              color: #333;
              margin-top: 25px;
              margin-bottom: 10px;
            "
          >
            What Happens Next
          </h3>

          <ul
            style="
              padding-left: 18px;
              color: #555;
              font-size: 14px;
              line-height: 1.6;
            "
          >
            <li>Your order will be processed within 24–48 hours</li>
            <li>
              You will receive a shipping confirmation with tracking details
            </li>
            <li>Expected delivery: 3–5 business days</li>
          </ul>

          <!-- About -->
          <h3
            style="
              font-size: 15px;
              color: #333;
              margin-top: 25px;
              margin-bottom: 10px;
            "
          >
            Made for Your Comfort & Confidence
          </h3>

          <p style="font-size: 14px; color: #555; line-height: 1.6">
            Whether it’s period care through Ovy or on-the-go hygiene through
            Looway, your products are designed to offer:
          </p>

          <ul
            style="
              padding-left: 18px;
              color: #555;
              font-size: 14px;
              line-height: 1.6;
            "
          >
            <li>Safe and skin-friendly materials</li>
            <li>Maximum hygiene and protection</li>
            <li>Convenience for everyday life and travel</li>
          </ul>

          <!-- Quote -->
          <p
            style="
              font-size: 14px;
              color: #888;
              font-style: italic;
              margin-top: 20px;
              text-align: center;
            "
          >
            “We’re glad to be part of your hygiene journey. Stay comfortable,
            stay confident.”
          </p>

          <p
            style="
              text-align: center;
              font-size: 13px;
              color: #555;
              margin-bottom: 25px;
            "
          >
            – Team Potent Hygiene
          </p>

          <!-- Support -->
          <div style="text-align: center; margin-top: 20px">
            <p style="font-size: 13px; color: #555; margin-bottom: 8px">
              Need Help?
            </p>

            <p
              style="
                max-width: 400px;
                margin: 0 auto;
                font-size: 13px;
                color: #555;
                line-height: 1.6;
              "
            >
              If you have any questions about your order, feel free to reach out
            </p>

            <p style="margin-top: 6px">
              <a
                href="mailto:care@potenthygiene.com"
                style="color: #1b7f85; font-weight: bold; text-decoration: none"
              >
                care@potenthygiene.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <!-- FOOTER LOGOS -->
      <div
        style="
          background-color: #D3F5F9;
          max-width: 500px;
          padding: 10px 0px;
          border-radius: 0px 0px 12px 12px;
        "
      >
        <!-- Footer Logos -->
        <div
          style="
            display: flex;
            justify-content: center;
            gap: 20px;
            
            align-items: center;
          "
        >
          <!-- Footer Logos -->
          <div
            style="
              max-width: 400px;
              margin: 0 auto;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 30px;
            "
          >
            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/ovy.png"
              width="70"
              style="vertical-align: middle"
            />

            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/looway.png"
              width="80"
              style="vertical-align: middle"
            />
          </div>
        </div>

        <!-- Footer Note -->
        <p
          style="
            max-width: 400px;
            font-size: 11px;
            color: #999;
            margin-top: 20px;
            text-align: center;
            line-height: 1.5;
          "
        >
          Note: Due to the personal nature of hygiene products, items are
          non-returnable. However, if you face any issue, we’re here to help.
        </p>

        <p
          style="
            font-size: 11px;
            color: #999;
            text-align: center;
            margin-top: 10px;
          "
        >
          © 2024 Potent Hygiene. All rights reserved.
        </p>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendFirstPurchaseEmail(email: string,firstName:string) {
     try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Welcome to Potent Hygiene! Your First Purchase Gift Awaits You",
      html: `
        <body
    style="
      margin: 0;
      padding: 10px;
      background-color: #e6f2f3;
      font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    "
  >
    <center>
      <div
        class="container"
        style="
          max-width: 500px;
          margin: 0px auto;
          background-color: #fff;
          border-radius: 12px 12px 0px 0px;
        "
      >
        <div style="padding: 20px">

          <!-- Logo -->
          <h1
            style="
              text-align: center;
              color: #1b7f85;
              font-size: 28px;
              margin-bottom: 5px;
            "
          >
            Potent
          </h1>

          <h2
            style="
              text-align: center;
              font-size: 16px;
              color: #333;
              margin-bottom: 25px;
              font-weight: 600;
            "
          >
            First Purchase Thank You
          </h2>

          <!-- LEFT CONTENT -->
          <div style="text-align: left">

            <p style="font-size: 14px; color: #555">
              Hi ${firstName},
            </p>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Welcome to Potent Hygiene - and thank you for your first purchase.
            </p>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              We're truly glad you chose us to be part of your hygiene journey.
            </p>

            <!-- Why We Exist -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Why We Exist
            </h3>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              At Potent Hygiene, we believe that personal hygiene should be safe, comfortable, and never awkward to talk about.
            </p>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              From Ovy period care to Looway on-the-go hygiene, every product is designed to:
            </p>

            <ul style="padding-left: 18px; font-size: 14px; color: #555; line-height: 1.6;">
              <li>Solve real, everyday problems</li>
              <li>Be gentle on your body</li>
              <li>Support a more confident lifestyle</li>
            </ul>

            <!-- What Makes Us Different -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              What Makes Us Different
            </h3>

            <ul style="padding-left: 18px; font-size: 14px; color: #555; line-height: 1.6;">
              <li>Skin-friendly and safe materials</li>
              <li>Thoughtful, problem-solving products</li>
              <li>An eco-conscious approach wherever possible</li>
            </ul>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              We're not just here to sell products - we're here to make hygiene simpler, smarter, and stigma-free.
            </p>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Once you've tried your product, don’t forget to share your experience - it helps others make better choices too.
            </p>

            <p style="font-size: 14px; color: #555; margin-top: 15px;">
              You're receiving this because you subscribed to Potent Hygiene updates.
            </p>

          </div>

          <!-- QUOTE -->
          <p
            style="
              font-size: 13px;
              color: #888;
              font-style: italic;
              text-align: center;
              margin-top: 25px;
            "
          >
            “Thank you for trusting us. This is just the beginning.”
          </p>

          <p style="text-align: center; font-size: 13px; color: #555;">
            – Team Potent Hygiene
          </p>

          <!-- SUPPORT -->
          <p
            style="
              text-align: center;
              font-size: 13px;
              color: #555;
              margin-top: 20px;
              line-height: 1.6;
            "
          >
            Need Help Getting Started?<br />
            If you have any questions about your purchase or how to use your product, we're always here to help:
            <a
              href="mailto:care@potenthygiene.com"
              style="color: #1b7f85; text-decoration: none; font-weight: bold"
            >
              care@potenthygiene.com
            </a>
          </p>

        </div>
      </div>

         <!-- FOOTER LOGOS -->
      <div
        style="
          background-color: #D3F5F9;
          max-width: 500px;
          padding: 10px 0px;
          border-radius: 0px 0px 12px 12px;
        "
      >
        <!-- Footer Logos -->
        <div
          style="
            display: flex;
            justify-content: center;
            gap: 20px;
            
            align-items: center;
          "
        >
          <!-- Footer Logos -->
          <div
            style="
              max-width: 400px;
              margin: 0 auto;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 30px;
            "
          >
            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/ovy.png"
              width="70"
              style="vertical-align: middle"
            />

            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/looway.png"
              width="80"
              style="vertical-align: middle"
            />
          </div>
        </div>

        <!-- Footer Note -->
        <p
          style="
            max-width: 400px;
            font-size: 11px;
            color: #999;
            margin-top: 20px;
            text-align: center;
            line-height: 1.5;
          "
        >
          Note: Due to the personal nature of hygiene products, items are
          non-returnable. However, if you face any issue, we’re here to help.
        </p>

        <p
          style="
            font-size: 11px;
            color: #999;
            text-align: center;
            margin-top: 10px;
          "
        >
          © 2024 Potent Hygiene. All rights reserved.
        </p>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendNewsletterEmail(email: string, firstName: string, shopLink:string , subscriptionLink:string = "https://www.potenthygiene.com/subscribe") {
     try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Potent Hygiene Newsletter: Your Guide to Better Hygiene & Comfort",
      html: `
      <body
    style="
      margin: 0;
      padding: 10px;
      background-color: #e6f2f3;
      font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    "
  >
    <center>
      <div
        class="container"
        style="
          max-width: 500px;
          margin: 0px auto;
          background-color: #fff;
          border-radius: 12px 12px 0px 0px;
        "
      >
        <div style="padding: 20px">

          <!-- Logo -->
          <h1
            style="
              text-align: center;
              color: #1b7f85;
              font-size: 28px;
              margin-bottom: 5px;
            "
          >
            Potent
          </h1>

          <h2
            style="
              text-align: center;
              font-size: 16px;
              color: #333;
              margin-bottom: 25px;
              font-weight: 600;
            "
          >
            Newsletter / Educational Campaign Sample
          </h2>

          <!-- LEFT CONTENT -->
          <div style="text-align: left">

            <p style="font-size: 14px; color: #555">
              Hi ${firstName},
            </p>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Periods shouldn't come with discomfort. But if you've ever experienced rashes, irritation, or uneasiness, your hygiene products might be the reason.
            </p>

            <!-- What Matters -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Here's What Matters
            </h3>

            <ul style="padding-left: 18px; font-size: 14px; color: #555; line-height: 1.6;">
              <li>Chemical-free materials can help reduce irritation</li>
              <li>Breathability helps prevent moisture build-up</li>
              <li>The right size can improve both protection and comfort</li>
            </ul>

            <!-- Alternative -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              A Better Alternative
            </h3>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Our Ovy Organic Sanitary Pads are designed to be:
            </p>

            <ul style="padding-left: 18px; font-size: 14px; color: #555; line-height: 1.6;">
              <li>Rash-free and ultra-soft</li>
              <li>Highly absorbent for different flow types</li>
              <li>Made with biodegradable, skin-friendly materials</li>
            </ul>

            <!-- Switch -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Make the Switch
            </h3>

            <p style="font-size: 14px; color: #555;">
              Give your body the comfort it deserves.
            </p>

            <p style="font-size: 14px;">
              Explore Ovy Period Care:
              <a
                href="{{Shop Link}}"
                style="color: #1b7f85; font-weight: bold; text-decoration: none"
              >
                ${shopLink}
              </a>
            </p>

            <!-- Subscription -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Want It on Auto-Pilot?
            </h3>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Never run out again. Subscribe and get your products delivered automatically.
            </p>

            <ul style="padding-left: 18px; font-size: 14px; color: #555; line-height: 1.6;">
              <li>Flexible delivery frequency</li>
              <li>Easy cancellations anytime</li>
              <li>Zero stress, always stocked</li>
            </ul>

            <p style="font-size: 14px;">
              Start Subscription:
              <a
                href="{{Subscription Link}}"
                style="color: #1b7f85; font-weight: bold; text-decoration: none"
              >
                  ${subscriptionLink}
              </a>
            </p>

            <p style="font-size: 18px; color: black; margin-top: 20px; text-align: center;">
              You're receiving this because you subscribed to Potent Hygiene updates.
            </p>

          </div>

          <!-- QUOTE -->
          <p
            style="
              font-size: 13px;
              color: #888;
              font-style: italic;
              text-align: center;
              margin-top: 25px;
            "
          >
            “Small changes in hygiene can create a big difference in comfort.”
          </p>

          <p style="text-align: center; font-size: 13px; color: #555;">
            – Team Potent Hygiene
          </p>

          <!-- SUPPORT -->
          <p
            style="
              text-align: center;
              font-size: 13px;
              color: #555;
              margin-top: 20px;
              line-height: 1.6;
            "
          >
            Need Help ?<br />
            Need help choosing the right products or frequency?<br />
            Reach out at
            <a
              href="mailto:care@potenthygiene.com"
              style="color: #1b7f85; text-decoration: none; font-weight: bold"
            >
              care@potenthygiene.com
            </a>
            – we’re here for you.
          </p>

          

        </div>
      </div>
        <!-- FOOTER LOGOS -->
      <div
        style="
          background-color: #D3F5F9;
          max-width: 500px;
          padding: 10px 0px;
          border-radius: 0px 0px 12px 12px;
        "
      >
        <!-- Footer Logos -->
        <div
          style="
            display: flex;
            justify-content: center;
            gap: 20px;
            align-items: center;
          "
        >
          <!-- Footer Logos -->
          <div
            style="
              max-width: 400px;
              margin: 0 auto;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 30px;
            "
          >
            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/ovy.png"
              width="70"
              style="vertical-align: middle"
            />

            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/looway.png"
              width="80"
              style="vertical-align: middle"
            />
          </div>
        </div>

        <!-- Footer Note -->
        <p
          style="
            max-width: 400px;
            font-size: 11px;
            color: #999;
            margin-top: 20px;
            text-align: center;
            line-height: 1.5;
          "
        >
          Note: Due to the personal nature of hygiene products, items are
          non-returnable. However, if you face any issue, we’re here to help.
        </p>

        <p
          style="
            font-size: 11px;
            color: #999;
            text-align: center;
            margin-top: 10px;
          "
        >
          © 2024 Potent Hygiene. All rights reserved.
        </p>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendUserExperienceEmail(email: string, firstName: string, reviewLink: string) {
       try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "How Was Your Experience with Potent Hygiene? We’d Love to Hear from You!",
      html: `
        <body
    style="
      margin: 0;
      padding: 10px;
      background-color: #e6f2f3;
      font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    "
  >
    <center>
      <div
        class="container"
        style="
          max-width: 500px;
          margin: 0px auto;
          background-color: #fff;
          border-radius: 12px 12px 0px 0px;
        "
      >
        <div style="padding: 20px">

          <!-- Logo -->
          <h1
            style="
              text-align: center;
              color: #1b7f85;
              font-size: 28px;
              margin-bottom: 5px;
            "
          >
            Potent
          </h1>

          <h2
            style="
              text-align: center;
              font-size: 18px;
              color: #333;
              margin-bottom: 25px;
              font-weight: 600;
            "
          >
            How Was Your Experience?
          </h2>

          <!-- LEFT CONTENT -->
          <div style="text-align: left">

            <p style="font-size: 14px; color: #555">
              Hi ${firstName},
            </p>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              We hope your Potent Hygiene order has reached you safely and that you've had the chance to use it.
            </p>

            <!-- Share Experience -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Share Your Experience
            </h3>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Tell us how it worked for you - whether it's comfort, ease of use, or overall satisfaction.
            </p>

            <p style="font-size: 14px; margin-top: 10px;">
              Leave a Review:
              <a
                href="{{Review Link}}"
                style="color: #1b7f85; font-weight: bold; text-decoration: none"
              >
                ${reviewLink}
              </a>
            </p>

            <!-- Why Feedback -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Why Your Feedback Matters
            </h3>

            <ul style="padding-left: 18px; font-size: 14px; color: #555; line-height: 1.6;">
              <li>Helps others choose the right hygiene products</li>
              <li>Allows us to improve and serve you better</li>
              <li>Builds a more informed and confident community</li>
            </ul>

            <!-- Real Care -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Real Care, Real Comfort
            </h3>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Whether it's Ovy period care or Looway hygiene essentials, we're here to make everyday hygiene simpler, safer, and stress-free.
            </p>

            <!-- Thank You -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              A Small Thank You
            </h3>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              As a token of appreciation, you may receive exclusive offers or early access to new products after submitting your review.
            </p>

          </div>

          <!-- QUOTE -->
          <p
            style="
              font-size: 13px;
              color: #888;
              font-style: italic;
              text-align: center;
              margin-top: 25px;
            "
          >
            “Thank you for trusting Potent Hygiene.”
          </p>

          <p style="text-align: center; font-size: 13px; color: #555;">
            – Team Potent Hygiene
          </p>

          <!-- SUPPORT -->
          <p
            style="
              text-align: center;
              font-size: 13px;
              color: #555;
              margin-top: 20px;
              line-height: 1.6;
            "
          >
            Need Help ?<br />
            Need help or facing any issue? Reach out to us at<br />
            <a
              href="mailto:care@potenthygiene.com"
              style="color: #1b7f85; text-decoration: none; font-weight: bold"
            >
              care@potenthygiene.com
            </a>
            – we're here for you.
          </p>

         

        </div>
      </div>
        <!-- FOOTER LOGOS -->
      <div
        style="
          background-color: #D3F5F9;
          max-width: 500px;
          padding: 10px 0px;
          border-radius: 0px 0px 12px 12px;
        "
      >
        <!-- Footer Logos -->
        <div
          style="
            display: flex;
            justify-content: center;
            gap: 20px;
            
            align-items: center;
          "
        >
          <!-- Footer Logos -->
          <div
            style="
               max-width: 400px;
              margin: 0 auto;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 30px;
            "
          >
            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/ovy.png"
              width="70"
              style="vertical-align: middle"
            />

            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/looway.png"
              width="80"
              style="vertical-align: middle"
            />
          </div>
        </div>

        <!-- Footer Note -->
        <p
          style="
            max-width: 400px;
            font-size: 11px;
            color: #999;
            margin-top: 20px;
            text-align: center;
            line-height: 1.5;
          "
        >
          Note: Due to the personal nature of hygiene products, items are
          non-returnable. However, if you face any issue, we’re here to help.
        </p>

        <p
          style="
            font-size: 11px;
            color: #999;
            text-align: center;
            margin-top: 10px;
          "
        >
          © 2024 Potent Hygiene. All rights reserved.
        </p>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendShippingConfirmationEmail(email: string, orderId: any,firstName: any, trackingUrl: any,courierName:any) {
     try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Shipping Confirmation",
      html: `
        <body
    style="
      margin: 0;
      padding: 10px;
      background-color: #e6f2f3;
      font-family: &quot;Segoe UI&quot;, Roboto, Arial, sans-serif;
    "
  >
    <center>
      <div
        class="container"
        style="
          max-width: 500px;
          margin: 0px auto;
          background-color: #fff;
          border-radius: 12px 12px 0px 0px;
        "
      >
        <div style="padding: 20px">
          <!-- Logo -->
          <h1
            style="
              text-align: center;
              color: #1b7f85;
              font-size: 28px;
              margin-bottom: 5px;
            "
          >
            Potent
          </h1>

          <h2
            style="
              text-align: center;
              font-size: 16px;
              color: #333;
              margin-bottom: 25px;
            "
          >
            Shipping Confirmation
          </h2>

          <!-- CONTENT (LEFT ALIGNED FIX) -->
          <div style="text-align: left">
            <p style="font-size: 14px; color: #555">
              Hi ${firstName},
            </p>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Good news – your Potent Hygiene order has been shipped and is now
              on its way to you.
            </p>

            <h3 style="font-size: 15px; color: #333; margin-top: 25px">
              Shipment Details
            </h3>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Order ID: ${orderId}<br />
              Courier Partner: ${courierName}<br />
              Track Your Order:
              <a
                href="${trackingUrl}"
                style="color: #1b7f85; text-decoration: none; font-weight: bold"
              >
                Click Here
              </a>
            </p>

            <h3 style="font-size: 15px; color: #333; margin-top: 25px">
              Estimated Delivery
            </h3>

            <p style="font-size: 14px; color: #555">
              Your order is expected to arrive within 3–5 business days.
            </p>

            <h3 style="font-size: 15px; color: #333; margin-top: 25px">
              What’s Coming Your Way
            </h3>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Whether you’ve chosen Ovy period care essentials or Looway hygiene
              solutions, your products are designed to deliver
            </p>

            <ul style="padding-left: 18px; font-size: 14px; color: #555">
              <li>Safe and skin-friendly materials</li>
              <li>Reliable protection and hygiene</li>
              <li>Comfort for everyday life and travel</li>
            </ul>

            <h3 style="font-size: 15px; color: #333; margin-top: 25px">
              Quick Tip
            </h3>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Once your order arrives, we recommend checking the products and
              storing them in a clean, dry place.
            </p>
          </div>

          <!-- CENTER PART -->
          <p
            style="
              font-size: 14px;
              color: #888;
              font-style: italic;
              text-align: center;
              margin-top: 20px;
            "
          >
            “We can’t wait for you to experience better hygiene, every day.”
          </p>

          <p style="text-align: center; font-size: 13px; color: #555">
            – Team Potent Hygiene
          </p>

          <!-- SUPPORT -->
          <p
            style="
              text-align: center;
              font-size: 13px;
              color: #555;
              margin-top: 20px;
            "
          >
            Need Help?<br />
            <p style="
              max-width: 400px;
              margin: 0 auto;
              text-align: center;
              font-size: 14px;
              color: #555;
              
            " >   
          
            For any shipment-related questions, write to care 
            </p>
            care@potenthygiene.com
          </p>

        </div>
      </div>
       <div
        style="
          background-color: #D3F5F9;
          max-width: 500px;
          padding: 10px 0px;
          border-radius: 0px 0px 12px 12px;
        "
      >
        <!-- Footer Logos -->
       <!-- FOOTER LOGOS -->
          <div style="text-align: center; margin-top: 20px">
            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/ovy.png"
              width="70"
              style="margin-right: 10px"
            />

            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/looway.png"
              width="80"
            />
          </div>

          <!-- FOOTER TEXT -->
          <p
            style="
                max-width: 400px;
              font-size: 11px;
              color: #999;
              text-align: center;
              margin-top: 20px;
            "
          >
            Note: Due to the personal nature of hygiene products, items are
            non-returnable.
          </p>

          <p style="font-size: 11px; color: #999; text-align: center">
            © 2024 Potent Hygiene. All rights reserved.
          </p>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendrefillReminderEmail(email: string,firstName:string,order:any,products:any,orderDate:string,reorderLink:string,SubscriptionLink:string) {
     try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Refill Reminder / Subscription Prompt",
      html: `
        <body
    style="
      margin: 0;
      padding: 10px;
      background-color: #e6f2f3;
      font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    "
  >
    <center>
      <div
        class="container"
        style="
          max-width: 500px;
          margin: 0px auto;
          background-color: #fff;
          border-radius: 12px 12px 0px 0px;
        "
      >
        <div style="padding: 20px">

          <!-- Logo -->
          <h1
            style="
              text-align: center;
              color: #1b7f85;
              font-size: 28px;
              margin-bottom: 5px;
            "
          >
            Potent
          </h1>

          <h2
            style="
              text-align: center;
              font-size: 16px;
              color: #333;
              margin-bottom: 25px;
              font-weight: 600;
            "
          >
            Refill Reminder / Subscription Prompt
          </h2>

          <!-- LEFT CONTENT -->
          <div style="text-align: left">

            <p style="font-size: 14px; color: #555">
              Hi ${firstName},
            </p>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Running low on your hygiene essentials? This is a gentle reminder to restock before you run out.
            </p>

            <!-- Last Purchase -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Your Last Purchase
            </h3>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Products: ${products}<br />
              Ordered On: ${orderDate}
            </p>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Based on typical usage, it might be time to refill and stay worry-free.
            </p>

            <!-- Benefits -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Stay Prepared, Always
            </h3>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Whether it's your Ovy period care essentials or Looway hygiene solutions, keeping a refill ready means:
            </p>

            <ul style="padding-left: 18px; font-size: 14px; color: #555; line-height: 1.6;">
              <li>No last-minute stress</li>
              <li>Consistent comfort and hygiene</li>
              <li>Confidence wherever you go</li>
            </ul>

            <!-- Reorder -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Reorder in Seconds
            </h3>

            <p style="font-size: 14px;">
              <a
                href="{{Reorder Link}}"
                style="color: #555; font-weight: bold; text-decoration: none"
              >
                Reorder Now : ${reorderLink}
              </a>
            </p>

            <!-- Subscription -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Want It on Auto-Pilot?
            </h3>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Never run out again. Subscribe and get your products delivered automatically.
            </p>

            <ul style="padding-left: 18px; font-size: 14px; color: #555; line-height: 1.6;">
              <li>Flexible delivery frequency</li>
              <li>Easy cancellations anytime</li>
              <li>Zero stress, always stocked</li>
            </ul>

            <p style="font-size: 14px; margin-top: 10px;">
              Start Subscription:
              <a
                href={${SubscriptionLink}}
                style="color: #1b7f85; font-weight: bold; text-decoration: none"
              >
                 ${SubscriptionLink}
              </a>
            </p>

          </div>

          <!-- QUOTE -->
          <p
            style="
              font-size: 13px;
              color: #888;
              font-style: italic;
              text-align: center;
              margin-top: 25px;
            "
          >
            “Stay stocked. Stay confident.”
          </p>

          <p style="text-align: center; font-size: 13px; color: #555;">
            – Team Potent Hygiene
          </p>

          <!-- SUPPORT -->
          <p
            style="
              text-align: center;
              font-size: 13px;
              color: #555;
              margin-top: 20px;
              line-height: 1.6;
            "
          >
            Need Help ?<br />
            Need help choosing the right products or frequency?<br />
            Reach out at
            <a
              href="mailto:care@potenthygiene.com"
              style="color: #1b7f85; text-decoration: none; font-weight: bold"
            >
              care@potenthygiene.com
            </a>
            – we’re here for you.
          </p>

          

        </div>
      </div>

        <!-- FOOTER LOGOS -->
      <div
        style="
          background-color: #D3F5F9;
          max-width: 500px;
          padding: 10px 0px;
          border-radius: 0px 0px 12px 12px;
        "
      >
        <!-- Footer Logos -->
        <div
          style="
            display: flex;
            justify-content: center;
            gap: 20px;
            
            align-items: center;
          "
        >
          <!-- Footer Logos -->
          <div
            style="
              max-width: 400px;
              margin: 0 auto;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 30px;
            "
          >
            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/ovy.png"
              width="70"
              style="vertical-align: middle"
            />

            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/looway.png"
              width="80"
              style="vertical-align: middle"
            />
          </div>
        </div>

        <!-- Footer Note -->
        <p
          style="
            max-width: 400px;
            font-size: 11px;
            color: #999;
            margin-top: 20px;
            text-align: center;
            line-height: 1.5;
          "
        >
          Note: Due to the personal nature of hygiene products, items are
          non-returnable. However, if you face any issue, we’re here to help.
        </p>

        <p
          style="
            font-size: 11px;
            color: #999;
            text-align: center;
            margin-top: 10px;
          "
        >
          © 2024 Potent Hygiene. All rights reserved.
        </p>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendDeliveryConfirmationEmail(email: string,firstName:string, orderId:string, deliveryDate:string, reviewLink:string) {
 try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Delivery Confirmation",
      html: `
       <body
    style="
      margin: 0;
      padding: 10px;
      background-color: #e6f2f3;
      font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    "
  >
    <center>
      <div
        class="container"
        style="
          max-width: 500px;
          margin: 0px auto;
          background-color: #fff;
          border-radius: 12px 12px 0px 0px;
        "
      >
        <div style="padding: 20px">

          <!-- Logo -->
          <h1
            style="
              text-align: center;
              color: #1b7f85;
              font-size: 28px;
              margin-bottom: 5px;
            "
          >
            Potent
          </h1>

          <h2
            style="
              text-align: center;
              font-size: 16px;
              color: #333;
              margin-bottom: 25px;
            "
          >
            Delivery Confirmation
          </h2>

          <!-- LEFT CONTENT -->
          <div style="text-align: left">

            <p style="font-size: 14px; color: #555">
              Hi ${firstName},
            </p>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Your Potent Hygiene order has been successfully delivered. We hope everything reached you in perfect condition.
            </p>

            <!-- Delivery Details -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Delivery Details
            </h3>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Order ID: ${orderId}<br />
              Delivered On: ${deliveryDate}
            </p>

            <!-- Features -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Ready to Experience Better Hygiene?
            </h3>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Whether it's your Ovy period care essentials or Looway hygiene solutions, you're all set for:
            </p>

            <ul style="padding-left: 18px; font-size: 14px; color: #555;">
              <li>Comfortable, irritation-free use</li>
              <li>Reliable protection and hygiene</li>
              <li>Confidence in everyday and on-the-go situations</li>
            </ul>

            <!-- Tips -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Quick Care Tips
            </h3>

            <ul style="padding-left: 18px; font-size: 14px; color: #555;">
              <li>Store your products in a clean, dry place</li>
              <li>Follow usage instructions for best results</li>
              <li>Maintain hygiene for safe and effective use</li>
            </ul>

            <!-- Review -->
            <p style="font-size: 14px; color: #555; margin-top: 20px;">
              We'd Love Your Feedback! Once you've tried your product, share your experience and help others make better choices.
            </p>

            <p style="font-size: 14px; margin-top: 10px;">
              <a
                href={${reviewLink}}
                style="color: #1b7f85; font-weight: bold; text-decoration: none"
              >
                Leave a Review
              </a>
            </p>

          </div>

          <!-- CENTER QUOTE -->
          <p
            style="
              font-size: 14px;
              color: #888;
              font-style: italic;
              text-align: center;
              margin-top: 25px;
            "
          >
            “Thank you for choosing Potent Hygiene. We’re glad to be part of your hygiene journey.”
          </p>

          <p style="text-align: center; font-size: 13px; color: #555;">
            – Team Potent Hygiene
          </p>

          <!-- SUPPORT -->
          <p
            style="
              text-align: center;
              font-size: 13px;
              color: #555;
              margin-top: 20px;
            "
          >
            Need Help?<br />
            <p style="
              max-width: 400px;
              margin: 0 auto;
              text-align: center;
              font-size: 14px;
              color: #555;
              
            " >   
             If you have any questions or face any issues, we’re just an email away
            </p>
            care@potenthygiene.com
          </p>

         

        </div>
      </div>

      <div
        style="
          background-color: #D3F5F9;
          max-width: 500px;
          padding: 10px 0px;
          border-radius: 0px 0px 12px 12px;
        "
      >
       <!-- FOOTER LOGOS -->
          <div style="text-align: center; margin-top: 20px">
            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/ovy.png"
              width="70"
              style="margin-right: 10px"
            />

            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/looway.png"
              width="80"
            />
          </div>

          <!-- FOOTER TEXT -->
          <p
            style="
              max-width: 400px;
              font-size: 11px;
              color: #999;
              text-align: center;
              margin-top: 20px;
            "
          >
            Note: Due to the personal nature of hygiene products, items are non-returnable. However, if you face any issue, we're here to help.
          </p>

          <p style="font-size: 11px; color: #999; text-align: center;">
            © 2024 Potent Hygiene. All rights reserved.
          </p>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendCartAbandonmentEmail(email: string,firstName:string,productNames:any,checkoutLink:string,reviewLink:string) {
    try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Your Cart Abandoned",
      html: `
       <body
    style="
      margin: 0;
      padding: 10px;
      background-color: #e6f2f3;
      font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    "
  >
    <center>
      <div
        class="container"
        style="
          max-width: 500px;
          margin: 0px auto;
          background-color: #fff;
          border-radius: 12px 12px 0px 0px;
        "
      >
        <div style="padding: 20px">

          <!-- Logo -->
          <h1
            style="
              text-align: center;
              color: #1b7f85;
              font-size: 28px;
              margin-bottom: 5px;
            "
          >
            Potent
          </h1>

          <h2
            style="
              text-align: center;
              font-size: 16px;
              color: #333;
              margin-bottom: 25px;
            "
          >
            Cart Abandonment
          </h2>

          <!-- LEFT CONTENT -->
          <div style="text-align: left">

            <p style="font-size: 14px; color: #555">
              Hi ${firstName},
            </p>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Looks like you left something in your cart  and we saved it for you.
            </p>

            <!-- Cart -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Your Cart Is Waiting
            </h3>

            <p style="font-size: 14px; color: #555;">
              Items: ${productNames}
            </p>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Whether it's your Ovy period care essentials or Looway hygiene solutions, you're just one step away from better comfort, hygiene, and confidence.
            </p>

            <!-- Delivery -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Estimated Delivery
            </h3>

            <p style="font-size: 14px; color: #555;">
              Your order is expected to arrive within 3–5 business days.
            </p>

            <!-- Benefits -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Why Complete Your Purchase?
            </h3>

            <p style="font-size: 14px; color: #555; line-height: 1.6">
              Whether you’ve chosen Ovy period care essentials or Looway hygiene
              solutions, your products are designed to deliver
            </p>

            <ul style="padding-left: 18px; font-size: 14px; color: #555;">
              <li>Safe and skin-friendly – no harsh chemicals</li>
              <li>Designed for real life – from periods to travel emergencies</li>
              <li>Trusted by women like you – everyday hygiene simplified</li>
            </ul>

            <!-- Urgency -->
            <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
              Don’t Miss Out
            </h3>

            <p style="font-size: 14px; color: #555;">
              Your cart items are in demand and may go out of stock soon.
            </p>

            <!-- CTA -->
            <div style="margin-top: 15px;">
              <p
                
                style="
                  color: #555;
                  font-size: 14px;
                  font-weight: bold;
                  display: inline-block;
                "
              >
                Complete Your Order Now : ${checkoutLink}
              </p>
            </div>

            <!-- Review -->
            <p style="font-size: 14px; color: #555; margin-top: 20px;">
              We'd Love Your Feedback! Once you've tried your product, share your experience and help others make better choices.
            </p>

            <p style="font-size: 14px;">
              <a
                href={${reviewLink}}
                style="color: #1b7f85; font-weight: bold; text-decoration: none"
              >
                Leave a Review
              </a>
            </p>

          </div>

          <!-- CENTER QUOTE -->
          <p
            style="
              font-size: 13px;
              color: #888;
              font-style: italic;
              text-align: center;
              margin-top: 25px;
            "
          >
            “Take care of your hygiene, your way. We’ll be right here when you're ready.”
          </p>

          <p style="text-align: center; font-size: 13px; color: #555;">
            – Team Potent Hygiene
          </p>

          <!-- SUPPORT -->
          <p
            style="
              text-align: center;
              font-size: 13px;
              color: #555;
              margin-top: 20px;
            "
          >
            Need Help?<br />
            <p style="
              max-width: 400px;
              margin: 0 auto;
              text-align: center;
              font-size: 14px;
              color: #555;
              
            " >   
            Whether you’re choosing the right size, product, or combo, we’re here for you:
            </p>
            care@potenthygiene.com
          </p>

        </div>
      </div>
      <!-- FOOTER LOGOS -->
          <div style="background-color: #D3F5F9 ;max-width: 500px; padding: 10px 0px; border-radius: 0px 0px 12px 12px;">
            <div style="text-align: center; margin-top: 20px;">
            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/ovy.png"
              width="70"
              style="margin-right: 10px"
            />

            <img
              src="https://ik.imagekit.io/avtechnosys/potent-hygiene/looway.png"
              width="80"
            />
          </div>

          <!-- FOOTER TEXT -->
          <p
            style="
              font-size: 11px;
              color: #999;
              text-align: center;
              margin-top: 20px;
            "
          >
            P.S. Your comfort shouldn't wait. Checkout now before your cart expires.
          </p>

          <p style="font-size: 11px; color: #999; text-align: center;">
            © 2024 Potent Hygiene. All rights reserved.
          </p>
          </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(email: string, name:string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Welcome To Potent Hygiene - Your Account is Ready!",
      html: `
 <body
    style="
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif;
    "
  >
    <center>
      <!-- Header -->
      <div
        style="
          background-color: #f8f9fa;
          border-bottom: 1px solid #eeeeee;
          padding: 15px 0;
          text-align: center;
          width: 100%;
        "
      >
        <span
          style="
            font-size: 18px;
            color: #0b1320;
            font-weight: 700;
            letter-spacing: 0.5px;
          "
        >
          Success
        </span>
      </div>

      <!-- Container -->
      <div
        class="container"
        style="
          max-width: 500px;
          background-color: #ffffff;
          text-align: center;
          margin: auto;
        "
      >
        <div style="padding: 40px 20px">
          <!-- Icon -->

          <h1
            style="
              font-size: 32px;
              color: #0b1320;
              margin: 0 0 20px 0;
              font-weight: 700;
            "
          >
            Welcome To Potent Hygiene
          </h1>

          <p
            style="
              font-size: 16px;
              color: #5a6a85;
              line-height: 1.6;
              margin: 0 0 40px 0;
            "
          >
            Hi <span style="color: #1b7f85; font-weight: bold">${name}</span>, your
            account has been successfully created. Your journey starts here!
          </p>

          <!-- Start Shopping Button -->
          <div style="margin-bottom: 15px">
            <a
              href="https://www.potenthygiene.com/shop"
              style="
                display: block;
                background-color: #1b7f85;
                color: #ffffff;
                padding: 18px;
                text-decoration: none;
                border-radius: 40px;
                font-weight: bold;
                font-size: 18px;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/welcome2.png"
                width="20"
                style="vertical-align: middle; margin-right: 10px"
              />

              Start Shopping
            </a>
          </div>

          <p
            style="
              font-size: 13px;
              color: #7f8c8d;
              line-height: 1.5;
              margin: 0;
              padding: 0 20px;
            "
          >
            If you have any questions, feel free to reach us at<br />

            <a
              href="mailto:support@potenthygiene.com"
              style="color: #1b7f85; text-decoration: none; font-weight: bold"
            >
              support@potenthygiene.com
            </a>
          </p>
        </div>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}