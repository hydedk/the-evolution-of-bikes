import { appendFile, writeFile } from 'node:fs/promises';
import { copenhagenDate } from '../src/data/storyPromotion.mjs';

const mode = process.argv[2];
const stamp = { date: copenhagenDate(), sha: process.env.GITHUB_SHA };
if (!stamp.sha) throw new Error('GITHUB_SHA is required');

if (mode === 'write') {
  // Written only after the production build and both audits succeed.
  await writeFile(new URL('../dist/promotion-deployment.json', import.meta.url), JSON.stringify(stamp));
} else if (mode === 'check') {
  const startedAt = new Date().toISOString();
  const trigger = process.env.PROMOTION_EVENT || 'local';
  const schedule = process.env.PROMOTION_SCHEDULE || 'none';
  console.log(JSON.stringify({ trigger, schedule, timezone: 'Europe/Copenhagen', startedAt, ...stamp }));
  let required = true;
  try {
    const response = await fetch(`https://teob.dk/promotion-deployment.json?t=${Date.now()}`, {
      cache: 'no-store', signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const live = await response.json();
    required = live.date !== stamp.date || live.sha !== stamp.sha;
  } catch (error) {
    // Missing marker, timeout or invalid response must permit a recovery build.
    console.log(`Cannot confirm today's deployment: ${error.message}`);
  }
  console.log(required ? 'Deployment required' : "Today's commit is already live; skipping build");
  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY,
      `## Daily promotion\n\nTrigger: ${trigger}\n\nCron: ${schedule} (Europe/Copenhagen)\n\nCheck started: ${startedAt}\n\nDanish date: ${stamp.date}\n\nBuild required: ${required}\n`);
  }
  if (!process.env.GITHUB_OUTPUT) throw new Error('GITHUB_OUTPUT is required');
  await appendFile(process.env.GITHUB_OUTPUT, `required=${required}\n`);
} else {
  throw new Error('Use check or write');
}
