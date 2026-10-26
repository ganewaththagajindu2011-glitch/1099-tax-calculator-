import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

// Execute the actual unchanged estimator, so published examples cannot silently drift.
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const source = html.slice(html.indexOf('const TAX ='), html.indexOf('const form ='));
const context = vm.createContext({});
vm.runInContext(source, context);
const tax = context.calculateTax;
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 0.00001, `${actual} != ${expected}`);
const scenarios = [
  [30000, 5416.92175, 24583.07825, 451, 1354],
  [50000, 10460.8885, 39539.1115, 872, 2615],
  [75000, 17101.474625, 57898.525375, 1425, 4275],
  [100000, 25745.2995, 74254.7005, 2145, 6436]
];
const guide = readFileSync(new URL('../guides/1099-estimated-tax-calculator/index.html', import.meta.url), 'utf8');
const money = value => '$' + Math.round(value).toLocaleString('en-US');
for (const [income, total, after, monthly, quarterly] of scenarios) {
  const result = tax(income, 0, 'single');
  near(result.total, total); near(result.after, after);
  assert.equal(Math.round(result.monthly), monthly);
  assert.equal(Math.round(result.quarterly), quarterly);
  for (const page of [html, guide]) {
    const row = page.match(new RegExp(`<tr><th scope="row"><a[^>]+href="/#example-${income}"[^>]*>.*?</tr>`))?.[0];
    assert.ok(row, `Missing linked ${income} example`);
    for (const value of [total, after, monthly]) assert.ok(row.includes(money(value)));
  }
}
near(tax(50000, 10000, 'single').total, 7932.7108);
assert.equal(tax(0, 0, 'single').total, 0);
assert.equal(tax(500, 700, 'single').net, 0);
assert.equal(tax(400, 0, 'single').se, 0);
assert.ok(tax(434, 0, 'single').se > 0);
near(tax(300000, 0, 'single').se, 184500 * .124 + 300000 * .9235 * .029);
assert.ok(tax(50000, 0, 'joint').federal < tax(50000, 0, 'single').federal);
assert.ok(tax(50000, 0, 'head').federal < tax(50000, 0, 'single').federal);
for (const args of [[-1,0,'single'],[1,NaN,'single'],[1,0,'unknown']]) assert.throws(() => tax(...args));
console.log('Tax examples, static tables, filing statuses, thresholds, cap and invalid inputs passed.');
