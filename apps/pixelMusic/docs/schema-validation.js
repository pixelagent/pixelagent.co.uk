/**
 * Schema Validation Script
 * Validates all Strudel schema files for consistency and completeness
 */

class SchemaValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.schemas = {};
    }

    async loadSchemas() {
        try {
            const [
                nodeSchemaRes,
                propertySchemaRes,
                instrumentSchemaRes,
                controlSchemaRes,
                miniNotationRes,
                combinatorSchemaRes,
                functionSchemaRes,
                indexSchemaRes
            ] = await Promise.all([
                fetch('nodes/strudel-node-schema.json'),
                fetch('nodes/strudel-node-properties.json'),
                fetch('nodes/strudel-node-instruments.json'),
                fetch('nodes/strudel-control-nodes.json'),
                fetch('nodes/strudel-mini-notation.json'),
                fetch('nodes/strudel-pattern-combinators.json'),
                fetch('nodes/strudel-pattern-functions.json'),
                fetch('nodes/strudel-schema-index.json')
            ]);

            if (nodeSchemaRes.ok) this.schemas.nodeSchema = await nodeSchemaRes.json();
            if (propertySchemaRes.ok) this.schemas.propertySchema = await propertySchemaRes.json();
            if (instrumentSchemaRes.ok) this.schemas.instrumentSchema = await instrumentSchemaRes.json();
            if (controlSchemaRes.ok) this.schemas.controlSchema = await controlSchemaRes.json();
            if (miniNotationRes.ok) this.schemas.miniNotationSchema = await miniNotationRes.json();
            if (combinatorSchemaRes.ok) this.schemas.combinatorSchema = await combinatorSchemaRes.json();
            if (functionSchemaRes.ok) this.schemas.functionSchema = await functionSchemaRes.json();
            if (indexSchemaRes.ok) this.schemas.indexSchema = await indexSchemaRes.json();

            return true;
        } catch (error) {
            this.errors.push(`Failed to load schemas: ${error.message}`);
            return false;
        }
    }

    validateNodeSchema() {
        const schema = this.schemas.nodeSchema;
        if (!schema) {
            this.errors.push('Node schema is missing');
            return;
        }

        // Validate required structure
        if (!schema.nodes) {
            this.errors.push('Node schema missing "nodes" property');
            return;
        }

        // Validate each node
        Object.entries(schema.nodes).forEach(([nodeId, nodeDef]) => {
            // Check required properties
            if (!nodeDef.title) {
                this.warnings.push(`Node ${nodeId} missing title`);
            }
            if (!nodeDef.category) {
                this.warnings.push(`Node ${nodeId} missing category`);
            }
            if (!nodeDef.execution) {
                this.warnings.push(`Node ${nodeId} missing execution stage`);
            }

            // Validate sockets
            if (nodeDef.sockets) {
                if (nodeDef.sockets.in && !Array.isArray(nodeDef.sockets.in)) {
                    this.errors.push(`Node ${nodeId} has invalid input sockets`);
                }
                if (nodeDef.sockets.out && !Array.isArray(nodeDef.sockets.out)) {
                    this.errors.push(`Node ${nodeId} has invalid output sockets`);
                }
            }

            // Validate child node support
            if (nodeDef.children !== undefined) {
                if (typeof nodeDef.children !== 'boolean') {
                    this.errors.push(`Node ${nodeId} children property must be boolean`);
                }
                if (nodeDef.minChildren !== undefined && typeof nodeDef.minChildren !== 'number') {
                    this.errors.push(`Node ${nodeId} minChildren must be number`);
                }
                if (nodeDef.maxChildren !== undefined && typeof nodeDef.maxChildren !== 'number') {
                    this.errors.push(`Node ${nodeId} maxChildren must be number`);
                }
            }

            // Validate execution stage
            if (nodeDef.execution && nodeDef.execution.stage) {
                const validStages = ['source', 'wrapper', 'effect', 'output'];
                if (!validStages.includes(nodeDef.execution.stage)) {
                    this.warnings.push(`Node ${nodeId} has unknown execution stage: ${nodeDef.execution.stage}`);
                }
            }
        });
    }

    validatePropertySchema() {
        const schema = this.schemas.propertySchema;
        if (!schema) {
            this.errors.push('Property schema is missing');
            return;
        }

        // Validate node properties
        if (schema.nodes) {
            Object.entries(schema.nodes).forEach(([nodeId, properties]) => {
                Object.entries(properties).forEach(([propName, propDef]) => {
                    if (!propDef.type) {
                        this.errors.push(`Property ${propName} in node ${nodeId} missing type`);
                    }
                    if (!propDef.title) {
                        this.warnings.push(`Property ${propName} in node ${nodeId} missing title`);
                    }

                    // Validate type-specific properties
                    if (propDef.type === 'number') {
                        if (propDef.min !== undefined && propDef.max !== undefined && propDef.min > propDef.max) {
                            this.errors.push(`Property ${propName} in node ${nodeId} has min > max`);
                        }
                    } else if (propDef.type === 'enum' && !propDef.options) {
                        this.errors.push(`Property ${propName} in node ${nodeId} missing options`);
                    }
                });
            });
        }

        // Validate transform nodes
        if (schema.transformNodes) {
            Object.entries(schema.transformNodes).forEach(([nodeId, properties]) => {
                if (!properties.transformFunction) {
                    this.warnings.push(`Transform node ${nodeId} missing transformFunction property`);
                }
            });
        }
    }

    validateInstrumentSchema() {
        const schema = this.schemas.instrumentSchema;
        if (!schema) {
            this.errors.push('Instrument schema is missing');
            return;
        }

        if (!schema.menus) {
            this.errors.push('Instrument schema missing menus');
            return;
        }

        schema.menus.forEach((menu, menuIndex) => {
            if (!menu.title) {
                this.warnings.push(`Menu ${menuIndex} missing title`);
            }
            if (!menu.groups) {
                this.errors.push(`Menu ${menuIndex} missing groups`);
                return;
            }

            menu.groups.forEach((group, groupIndex) => {
                if (!group.title) {
                    this.warnings.push(`Menu ${menuIndex} group ${groupIndex} missing title`);
                }
                if (!group.items || !Array.isArray(group.items)) {
                    this.errors.push(`Menu ${menuIndex} group ${groupIndex} missing items`);
                    return;
                }

                group.items.forEach((item, itemIndex) => {
                    if (typeof item === 'object' && !item.id) {
                        this.warnings.push(`Menu ${menuIndex} group ${groupIndex} item ${itemIndex} missing id`);
                    }
                });
            });
        });
    }

    validateControlSchema() {
        const schema = this.schemas.controlSchema;
        if (!schema) {
            this.errors.push('Control schema is missing');
            return;
        }

        if (!schema.controlNodes) {
            this.errors.push('Control schema missing controlNodes');
            return;
        }

        Object.entries(schema.controlNodes).forEach(([nodeId, nodeDef]) => {
            if (!nodeDef.title) {
                this.warnings.push(`Control node ${nodeId} missing title`);
            }
            if (!nodeDef.outputs || !nodeDef.outputs.includes('controlOut')) {
                this.warnings.push(`Control node ${nodeId} should have controlOut output`);
            }

            // Validate properties
            if (nodeDef.properties) {
                Object.entries(nodeDef.properties).forEach(([propName, propDef]) => {
                    if (!propDef.type) {
                        this.errors.push(`Control property ${propName} in node ${nodeId} missing type`);
                    }
                    if (propDef.type === 'number' && (propDef.min === undefined || propDef.max === undefined)) {
                        this.warnings.push(`Control property ${propName} in node ${nodeId} should have min/max`);
                    }
                });
            }
        });
    }

    validateMiniNotationSchema() {
        const schema = this.schemas.miniNotationSchema;
        if (!schema) {
            this.errors.push('Mini notation schema is missing');
            return;
        }

        if (!schema.operators) {
            this.errors.push('Mini notation schema missing operators');
            return;
        }

        schema.operators.forEach((op, index) => {
            if (!op.symbol) {
                this.errors.push(`Operator ${index} missing symbol`);
            }
            if (!op.description) {
                this.warnings.push(`Operator ${index} missing description`);
            }
            if (!op.precedence) {
                this.warnings.push(`Operator ${index} missing precedence`);
            }
        });

        if (!schema.examples) {
            this.warnings.push('Mini notation schema missing examples');
        }
    }

    validateCombinatorSchema() {
        const schema = this.schemas.combinatorSchema;
        if (!schema) {
            this.errors.push('Combinator schema is missing');
            return;
        }

        if (!schema.combinators) {
            this.errors.push('Combinator schema missing combinators');
            return;
        }

        Object.entries(schema.combinators).forEach(([combinatorId, combinatorDef]) => {
            if (!combinatorDef.title) {
                this.warnings.push(`Combinator ${combinatorId} missing title`);
            }
            if (!combinatorDef.description) {
                this.warnings.push(`Combinator ${combinatorId} missing description`);
            }

            // Validate properties
            if (combinatorDef.properties) {
                Object.entries(combinatorDef.properties).forEach(([propName, propDef]) => {
                    if (!propDef.type) {
                        this.errors.push(`Combinator property ${propName} in ${combinatorId} missing type`);
                    }
                });
            }
        });
    }

    validateFunctionSchema() {
        const schema = this.schemas.functionSchema;
        if (!schema) {
            this.errors.push('Function schema is missing');
            return;
        }

        if (!schema.constructors) {
            this.errors.push('Function schema missing constructors');
            return;
        }

        Object.entries(schema.constructors).forEach(([funcId, funcDef]) => {
            if (!funcDef.title) {
                this.warnings.push(`Function ${funcId} missing title`);
            }
            if (!funcDef.description) {
                this.warnings.push(`Function ${funcId} missing description`);
            }

            // Validate properties
            if (funcDef.properties) {
                Object.entries(funcDef.properties).forEach(([propName, propDef]) => {
                    if (!propDef.type) {
                        this.errors.push(`Function property ${propName} in ${funcId} missing type`);
                    }
                });
            }
        });
    }

    validateIndexSchema() {
        const schema = this.schemas.indexSchema;
        if (!schema) {
            this.errors.push('Index schema is missing');
            return;
        }

        if (!schema.version) {
            this.warnings.push('Index schema missing version');
        }
        if (!schema.lastUpdated) {
            this.warnings.push('Index schema missing lastUpdated');
        }
        if (!schema.files) {
            this.errors.push('Index schema missing files');
        }
    }

    validateCrossReferences() {
        // Check that nodes in property schema exist in node schema
        if (this.schemas.propertySchema?.nodes && this.schemas.nodeSchema?.nodes) {
            Object.keys(this.schemas.propertySchema.nodes).forEach(nodeId => {
                if (!this.schemas.nodeSchema.nodes[nodeId]) {
                    this.warnings.push(`Property schema references node ${nodeId} that doesn't exist in node schema`);
                }
            });
        }

        // Check that control nodes exist in node schema
        if (this.schemas.controlSchema?.controlNodes && this.schemas.nodeSchema?.nodes) {
            Object.keys(this.schemas.controlSchema.controlNodes).forEach(nodeId => {
                if (!this.schemas.nodeSchema.nodes[nodeId]) {
                    this.warnings.push(`Control schema references node ${nodeId} that doesn't exist in node schema`);
                }
            });
        }
    }

    validateChildNodeArchitecture() {
        const schema = this.schemas.nodeSchema;
        if (!schema) return;

        // Check for proper child node support
        const containerNodes = Object.entries(schema.nodes).filter(([_, def]) => 
            def.children === true || def.multiInput === true || def.multiOutput === true
        );

        if (containerNodes.length === 0) {
            this.warnings.push('No container nodes found - child node architecture may be incomplete');
        }

        // Validate child execution modes
        containerNodes.forEach(([nodeId, nodeDef]) => {
            if (nodeDef.childExecutionMode) {
                const validModes = ['parallel', 'sequential', 'stack'];
                if (!validModes.includes(nodeDef.childExecutionMode)) {
                    this.errors.push(`Node ${nodeId} has invalid childExecutionMode: ${nodeDef.childExecutionMode}`);
                }
            }
        });
    }

    async validateAll() {
        console.log('🔍 Starting schema validation...');

        const loaded = await this.loadSchemas();
        if (!loaded) {
            return { success: false, errors: this.errors, warnings: this.warnings };
        }

        console.log('✅ Schemas loaded successfully');

        // Run all validations
        this.validateNodeSchema();
        this.validatePropertySchema();
        this.validateInstrumentSchema();
        this.validateControlSchema();
        this.validateMiniNotationSchema();
        this.validateCombinatorSchema();
        this.validateFunctionSchema();
        this.validateIndexSchema();
        this.validateCrossReferences();
        this.validateChildNodeArchitecture();

        const success = this.errors.length === 0;
        
        console.log('\n📊 Validation Results:');
        console.log(`✅ Errors: ${this.errors.length}`);
        console.log(`⚠️  Warnings: ${this.warnings.length}`);

        if (this.errors.length > 0) {
            console.log('\n❌ Errors:');
            this.errors.forEach(error => console.log(`  - ${error}`));
        }

        if (this.warnings.length > 0) {
            console.log('\n⚠️  Warnings:');
            this.warnings.forEach(warning => console.log(`  - ${warning}`));
        }

        if (success) {
            console.log('\n🎉 All schema files are valid and consistent!');
        }

        return { success, errors: this.errors, warnings: this.warnings };
    }

    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalErrors: this.errors.length,
                totalWarnings: this.warnings.length,
                validationPassed: this.errors.length === 0
            },
            errors: this.errors,
            warnings: this.warnings,
            schemaStatus: {
                nodeSchema: !!this.schemas.nodeSchema,
                propertySchema: !!this.schemas.propertySchema,
                instrumentSchema: !!this.schemas.instrumentSchema,
                controlSchema: !!this.schemas.controlSchema,
                miniNotationSchema: !!this.schemas.miniNotationSchema,
                combinatorSchema: !!this.schemas.combinatorSchema,
                functionSchema: !!this.schemas.functionSchema,
                indexSchema: !!this.schemas.indexSchema
            }
        };

        return report;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SchemaValidator;
}

// Run validation if this script is executed directly
if (typeof window !== 'undefined') {
    // Browser environment
    window.SchemaValidator = SchemaValidator;
    
    // Auto-run validation when DOM is ready
    document.addEventListener('DOMContentLoaded', async () => {
        const validator = new SchemaValidator();
        const result = await validator.validateAll();
        
        // Display results in console
        console.log('\n📋 Schema Validation Report:');
        console.log(JSON.stringify(validator.generateReport(), null, 2));
    });
} else if (typeof require !== 'undefined') {
    // Node.js environment
    async function runValidation() {
        const validator = new SchemaValidator();
        const result = await validator.validateAll();
        
        console.log('\n📋 Schema Validation Report:');
        console.log(JSON.stringify(validator.generateReport(), null, 2));
        
        process.exit(result.success ? 0 : 1);
    }
    
    runValidation().catch(console.error);
}