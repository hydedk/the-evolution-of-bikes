import { strict as assert } from 'node:assert';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { copenhagenDate } from '../src/data/storyPromotion.mjs';

const temporary = await mkdtemp(join(tmpdir(), 'teob-deployment-'));
const script = new URL('./promotion-deployment.mjs', import.meta.url).href;
try {
  for (const [name, body, required] of [
    ['already live', `return {ok:true,json:async()=>({date:'${copenhagenDate()}',sha:'test-commit'})}`, false],
    ['previous day', "return {ok:true,json:async()=>({date:'2000-01-01',sha:'test-commit'})}", true],
    ['new commit', `return {ok:true,json:async()=>({date:'${copenhagenDate()}',sha:'older-commit'})}`, true],
    ['missing marker', 'return {ok:false,status:404}', true],
    ['network failure', "throw new Error('timeout')", true],
    ['invalid JSON', "return {ok:true,json:async()=>{throw new Error('invalid JSON')}}", true],
  ]) {
    const output = join(temporary, name.replaceAll(' ', '-'));
    execFileSync(process.execPath, ['--input-type=module', '-e',
      `globalThis.fetch=async()=>{${body}}; process.argv[2]='check'; await import(${JSON.stringify(script)});`],
    { env: { ...process.env, GITHUB_SHA: 'test-commit', GITHUB_OUTPUT: output } });
    assert.equal(await readFile(output, 'utf8'), `required=${required}\n`, name);
  }
  console.log('Deployment checks passed: live, stale, new commit, missing marker, network failure, invalid JSON.');
} finally {
  await rm(temporary, { recursive: true, force: true });
}
