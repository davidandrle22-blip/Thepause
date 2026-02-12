import nodemailer from "nodemailer";
import {
  orderConfirmationEmail,
  adminOrderNotification,
  welcomeEmail,
  adminNewUserNotification,
  abandonedCheckoutEmail,
} from "./email-templates";

let _transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.seznam.cz",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== "false",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return _transporter;
}

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"The-Pulse.cz" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}

export async function sendOrderNotification({
  customerName,
  customerEmail,
  plan,
  amount,
  orderId,
}: {
  customerName: string;
  customerEmail: string;
  plan: string;
  amount: number;
  orderId: string;
}) {
  try {
    const adminTo = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || "";
    await Promise.all([
      sendEmail({
        to: adminTo,
        subject: `Nová objednávka — ${plan} (${amount} Kč)`,
        html: adminOrderNotification({ customerName, customerEmail, plan, amount, orderId }),
      }),
      customerEmail
        ? sendEmail({
            to: customerEmail,
            subject: `Potvrzení objednávky — ${plan}`,
            html: orderConfirmationEmail({ customerName, plan, amount, orderId }),
          })
        : Promise.resolve(),
    ]);
  } catch (error) {
    console.error("Failed to send order notification emails:", error);
  }
}

export async function sendOrderConfirmation({
  customerName,
  customerEmail,
  plan,
  amount,
  orderId,
}: {
  customerName: string;
  customerEmail: string;
  plan: string;
  amount: number;
  orderId: string;
}) {
  try {
    await sendEmail({
      to: customerEmail,
      subject: `Potvrzení objednávky — ${plan}`,
      html: orderConfirmationEmail({ customerName, plan, amount, orderId }),
    });
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
  }
}

export async function sendRecoveryEmail({
  customerName,
  customerEmail,
  plan,
  checkoutUrl,
}: {
  customerName: string;
  customerEmail: string;
  plan: string;
  checkoutUrl: string;
}) {
  try {
    await sendEmail({
      to: customerEmail,
      subject: "Dokončete svou objednávku — The-Pulse.cz",
      html: abandonedCheckoutEmail({ customerName, plan, checkoutUrl }),
    });
  } catch (error) {
    console.error("Failed to send recovery email:", error);
  }
}

export async function sendWelcomeEmail({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  try {
    await sendEmail({
      to: email,
      subject: "Vítejte na The-Pulse.cz!",
      html: welcomeEmail({ name }),
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
}

export async function sendAdminNewUserNotification({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  try {
    const adminTo = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || "";
    await sendEmail({
      to: adminTo,
      subject: `Nový uživatel — ${name || email}`,
      html: adminNewUserNotification({ name, email }),
    });
  } catch (error) {
    console.error("Failed to send admin new user notification:", error);
  }
}
