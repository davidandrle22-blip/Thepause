// Premium dark-theme email templates for The-Pulse.cz

function layout(content: string): string {
  return `<!DOCTYPE html>
<html lang="cs">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#1a1a1a;border-radius:16px;overflow:hidden;">

<!-- Header -->
<tr><td style="padding:32px 40px 24px;text-align:center;border-bottom:1px solid #2a2a2a;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
    <tr>
      <td style="font-size:28px;color:#22c55e;padding-right:8px;">&#128167;</td>
      <td style="font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">The-Pulse.cz</td>
    </tr>
  </table>
</td></tr>

<!-- Content -->
<tr><td style="padding:32px 40px;">
${content}
</td></tr>

<!-- Footer -->
<tr><td style="padding:24px 40px 32px;border-top:1px solid #2a2a2a;text-align:center;">
  <p style="margin:0 0 8px;color:#666;font-size:13px;">The-Pulse.cz &mdash; Chytr&yacute; pr&#367;vodce 5denn&iacute;m vodn&iacute;m p&#367;stem</p>
  <p style="margin:0;color:#555;font-size:12px;">
    <a href="https://the-pulse.cz" style="color:#22c55e;text-decoration:none;">the-pulse.cz</a>
    &nbsp;&bull;&nbsp;
    <a href="mailto:the-pause@seznam.cz" style="color:#22c55e;text-decoration:none;">the-pause@seznam.cz</a>
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function ctaButton(text: string, url: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px auto;">
<tr><td style="background-color:#22c55e;border-radius:12px;text-align:center;">
  <a href="${url}" style="display:inline-block;padding:14px 32px;color:#ffffff;font-weight:700;font-size:16px;text-decoration:none;letter-spacing:0.3px;">${text}</a>
</td></tr>
</table>`;
}

export function orderConfirmationEmail({
  customerName,
  plan,
  amount,
  orderId,
}: {
  customerName: string;
  plan: string;
  amount: number;
  orderId: string;
}): string {
  const now = new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" });
  return layout(`
  <h1 style="margin:0 0 8px;color:#22c55e;font-size:22px;font-weight:700;">Platba p&#345;ijata!</h1>
  <p style="margin:0 0 24px;color:#ccc;font-size:15px;">D&#283;kujeme za va&#353;i objedn&aacute;vku${customerName ? `, ${customerName}` : ""}.</p>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#111;border-radius:12px;margin-bottom:24px;">
    <tr><td style="padding:20px 24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:8px 0;color:#888;font-size:14px;width:140px;">Produkt:</td>
          <td style="padding:8px 0;color:#fff;font-size:14px;font-weight:600;">${plan}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:14px;">&#268;&aacute;stka:</td>
          <td style="padding:8px 0;color:#22c55e;font-size:14px;font-weight:600;">${amount} K&#269;</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:14px;">Datum:</td>
          <td style="padding:8px 0;color:#fff;font-size:14px;">${now}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:14px;">ID objedn&aacute;vky:</td>
          <td style="padding:8px 0;color:#fff;font-size:13px;font-family:monospace;">${orderId}</td>
        </tr>
      </table>
    </td></tr>
  </table>

  <p style="color:#ccc;font-size:15px;line-height:1.6;margin:0 0 8px;">V&aacute;&#353; pr&#367;vodce je p&#345;ipraven. P&#345;ihlaste se a m&#367;&#382;ete za&#269;&iacute;t!</p>
  ${ctaButton("Otev&#345;&iacute;t pr&#367;vodce", "https://the-pulse.cz/pruvodce")}
  `);
}

export function adminOrderNotification({
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
}): string {
  const now = new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" });
  return layout(`
  <h1 style="margin:0 0 8px;color:#22c55e;font-size:22px;font-weight:700;">Nov&aacute; objedn&aacute;vka!</h1>
  <p style="margin:0 0 24px;color:#ccc;font-size:15px;">P&#345;i&#353;la nov&aacute; platba na The-Pulse.cz</p>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#111;border-radius:12px;">
    <tr><td style="padding:20px 24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:8px 0;color:#888;font-size:14px;width:140px;">Z&aacute;kazn&iacute;k:</td>
          <td style="padding:8px 0;color:#fff;font-size:14px;font-weight:600;">${customerName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:14px;">Email:</td>
          <td style="padding:8px 0;color:#fff;font-size:14px;">${customerEmail}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:14px;">Produkt:</td>
          <td style="padding:8px 0;color:#fff;font-size:14px;">${plan}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:14px;">&#268;&aacute;stka:</td>
          <td style="padding:8px 0;color:#22c55e;font-size:14px;font-weight:600;">${amount} K&#269;</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:14px;">Datum:</td>
          <td style="padding:8px 0;color:#fff;font-size:14px;">${now}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:14px;">ID:</td>
          <td style="padding:8px 0;color:#fff;font-size:13px;font-family:monospace;">${orderId}</td>
        </tr>
      </table>
    </td></tr>
  </table>
  `);
}

