import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {selectPromotedStories} from '../src/data/storyPromotion.mjs';
const plan=JSON.parse(await readFile(new URL('../src/data/storyPromotions.json',import.meta.url)));
const stories=plan.entries.map(({slug})=>({slug}));
const scheduled=plan.entries.filter(e=>e.date>='2026-11-06');
assert.equal(scheduled.length,12);
for(const entry of scheduled){const before=new Date(Date.parse(entry.date)-86400000).toISOString().slice(0,10);assert(!selectPromotedStories(stories,plan,before).some(s=>s.slug===entry.slug));assert(selectPromotedStories(stories,plan,entry.date).some(s=>s.slug===entry.slug));}
for (const [id,date] of Object.entries({"hist-000220":"2026-11-19","hist-000254":"2026-11-15","hist-000272":"2026-11-18","hist-000469":"2026-11-17"})) assert(plan.entries.some(e=>e.id===id && e.date===date && e.approved));
assert(!plan.entries.some(e=>['hist-000127','hist-000204','hist-000261','hist-000474'].includes(e.id)));
assert(!plan.entries.some(e=>e.slug==='alfonsina-strada-giro-1924'),'Existing canonical article must remain visible before its revision');
for(const prefix of ['historier','en/stories']){const page=await readFile(new URL(`../src/pages/${prefix}/alfonsina-strada-giro-1924.astro`,import.meta.url),'utf8');assert(page.includes("copenhagenDate() >= '2026-11-05'"));assert(page.includes('<Previous/>'));}
console.log('Approved story schedule: twelve date boundaries, unapproved exclusion and canonical scheduled revision passed.');
