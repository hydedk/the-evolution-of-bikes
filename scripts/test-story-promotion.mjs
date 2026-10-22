import assert from 'node:assert/strict';
import { copenhagenDate, selectPromotedStories } from '../src/data/storyPromotion.mjs';
const stories = [{slug:'old'}, {slug:'next'}, {slug:'later'}];
const entries = [
  {id:'hist-000001',slug:'next',date:'2026-10-23',approved:true},
  {id:'hist-000002',slug:'later',date:'2026-10-24',approved:false},
];
const plan = {enabled:true, entries};
const slugs = (p, date) => selectPromotedStories(stories,p,date).map(s=>s.slug);
assert.deepEqual(slugs(plan,'2026-10-22'),['old']);
assert.deepEqual(slugs(plan,'2026-10-23'),['next','old']);
assert.deepEqual(slugs(plan,'2026-10-25'),['next','old']);
assert.deepEqual(slugs({...plan,enabled:false},'2026-10-25'),['old']);
assert.deepEqual(slugs({enabled:false,entries:[]},'2026-10-25'),['old','next','later']);
assert.equal(copenhagenDate(new Date('2026-10-22T22:01:00Z')),'2026-10-23');
assert.equal(copenhagenDate(new Date('2026-12-22T22:01:00Z')),'2026-12-22');
assert.equal(copenhagenDate(new Date('2026-10-25T01:30:00Z')),'2026-10-25');
for (const bad of [
  [...entries,entries[0]],
  [{...entries[0],slug:'missing'}],
  [{...entries[0],date:'2026-02-30'}],
  [{...entries[0],approved:undefined}],
  [entries[0],{...entries[1],date:entries[0].date}],
]) assert.throws(()=>slugs({enabled:true,entries:bad},'2026-10-25'));
console.log('Promotion checks passed: dates, approval, pause, order, DST and invalid plans.');
