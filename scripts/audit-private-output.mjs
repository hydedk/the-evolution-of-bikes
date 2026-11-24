import { readdir, readFile } from 'node:fs/promises';
import { resolve, join, relative } from 'node:path';
const root = resolve(process.argv[2] || 'dist');
async function inspect(directory) {
  for (const entry of await readdir(directory, {withFileTypes:true})) {
    const file=join(directory,entry.name), path=relative(root,file).replaceAll('\\','/');
    if (/^de\/fahrer(?:\/|$)/.test(path) || /^(?:en\/)?(?:teams|ryttere|riders)(?:\/|$)/.test(path)) throw Error('Lokal hold- eller rytterside i produktionsoutput: '+path);
    if (entry.name.startsWith('rider-preview-')) throw Error('Lokalt rytterbillede i produktionsoutput: '+path);
    if (/(?:^|\/)(?:admin|local-editorial|lokal-admin|redaktion)(?:\/|$)/.test(path) || /editorial(?:Overview)?\.json(?:\.bak)?$/.test(path)) throw Error('Privat redaktionsfil i produktionsoutput: '+path);
    if (entry.isDirectory()) await inspect(file);
    else if (/\.(?:html|js|json|xml)$/.test(file)) {
      const text=await readFile(file,'utf8');
      if (['originalMetadata','rawFrontmatter','Hvad skal ellers ændres?','Lokal tilstand – intet udgives automatisk.','/admin/local/api'].some(marker=>text.includes(marker))) throw Error('Privat redaktionsindhold i produktionsoutput: '+path);
    }
  }
}
await inspect(root);console.log('Produktionskontrol bestået: intet adminmodul eller private redaktionsdata.');
