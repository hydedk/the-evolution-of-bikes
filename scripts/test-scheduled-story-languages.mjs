import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {promotionLanguages, validatePromotionPlan, promotionIsDue} from '../src/data/storyPromotion.mjs';
const plan=JSON.parse(await readFile(new URL('../src/data/storyPromotions.json',import.meta.url)));
assert.equal(plan.entries.filter(e=>e.languages).length,23);
const entries=plan.entries.filter(e=>e.languages && e.id!=='hist-000540');assert.equal(entries.length,22);
for(const entry of entries){assert.deepEqual(promotionLanguages(entry),['da','en']);const exact=new Date(entry.publishAt);assert(!promotionIsDue(entry,plan,new Date(+exact-1)));assert(promotionIsDue(entry,plan,exact));assert(!promotionIsDue({...entry,approved:false},plan,exact));}
assert.deepEqual(promotionLanguages({}),['da','en','de']);
for(const languages of [[],['fr'],['da','da']])assert.throws(()=>validatePromotionPlan([{slug:'test'}],{enabled:true,entries:[{id:'hist-999999',slug:'test',date:'2026-12-01',approved:true,languages}]}));
const source=await readFile(new URL('../src/data/approvedStories20261128.ts',import.meta.url),'utf8');assert(!/"de"\s*:|captionDe|altDe/.test(source));const december=await readFile(new URL('../src/data/approvedStories20261206.ts',import.meta.url),'utf8');assert(!/"de"\s*:|captionDe|altDe/.test(december));console.log('Twenty-two DA/EN schedules, German exclusion, approval and timestamp boundaries passed.');

const nextWeek=await readFile(new URL('../src/data/approvedStories20261213.ts',import.meta.url),'utf8');assert(!/"de"\s*:|captionDe|altDe/.test(nextWeek));

const willard=plan.entries.find(e=>e.id==='hist-000540');
assert.equal(willard.approved,true);assert.deepEqual(promotionLanguages(willard),['da','en','de']);
const sourceWillard=await readFile(new URL('../src/data/approvedStoriesWillard20261128.ts',import.meta.url),'utf8');
for(const lang of ['da','en','de'])assert(new RegExp('"'+lang+'"\\s*:').test(sourceWillard));
assert(!promotionIsDue(willard,plan,new Date('2026-12-22T08:59:59.999+01:00')));
assert(promotionIsDue(willard,plan,new Date('2026-12-22T09:00:00+01:00')));
console.log('Willard is the one explicitly approved three-language schedule; existing twenty-two DA/EN-only schedules stay unchanged.');
