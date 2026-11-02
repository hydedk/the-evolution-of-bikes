import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {selectPromotedStories} from '../src/data/storyPromotion.mjs';
const plan=JSON.parse(await readFile(new URL('../src/data/storyPromotions.json',import.meta.url)));
const stories=plan.entries.map(({slug})=>({slug}));
const scheduled=plan.entries.filter(e=>e.date>='2026-11-06');
assert.equal(scheduled.length,8);
for(const entry of scheduled){const before=new Date(Date.parse(entry.date)-86400000).toISOString().slice(0,10);assert(!selectPromotedStories(stories,plan,before).some(s=>s.slug===entry.slug));assert(selectPromotedStories(stories,plan,entry.date).some(s=>s.slug===entry.slug));}
assert(!plan.entries.some(e=>e.id==='hist-000204'),'Queen has not been approved');
assert(!plan.entries.some(e=>e.slug==='alfonsina-strada-giro-1924'),'Existing canonical article must remain visible before its revision');
for(const prefix of ['historier','en/stories']){const page=await readFile(new URL(`../src/pages/${prefix}/alfonsina-strada-giro-1924.astro`,import.meta.url),'utf8');assert(page.includes("copenhagenDate() >= '2026-11-05'"));assert(page.includes('<Previous/>'));}
console.log('Approved story schedule: eight date boundaries, unapproved exclusion and canonical scheduled revision passed.');
