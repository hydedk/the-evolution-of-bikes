import test from 'node:test';
import assert from 'node:assert/strict';
import { isUnreleasedHref } from '../src/data/publicationBoundary.mjs';

test('work sections stay unavailable for public navigation, including direct links', () => {
  for (const href of ['/loeb', '/loeb/tour-de-france/', '/teams/molteni/?year=1974', '/ryttere/alex-darville/#results',
    '/bikes/alan/', '/en/races/', '/en/teams/molteni/', '/en/riders/alex-darville/',
    '/en/brands/giame/', '/en/bikes/alan/', '/de/fahrer/alex-darville/', 'https://teob.dk/loeb/']) {
    assert.equal(isUnreleasedHref(href), true, href);
  }
});

test('public bicycles, periods, stories and support pages remain available', () => {
  for (const href of ['/', '/historier/', '/perioder/1900-1920/', '/cykler/giame/', '/om/', '/fortael-din-historie/', '/privatliv/',
    '/en/', '/en/stories/', '/en/periods/', '/en/bikes/', '/en/bikes/giame/', '/en/bikes/cycles-france-sport/',
    '/en/share-your-story/', '/en/privacy/', 'https://example.org/loeb/']) {
    assert.equal(isUnreleasedHref(href), false, href);
  }
});
