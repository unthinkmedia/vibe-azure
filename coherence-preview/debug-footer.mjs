import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://localhost:5175/#pattern-service-card', { waitUntil: 'networkidle' });
await page.waitForSelector('.service-card');

const data = await page.evaluate(() => {
  const card = document.querySelector('.service-card');
  const actions = card.querySelector('.service-card-actions');
  const actionsRect = actions.getBoundingClientRect();
  const actionsStyle = getComputedStyle(actions);
  
  const btns = actions.querySelectorAll('cui-button');
  const btnData = Array.from(btns).map(btn => {
    const r = btn.getBoundingClientRect();
    return {
      text: btn.textContent?.trim() || '(icon-only)',
      width: Math.round(r.width),
      height: Math.round(r.height),
      leftFromActions: Math.round(r.left - actionsRect.left),
      topFromActions: Math.round(r.top - actionsRect.top),
    };
  });
  
  // Gap between buttons
  const gaps = [];
  for (let i = 1; i < btns.length; i++) {
    const prev = btns[i-1].getBoundingClientRect();
    const curr = btns[i].getBoundingClientRect();
    gaps.push({
      between: `"${btns[i-1].textContent?.trim()}" → "${btns[i].textContent?.trim()}"`,
      gap: Math.round(curr.left - prev.right),
    });
  }
  
  return {
    actions: {
      width: Math.round(actionsRect.width),
      height: Math.round(actionsRect.height),
      padding: actionsStyle.padding,
      gap: actionsStyle.gap,
      borderTop: actionsStyle.borderTop,
    },
    buttons: btnData,
    gaps,
  };
});

console.log('\n=== FOOTER ACTIONS SPACING ===\n');
console.log('Actions bar:', JSON.stringify(data.actions, null, 2));
console.log('\nButtons:');
data.buttons.forEach(b => console.log(`  "${b.text}": ${b.width}×${b.height}, left=${b.leftFromActions}, top=${b.topFromActions}`));
console.log('\nGaps:');
data.gaps.forEach(g => console.log(`  ${g.between}: ${g.gap}px`));

await browser.close();
