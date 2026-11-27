import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {promotionLanguages, validatePromotionPlan, promotionIsDue} from '../src/data/storyPromotion.mjs';
const plan=JSON.parse(await readFile(new URL('../src/data/storyPromotions.json',import.meta.url)));
const entries=plan.entries.filter(e=>e.languages);assert.equal(entries.length,22);
for(const entry of entries){assert.deepEqual(promotionLanguages(entry),['da','en']);const exact=new Date(entry.publishAt);assert(!promotionIsDue(entry,plan,new Date(+exact-1)));assert(promotionIsDue(entry,plan,exact));assert(!promotionIsDue({...entry,approved:false},plan,exact));}
assert.deepEqual(promotionLanguages({}),['da','en','de']);
for(const languages of [[],['fr'],['da','da']])assert.throws(()=>validatePromotionPlan([{slug:'test'}],{enabled:true,entries:[{id:'hist-999999',slug:'test',date:'2026-12-01',approved:true,languages}]}));
const source=await readFile(new URL('../src/data/approvedStories20261128.ts',import.meta.url),'utf8');assert(!/"de"\s*:|captionDe|altDe/.test(source));const december=await readFile(new URL('../src/data/approvedStories20261206.ts',import.meta.url),'utf8');assert(!/"de"\s*:|captionDe|altDe/.test(december));console.log('Twenty-two DA/EN schedules, German exclusion, approval and timestamp boundaries passed.');

const nextWeek=await readFile(new URL('../src/data/approvedStories20261213.ts',import.meta.url),'utf8');assert(!/"de"\s*:|captionDe|altDe/.test(nextWeek));
