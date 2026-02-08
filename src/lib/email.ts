import nodemailer from "nodemailer";

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
  const transporter = getTransporter();
  const now = new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" });

  await transporter.sendMail({
    from: `"The-Pulse.cz" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER,
    subject: `Nova objednavka — ${plan} (${amount} Kc)`,
    html: `
      <h2>Nova objednavka na The-Pulse.cz</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;">
        <tr><td style="padding:6px 12px;font-weight:bold;">Zakaznik:</td><td style="padding:6px 12px;">${customerName}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Email:</td><td style="padding:6px 12px;">${customerEmail}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Produkt:</td><td style="padding:6px 12px;">${plan}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Castka:</td><td style="padding:6px 12px;">${amount} Kc</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Datum:</td><td style="padding:6px 12px;">${now}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">ID objednavky:</td><td style="padding:6px 12px;">${orderId}</td></tr>
      </table>
    `,
  });
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
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"The-Pulse.cz" <${process.env.SMTP_USER}>`,
    to: customerEmail,
    subject: "Dokoncete svou objednavku — The-Pulse.cz",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#0d9488;">Ahoj${customerName ? ` ${customerName}` : ""},</h2>
        <p>Vsimli jsme si, ze jste nedokoncil/a svou objednavku pruvodce <strong>${plan}</strong> na The-Pulse.cz.</p>
        <p>Vas pruvodce na vas stale ceka! Vodní pust muze byt jednim z nejlepších rozhodnutí pro vase zdravi.</p>
        <p style="margin:24px 0;">
          <a href="${checkoutUrl}" style="background:#0d9488;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">
            Dokoncit objednavku
          </a>
        </p>
        <p style="color:#666;font-size:14px;">Pokud jste se rozhodli objednavku zrusit, tento email muzete ignorovat.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="color:#999;font-size:12px;">The-Pulse.cz — Chytry pruvodce 5denním vodním pustem</p>
      </div>
    `,
  });
}
