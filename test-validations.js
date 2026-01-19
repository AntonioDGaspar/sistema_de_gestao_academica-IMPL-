#!/usr/bin/env node

/**
 * Script de Teste para Validações de Classes
 * Testa se o sistema aceita apenas classes 10, 11, 12 e 13
 */

import http from 'http';

const API_URL = 'http://localhost:4000';

// Cores para output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// Função auxiliar para fazer requisições HTTP
function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, API_URL);
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(url, options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const response = {
                        status: res.statusCode,
                        data: body ? JSON.parse(body) : null
                    };
                    resolve(response);
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

// Testes
async function runTests() {
    log('\n========================================', 'blue');
    log('  TESTES DE VALIDAÇÃO DE CLASSES', 'blue');
    log('========================================\n', 'blue');

    let passed = 0;
    let failed = 0;

    // Teste 1: Criar turma com classe válida (10)
    log('Teste 1: Criar turma com classe 10 (válida)', 'yellow');
    try {
        const response = await makeRequest('POST', '/api/turmas', {
            nome: 'Teste 10ª A',
            ano_lectivo: '2025/2026',
            classe: '10',
            curso: 'Técnico de Informática'
        });

        if (response.status === 201 || response.status === 200) {
            log('✓ PASSOU - Turma classe 10 aceita', 'green');
            passed++;
        } else {
            log(`✗ FALHOU - Status: ${response.status}`, 'red');
            log(`  Resposta: ${JSON.stringify(response.data)}`, 'red');
            failed++;
        }
    } catch (error) {
        log(`✗ ERRO - ${error.message}`, 'red');
        failed++;
    }

    // Teste 2: Criar turma com classe válida (13)
    log('\nTeste 2: Criar turma com classe 13 (válida)', 'yellow');
    try {
        const response = await makeRequest('POST', '/api/turmas', {
            nome: 'Teste 13ª A',
            ano_lectivo: '2025/2026',
            classe: '13',
            curso: 'Técnico de Informática'
        });

        if (response.status === 201 || response.status === 200) {
            log('✓ PASSOU - Turma classe 13 aceita', 'green');
            passed++;
        } else {
            log(`✗ FALHOU - Status: ${response.status}`, 'red');
            log(`  Resposta: ${JSON.stringify(response.data)}`, 'red');
            failed++;
        }
    } catch (error) {
        log(`✗ ERRO - ${error.message}`, 'red');
        failed++;
    }

    // Teste 3: Criar turma com classe inválida (9)
    log('\nTeste 3: Criar turma com classe 9 (inválida)', 'yellow');
    try {
        const response = await makeRequest('POST', '/api/turmas', {
            nome: 'Teste 9ª A',
            ano_lectivo: '2025/2026',
            classe: '9',
            curso: 'Técnico de Informática'
        });

        if (response.status === 400 && response.data.error?.includes('Classe inválida')) {
            log('✓ PASSOU - Classe 9 rejeitada corretamente', 'green');
            passed++;
        } else {
            log(`✗ FALHOU - Status: ${response.status} (esperado: 400)`, 'red');
            log(`  Resposta: ${JSON.stringify(response.data)}`, 'red');
            failed++;
        }
    } catch (error) {
        log(`✗ ERRO - ${error.message}`, 'red');
        failed++;
    }

    // Teste 4: Criar turma com classe inválida (14)
    log('\nTeste 4: Criar turma com classe 14 (inválida)', 'yellow');
    try {
        const response = await makeRequest('POST', '/api/turmas', {
            nome: 'Teste 14ª A',
            ano_lectivo: '2025/2026',
            classe: '14',
            curso: 'Técnico de Informática'
        });

        if (response.status === 400 && response.data.error?.includes('Classe inválida')) {
            log('✓ PASSOU - Classe 14 rejeitada corretamente', 'green');
            passed++;
        } else {
            log(`✗ FALHOU - Status: ${response.status} (esperado: 400)`, 'red');
            log(`  Resposta: ${JSON.stringify(response.data)}`, 'red');
            failed++;
        }
    } catch (error) {
        log(`✗ ERRO - ${error.message}`, 'red');
        failed++;
    }

    // Teste 5: Consultar turmas por classe válida
    log('\nTeste 5: Consultar turmas da classe 10', 'yellow');
    try {
        const response = await makeRequest('GET', '/api/turmas/classe/10');

        if (response.status === 200) {
            log('✓ PASSOU - Consulta classe 10 aceita', 'green');
            passed++;
        } else {
            log(`✗ FALHOU - Status: ${response.status}`, 'red');
            failed++;
        }
    } catch (error) {
        log(`✗ ERRO - ${error.message}`, 'red');
        failed++;
    }

    // Teste 6: Consultar turmas por classe inválida
    log('\nTeste 6: Consultar turmas da classe 8 (inválida)', 'yellow');
    try {
        const response = await makeRequest('GET', '/api/turmas/classe/8');

        if (response.status === 400 && response.data.error?.includes('Classe inválida')) {
            log('✓ PASSOU - Consulta classe 8 rejeitada corretamente', 'green');
            passed++;
        } else {
            log(`✗ FALHOU - Status: ${response.status} (esperado: 400)`, 'red');
            log(`  Resposta: ${JSON.stringify(response.data)}`, 'red');
            failed++;
        }
    } catch (error) {
        log(`✗ ERRO - ${error.message}`, 'red');
        failed++;
    }

    // Resumo
    log('\n========================================', 'blue');
    log('  RESUMO DOS TESTES', 'blue');
    log('========================================', 'blue');
    log(`Total de testes: ${passed + failed}`, 'blue');
    log(`Passaram: ${passed}`, 'green');
    log(`Falharam: ${failed}`, failed > 0 ? 'red' : 'green');
    log('========================================\n', 'blue');

    process.exit(failed > 0 ? 1 : 0);
}

// Verificar se o servidor está rodando
log('\nVerificando se o servidor está rodando...', 'yellow');
makeRequest('GET', '/api/turmas')
    .then(() => {
        log('✓ Servidor está rodando!\n', 'green');
        runTests();
    })
    .catch((error) => {
        log('✗ Servidor não está rodando!', 'red');
        log(`Erro: ${error.message}`, 'red');
        log('\nPor favor, inicie o servidor primeiro com: npm start\n', 'yellow');
        process.exit(1);
    });
