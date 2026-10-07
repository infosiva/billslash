import { chromium } from '/Users/sivaprakasam/projects/agents/qa-dashboard/node_modules/playwright/index.mjs';
const [url,out]=process.argv.slice(2); const b=await chromium.launch();
for(const [w,h] of [[375,812],[1280,800]]){const pg=await b.newPage({viewport:{width:w,height:h}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto(url,{waitUntil:'load'});await pg.waitForTimeout(3500);await pg.screenshot({path:`${out}-${w}.png`});
console.log(w,'overflow',await pg.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),'errs',errs.join('|'));await pg.close();}
await b.close();
