/**
 * Generuje ukázkový PDF certifikát
 * Spustit: npx tsx scripts/generate-certificate-pdf.ts
 * Výstup: certificate-preview.html (otevřít v prohlížeči → Print → Save as PDF)
 */
import { writeFileSync } from "fs";

const certificate = {
  name: "David Andrle",
  startDate: "5. 2. 2026",
  endDate: "10. 2. 2026",
  certificateId: "PULSE-2026-58392",
  createdAt: "10. 2. 2026",
};

const html = `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>Certifikát ${certificate.certificateId}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    @page {
      size: A4 landscape;
      margin: 0;
    }

    body {
      width: 297mm;
      height: 210mm;
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f766e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .certificate {
      width: 260mm;
      height: 180mm;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f172a 100%);
      border: 3px solid #fbbf24;
      border-radius: 16px;
      padding: 30px 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    /* Corner ornaments */
    .certificate::before,
    .certificate::after {
      content: '';
      position: absolute;
      width: 80px;
      height: 80px;
      border: 2px solid rgba(251, 191, 36, 0.3);
    }
    .certificate::before {
      top: 15px;
      left: 15px;
      border-right: none;
      border-bottom: none;
      border-radius: 8px 0 0 0;
    }
    .certificate::after {
      bottom: 15px;
      right: 15px;
      border-left: none;
      border-top: none;
      border-radius: 0 0 8px 0;
    }

    .corner-tr, .corner-bl {
      position: absolute;
      width: 80px;
      height: 80px;
      border: 2px solid rgba(251, 191, 36, 0.3);
    }
    .corner-tr {
      top: 15px;
      right: 15px;
      border-left: none;
      border-bottom: none;
      border-radius: 0 8px 0 0;
    }
    .corner-bl {
      bottom: 15px;
      left: 15px;
      border-right: none;
      border-top: none;
      border-radius: 0 0 0 8px;
    }

    /* Subtle background pattern */
    .bg-pattern {
      position: absolute;
      inset: 0;
      opacity: 0.03;
      background-image: radial-gradient(circle at 25% 25%, #fbbf24 1px, transparent 1px),
                         radial-gradient(circle at 75% 75%, #fbbf24 1px, transparent 1px);
      background-size: 30px 30px;
    }

    .logo {
      color: #2dd4bf;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 4px;
      text-transform: uppercase;
      margin-bottom: 8px;
      position: relative;
    }

    .badge {
      margin: 12px 0;
      position: relative;
    }

    .badge svg {
      filter: drop-shadow(0 4px 20px rgba(251, 191, 36, 0.3));
    }

    .label {
      color: #fbbf24;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 6px;
      text-transform: uppercase;
      margin-bottom: 4px;
      position: relative;
    }

    .title {
      color: #ffffff;
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 4px;
      position: relative;
    }

    .subtitle {
      color: #fbbf24;
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 22px;
      position: relative;
    }

    .name {
      color: #ffffff;
      font-size: 38px;
      font-weight: 900;
      margin-bottom: 18px;
      text-shadow: 0 2px 10px rgba(255,255,255,0.1);
      position: relative;
    }

    .dates {
      color: #5eead4;
      font-size: 13px;
      line-height: 1.8;
      margin-bottom: 22px;
      position: relative;
    }

    .divider {
      width: 200px;
      height: 1px;
      background: linear-gradient(to right, transparent, #475569, transparent);
      margin: 0 auto 12px;
      position: relative;
    }

    .footer {
      color: #475569;
      font-size: 10px;
      text-align: center;
      position: relative;
    }

    .footer .cert-id {
      color: #64748b;
      font-size: 11px;
      margin-bottom: 3px;
    }

    .verification {
      margin-top: 8px;
      color: #64748b;
      font-size: 9px;
      letter-spacing: 1px;
      position: relative;
    }

    .share-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 14px;
      padding: 8px 20px;
      background: #0d9488;
      color: white;
      border: none;
      border-radius: 10px;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      position: relative;
    }

    .share-btn:hover {
      background: #0f766e;
    }

    @media print {
      .share-btn { display: none; }
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="bg-pattern"></div>
    <div class="corner-tr"></div>
    <div class="corner-bl"></div>

    <div class="logo">The-Pulse.cz</div>

    <div class="badge">
      <svg width="100" height="100" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="95" stroke="#fbbf24" stroke-width="3" fill="none" />
        <circle cx="100" cy="100" r="85" fill="url(#certGrad)" />
        <path d="M100 40l15.5 31.3 34.5 5-25 24.3 5.9 34.4L100 119.8 69.1 135l5.9-34.4-25-24.3 34.5-5L100 40z" fill="#fbbf24" stroke="#f59e0b" stroke-width="2" />
        <text x="100" y="95" text-anchor="middle" font-family="Inter, sans-serif" font-size="20" font-weight="700" fill="white">5</text>
        <text x="100" y="112" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="white" letter-spacing="1">DNI</text>
        <defs>
          <linearGradient id="certGrad" x1="15" y1="15" x2="185" y2="185">
            <stop stop-color="#0f172a" />
            <stop offset="0.5" stop-color="#134e4a" />
            <stop offset="1" stop-color="#0f766e" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div class="label">Certifikát</div>
    <div class="title">5 dní vodního půstu</div>
    <div class="subtitle">Úspěšně dokončeno</div>

    <div class="name">${certificate.name}</div>

    <div class="dates">
      Zahájení: ${certificate.startDate}<br>
      Dokončení: ${certificate.endDate}
    </div>

    <div class="divider"></div>

    <div class="footer">
      <div class="cert-id">Certifikát ID: ${certificate.certificateId}</div>
      <div>Vystaveno: ${certificate.createdAt}</div>
    </div>

    <div class="verification">Ověřeno na the-pulse.cz/certifikat/${certificate.certificateId}</div>

    <button class="share-btn" onclick="navigator.share ? navigator.share({title:'Certifikát',text:'${certificate.name} úspěšně dokončil/a 5denní vodní půst!',url:'https://www.the-pulse.cz/certifikat/${certificate.certificateId}'}) : navigator.clipboard.writeText('https://www.the-pulse.cz/certifikat/${certificate.certificateId}').then(()=>alert('Odkaz zkopírován!'))">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
      </svg>
      Sdílet certifikát
    </button>
  </div>
</body>
</html>`;

const outputPath = "/Users/david/Desktop/certificate-preview.html";
writeFileSync(outputPath, html);
console.log(`Certifikát vygenerován: ${outputPath}`);
console.log(`Otevři v prohlížeči a ulož jako PDF (Cmd+P → Save as PDF)`);