export function welcomeEmail({ name }: { name: string }): string {
  return layout(`
  <h1 style="margin:0 0 8px;color:#22c55e;font-size:22px;font-weight:700;">V&iacute;tejte na The-Pulse.cz!</h1>
  <p style="margin:0 0 24px;color:#ccc;font-size:15px;line-height:1.6;">
    Ahoj${name ? ` ${name}` : ""},<br/>
    v&aacute;&#353; &uacute;&#269;et byl &uacute;sp&#283;&#353;n&#283; vytvo&#345;en. Jste o krok bl&iacute;&#382;e k lep&#353;&iacute;mu zdrav&iacute;.
  </p>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#111;border-radius:12px;margin-bottom:24px;">
    <tr><td style="padding:20px 24px;">
      <p style="margin:0;color:#ccc;font-size:14px;line-height:1.7;">
        &#10003;&nbsp; 5denn&iacute; pr&#367;vodce vodn&iacute;m p&#367;stem krok za krokem<br/>
        &#10003;&nbsp; Personalizovan&yacute; obsah podle va&#353;eho pohlov&iacute;<br/>
        &#10003;&nbsp; Certifik&aacute;t po dokon&#269;en&iacute; p&#367;stu
      </p>
    </td></tr>
  </table>

  <p style="color:#ccc;font-size:15px;line-height:1.6;margin:0 0 8px;">Za&#269;n&#283;te vybr&aacute;n&iacute;m sv&eacute;ho pl&aacute;nu:</p>
  ${ctaButton("Zobrazit nab&iacute;dku", "https://the-pulse.cz/#pricing")}
  `);
}

export function adminNewUserNotification({
  name,
  email,
}: {
  name: string;
  email: string;
}): string {
  const now = new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" });
  return layout(`
  <h1 style="margin:0 0 8px;color:#22c55e;font-size:22px;font-weight:700;">Nov&yacute; u&#382;ivatel!</h1>
  <p style="margin:0 0 24px;color:#ccc;font-size:15px;">Na The-Pulse.cz se zaregistroval nov&yacute; u&#382;ivatel.</p>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#111;border-radius:12px;">
    <tr><td style="padding:20px 24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:8px 0;color:#888;font-size:14px;width:100px;">Jm&eacute;no:</td>
          <td style="padding:8px 0;color:#fff;font-size:14px;font-weight:600;">${name || "Neuvedeno"}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:14px;">Email:</td>
          <td style="padding:8px 0;color:#fff;font-size:14px;">${email}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:14px;">Datum:</td>
          <td style="padding:8px 0;color:#fff;font-size:14px;">${now}</td>
        </tr>
      </table>
    </td></tr>
  </table>
  `);
}

export function abandonedCheckoutEmail({
  customerName,
  plan,
  checkoutUrl,
}: {
  customerName: string;
  plan: string;
  checkoutUrl: string;
}): string {
  return layout(`
  <h1 style="margin:0 0 8px;color:#22c55e;font-size:22px;font-weight:700;">Va&#353;e cesta &#269;ek&aacute;...</h1>
  <p style="margin:0 0 24px;color:#ccc;font-size:15px;line-height:1.6;">
    Ahoj${customerName ? ` ${customerName}` : ""},<br/>
    v&#353;imli jsme si, &#382;e jste nedokon&#269;il/a objedn&aacute;vku pr&#367;vodce <strong style="color:#fff;">${plan}</strong>.
  </p>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#111;border-radius:12px;margin-bottom:24px;">
    <tr><td style="padding:24px;">
      <p style="margin:0 0 12px;color:#fff;font-size:15px;font-weight:600;">Pro&#269; za&#269;&iacute;t pr&aacute;v&#283; te&#271;?</p>
      <p style="margin:0;color:#ccc;font-size:14px;line-height:1.8;">
        &#9889;&nbsp; V&iacute;ce energie a lep&#353;&iacute; soust&#345;ed&#283;n&iacute;<br/>
        &#9889;&nbsp; Prov&#283;&#345;en&yacute; 5denn&iacute; pl&aacute;n krok za krokem<br/>
        &#9889;&nbsp; Podpora a motivace po celou dobu p&#367;stu<br/>
        &#9889;&nbsp; Certifik&aacute;t po &uacute;sp&#283;&#353;n&eacute;m dokon&#269;en&iacute;
      </p>
    </td></tr>
  </table>

  <p style="color:#ccc;font-size:15px;line-height:1.6;margin:0 0 8px;">Dokon&#269;ete objedn&aacute;vku jedn&iacute;m kliknut&iacute;m:</p>
  ${ctaButton("Dokon&#269;it objedn&aacute;vku", checkoutUrl)}

  <p style="color:#666;font-size:13px;text-align:center;margin:0;">Pokud jste se rozhodli objedn&aacute;vku zru&#353;it, tento email m&#367;&#382;ete ignorovat.</p>
  `);
}
