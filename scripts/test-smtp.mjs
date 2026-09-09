import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let val = match[2] || '';
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    env[match[1]] = val.trim();
  }
});

console.log('Testing IONOS SMTP connection...');
console.log('Host:', env.SMTP_HOST || 'smtp.ionos.de');
console.log('Port:', env.SMTP_PORT || '465');
console.log('User:', env.SMTP_USER);

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST || 'smtp.ionos.de',
  port: parseInt(env.SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

async function verify() {
  try {
    const verified = await transporter.verify();
    console.log('✅ SMTP-Verbindung erfolgreich hergestellt und authentifiziert!', verified);

    // Sende eine Test-E-Mail an das eigene Postfach
    console.log('Sende Test-E-Mail an:', env.SMTP_USER);
    const info = await transporter.sendMail({
      from: env.EMAIL_FROM || `SicherVergleich <${env.SMTP_USER}>`,
      to: env.SMTP_USER,
      subject: 'Test-E-Mail: SicherVergleich Kontaktformular erfolgreich verbunden',
      text: 'Herzlichen Glückwunsch! Die E-Mail-Konfiguration für SicherVergleich (sichertarif.de) über IONOS SMTP funktioniert einwandfrei.',
      html: '<h2 style="color: #2563eb;">SicherVergleich E-Mail-Test erfolgreich!</h2><p>Die Anbindung an das IONOS SMTP-Postfach <strong>info@sichertarif.de</strong> funktioniert einwandfrei. Kontaktanfragen über Ihre Website werden ab sofort direkt hier zugestellt.</p>',
    });

    console.log('✅ Test-E-Mail erfolgreich versendet! Message-ID:', info.messageId);
  } catch (err) {
    console.error('❌ SMTP-Fehler:', err);
    process.exit(1);
  }
}

verify();
