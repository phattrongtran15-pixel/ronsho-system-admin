// Verification test suite for ronsho-system-admin
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- Running Ronsho System Admin Test Suite ---');

// Test 1: Check index.html exists and contains essential brand keys
const indexPath = path.join(__dirname, 'index.html');
assert(fs.existsSync(indexPath), 'index.html must exist');
const html = fs.readFileSync(indexPath, 'utf8');

assert(html.includes('RONSHO'), 'index.html must contain brand RONSHO');
assert(html.includes('CIRCUIT BREAKER'), 'index.html must contain Circuit Breaker telemetry');
assert(html.includes('RON RUNTIME'), 'index.html must contain Ron Runtime');
assert(html.includes('GOOSE HEADLESS'), 'index.html must contain Goose Headless');
assert(html.includes('KILO BUILDER'), 'index.html must contain Kilo Builder');
assert(html.includes('ANTI CLOUD'), 'index.html must contain Anti Cloud');
assert(html.includes('THUYỀN TRƯỞNG RON'), 'index.html must contain Fleet Commander Ron');
console.log('✓ Test 1 PASS: Brand & Agent identities verified.');

// Test 2: Check package.json
const pkgPath = path.join(__dirname, 'package.json');
assert(fs.existsSync(pkgPath), 'package.json must exist');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
assert.strictEqual(pkg.name, 'ronsho-system-admin');
console.log('✓ Test 2 PASS: package.json metadata verified.');

// Test 3: Check GitHub Actions workflows
const ciPath = path.join(__dirname, '.github', 'workflows', 'ci.yml');
const deployPath = path.join(__dirname, '.github', 'workflows', 'deploy-pages.yml');
assert(fs.existsSync(ciPath), 'ci.yml must exist');
assert(fs.existsSync(deployPath), 'deploy-pages.yml must exist');
console.log('✓ Test 3 PASS: GitHub Actions CI/CD workflows verified.');

console.log('==================================================');
console.log('ALL 3/3 TESTS PASSED: READY FOR PRODUCTION DEPLOY');
console.log('==================================================');
