#!/usr/bin/env node

// Simple JavaScript syntax validator
const fs = require('fs');
const { JVM } = require('vm');

function validateJavaScriptSyntax(filePath) {
    try {
        const code = fs.readFileSync(filePath, 'utf8');

        // Try to parse the code
        new Function(code);

        console.log(`✓ ${filePath}: Syntax is valid`);
        return true;
    } catch (error) {
        console.log(`✗ ${filePath}: Syntax error - ${error.message}`);
        return false;
    }
}

// Validate our fixed files
console.log('Validating JavaScript syntax...');
validateJavaScriptSyntax('js/input-handler.js');
validateJavaScriptSyntax('js/app.js');