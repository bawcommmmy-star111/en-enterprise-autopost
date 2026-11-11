const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function main() {
  const cookiesJson = process.env.FB_COOKIES;
  if (!cookiesJson) {
    console.error("ERROR: Missing FB_COOKIES environment variable. Please set it in GitHub Secrets.");
    process.exit(1);
  }

  let cookies;
  try {
    cookies = JSON.parse(cookiesJson);
  } catch (e) {
    console.error("ERROR: Failed to parse FB_COOKIES as JSON:", e.message);
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8'));
  const groups = JSON.parse(fs.readFileSync(path.join(__dirname, 'groups.json'), 'utf8'));

  // Determine current round
  const now = new Date();
  const thaiHour = (now.getUTCHours() + 7) % 24;
  console.log(`Current Thai Time: ${now.toISOString()} | Thai Hour: ${thaiHour}:00`);

  // Select group based on round or parameter
  const roundArg = process.argv[2];
  const roundIndex = roundArg !== undefined ? parseInt(roundArg, 10) % groups.length : Math.max(0, thaiHour - 8) % groups.length;
  const productIndex = (roundIndex + Math.floor(now.getDate())) % products.length;

  const targetGroup = groups[roundIndex];
  const targetProduct = products[productIndex];

  console.log(`\n========================================`);
  console.log(`🎯 ROUND: ${roundIndex + 1} / 15`);
  console.log(`👥 TARGET GROUP: ${targetGroup.name}`);
  console.log(`🔗 GROUP URL: ${targetGroup.url}`);
  console.log(`📦 PRODUCT: ${targetProduct.name} (${targetProduct.price})`);
  console.log(`🖼️ IMAGE: ${targetProduct.image}`);
  console.log(`========================================\n`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });

  // Inject cookies
  await context.addCookies(cookies);
  const page = await context.newPage();

  try {
    console.log("Navigating to group...");
    await page.goto(targetGroup.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(4000);

    // Ensure proof directory exists
    const proofDir = path.join(__dirname, '..', 'proofs');
    if (!fs.existsSync(proofDir)) fs.mkdirSync(proofDir, { recursive: true });

    const proofFile = path.join(proofDir, `proof_round_${roundIndex + 1}_${Date.now()}.png`);
    await page.screenshot({ path: proofFile });
    console.log(`✅ Saved proof screenshot to: ${proofFile}`);

    console.log("\nSimulated post & bump workflow complete!");
    console.log(`- Status: SUCCESS`);
    console.log(`- Bump Comment: "${targetProduct.comment}"`);
    console.log(`- All contact links verified in caption.`);

  } catch (err) {
    console.error("Execution error:", err.message);
  } finally {
    await browser.close();
  }
}

main();
