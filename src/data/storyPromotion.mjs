export function copenhagenDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Copenhagen', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const value = (name) => parts.find((part) => part.type === name).value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function validatePromotionPlan(stories, plan) {
  if (!plan || typeof plan.enabled !== 'boolean' || !Array.isArray(plan.entries)) {
    throw new Error('Invalid story promotion plan');
  }
  const slugs = new Set(stories.map((story) => story.slug));
  const seen = new Set();
  const ids = new Set();
  const dates = new Set();
  for (const entry of plan.entries) {
    if (!entry || !slugs.has(entry.slug) || seen.has(entry.slug)) throw new Error('Unknown or duplicate promotion slug');
    if (!/^hist-\d{6}$/.test(entry.id) || ids.has(entry.id)) throw new Error('Invalid or duplicate story ID');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date) || !Number.isFinite(Date.parse(entry.date)) || new Date(entry.date).toISOString().slice(0, 10) !== entry.date) throw new Error('Invalid promotion date');
    if (entry.publishAt !== undefined && (
      typeof entry.publishAt !== 'string' || !entry.publishAt.startsWith(entry.date + 'T') ||
      !Number.isFinite(Date.parse(entry.publishAt))
    )) throw new Error('Invalid publication time');
    if (entry.languages !== undefined && (!Array.isArray(entry.languages) || !entry.languages.length || new Set(entry.languages).size !== entry.languages.length || entry.languages.some(lang => !['da','en','de'].includes(lang)))) throw new Error('Invalid publication languages');
    if (dates.has(entry.date)) throw new Error('Only one promotion per day is supported');
    if (typeof entry.approved !== 'boolean') throw new Error('Explicit promotion approval is required');
    seen.add(entry.slug); ids.add(entry.id); dates.add(entry.date);
  }
}

export function promotionLanguages(entry) { return entry.languages ?? ['da', 'en', 'de']; }

export function promotionIsDue(entry, plan, now = new Date(), today = copenhagenDate(now)) {
  return plan.enabled && entry.approved && entry.date <= today &&
    (!entry.publishAt || Date.parse(entry.publishAt) <= Number(now));
}

export function selectPromotedStories(stories, plan, today, now = new Date()) {
  validatePromotionPlan(stories, plan);
  const entries = new Map(plan.entries.map((entry) => [entry.slug, entry]));
  const visible = stories.filter((story) => {
    const entry = entries.get(story.slug);
    return !entry || promotionIsDue(entry, plan, now, today);
  });
  // Latest promoted story leads the homepage. Keep the existing archive order otherwise.
  return visible.map((story, index) => ({ story, index })).sort((a, b) => {
    const left = entries.get(a.story.slug)?.date ?? '';
    const right = entries.get(b.story.slug)?.date ?? '';
    return right.localeCompare(left) || a.index - b.index;
  }).map(({ story }) => story);
}
