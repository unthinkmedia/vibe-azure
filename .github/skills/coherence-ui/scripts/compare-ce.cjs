const https = require('https');
const fs = require('fs');

const refDir = '.github/skills/coherence-ui/references/components';
const refFiles = fs.readdirSync(refDir).filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''));

const url = 'https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/cdn/latest/custom-elements.json';
https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const ceComponents = new Set();
    for (const mod of json.modules) {
      const match = mod.path.match(/^src\/components\/([^/]+)\//);
      if (match) ceComponents.add(match[1]);
    }
    const ceList = [...ceComponents].sort();
    const refSet = new Set(refFiles);

    const overlap = ceList.filter(c => refSet.has(c));
    const ceOnly = ceList.filter(c => !refSet.has(c));
    const refOnly = refFiles.sort().filter(c => !ceComponents.has(c));

    console.log('=== SUMMARY ===');
    console.log('custom-elements.json components: ' + ceList.length);
    console.log('Existing reference docs: ' + refFiles.length);
    console.log('');
    console.log('=== OVERLAP (in both): ' + overlap.length + ' ===');
    overlap.forEach(c => console.log('  ✓ ' + c));
    console.log('');
    console.log('=== IN custom-elements.json ONLY (new/missing from refs): ' + ceOnly.length + ' ===');
    ceOnly.forEach(c => console.log('  + ' + c));
    console.log('');
    console.log('=== IN references ONLY (not in custom-elements.json): ' + refOnly.length + ' ===');
    refOnly.forEach(c => console.log('  - ' + c));
  });
});
