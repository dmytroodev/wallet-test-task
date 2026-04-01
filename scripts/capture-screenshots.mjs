import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
})

const page = await context.newPage()

await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
await page.screenshot({ path: 'screenshots/transactions-list.png', fullPage: false })

await page.goto('http://127.0.0.1:4173/transaction/tx-001', {
  waitUntil: 'networkidle',
})
await page.screenshot({ path: 'screenshots/transaction-detail.png', fullPage: false })

await browser.close()
