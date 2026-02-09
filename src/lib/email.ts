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
    subject: `Nová objednávka — ${plan} (${amount} Kč)`,
    html: `
      <h2>Nová objednávka na The-Pulse.cz</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;">
        <tr><td style="padding:6px 12px;font-weight:bold;">Zákazník:</td><td style="padding:6px 12px;">${customerName}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Email:</td><td style="padding:6px 12px;">${customerEmail}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Produkt:</td><td style="padding:6px 12px;">${plan}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Částka:</td><td style="padding:6px 12px;">${amount} Kč</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Datum:</td><td style="padding:6px 12px;">${now}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">ID objednávky:</td><td style="padding:6px 12px;">${orderId}</td></tr>
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
    subject: "Dokončete svou objednávku — The-Pulse.cz",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#0d9488;">Ahoj${customerName ? ` ${customerName}` : ""},</h2>
        <p>Všimli jsme si, že jste nedokončil/a svou objednávku průvodce <strong>${plan}</strong> na The-Pulse.cz.</p>
        <p>Váš průvodce na vás stále čeká! Vodní půst může být jedním z nejlepších rozhodnutí pro vaše zdraví.</p>
        <p style="margin:24px 0;">
          <a href="${checkoutUrl}" style="background:#0d9488;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">
            Dokončit objednávku
          </a>
        </p>
        <p style="color:#666;font-size:14px;">Pokud jste se rozhodli objednávku zrušit, tento email můžete ignorovat.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="color:#999;font-size:12px;">The-Pulse.cz — Chytrý průvodce 5denním vodním půstem</p>
      </div>
    `,
  });
}
