# 🚀 Guia Rápido: Migração Otimizada Emergent → Next.js

## ⚡ Início Rápido (5 minutos)

### 1. Preparação

```bash
# Certifique-se de ter o clone da Emergent
ls emergent-clone/  # Deve existir

# Copie o arquivo de configuração
cp migrate.config.example.json migrate.config.json
```

### 2. Configuração Básica

Edite `migrate.config.json`:

```json
{
  "options": {
    "dryRun": true,     // ✅ Comece com true para testar
    "verbose": false,    // Mude para true se houver erros
    "skipExisting": true // Não sobrescrever arquivos existentes
  }
}
```

### 3. Executar

```bash
# Teste primeiro (dry-run)
tsx migrate-emergent-optimized.ts --config=migrate.config.json

# Se OK, execute de verdade
# Mude dryRun: false no config
tsx migrate-emergent-optimized.ts --config=migrate.config.json
```

---

## 📊 Cenários Comuns

### Cenário 1: Primeira Migração (Recomendado)

```json
{
  "features": {
    "convertToTsx": true,
    "applyPrettier": true,
    "applyESLint": false,
    "createBackup": true,
    "parallelProcessing": true
  },
  "options": {
    "maxParallelOps": 5,
    "skipExisting": true,
    "dryRun": true,  // ⚠️ Sempre teste primeiro!
    "verbose": false
  }
}
```

### Cenário 2: Atualização de Clone Existente

```json
{
  "options": {
    "skipExisting": false,  // ⚠️ Vai sobrescrever!
    "createBackup": true    // ✅ Cria backup antes
  }
}
```

### Cenário 3: Debugging (Quando algo der errado)

```json
{
  "features": {
    "parallelProcessing": false  // Facilita debug
  },
  "options": {
    "verbose": true,  // Logs detalhados
    "dryRun": true
  }
}
```

### Cenário 4: Performance Máxima

```json
{
  "features": {
    "parallelProcessing": true
  },
  "options": {
    "maxParallelOps": 10,  // Ajuste conforme sua CPU
    "skipExisting": true
  }
}
```

---

## 🎯 Checklist Passo a Passo

### ✅ Antes de Executar

- [ ] **Clone da Emergent** em `emergent-clone/` na raiz
- [ ] **Backup manual** do projeto (opcional mas recomendado)
- [ ] **Configuração** revisada em `migrate.config.json`
- [ ] **Dry-run ativado** (`dryRun: true`)

### ✅ Durante a Execução

- [ ] Observar logs coloridos no terminal
- [ ] Verificar contadores de progresso
- [ ] Anotar warnings para revisão posterior

### ✅ Após a Execução

- [ ] Revisar `migration.log.json`
- [ ] Verificar resumo no terminal
- [ ] Executar `npm run diagnose`
- [ ] Testar com `npm run dev`
- [ ] Revisar manualmente:
  - [ ] `src/globals.css` (estilos mesclados)
  - [ ] Imports dos componentes migrados
  - [ ] Tipos TypeScript se houver warnings

---

## 🔧 Configurações Importantes

### 🎛️ Features (Recursos)

| Feature | O que faz | Recomendação |
|---------|-----------|--------------|
| `convertToTsx` | Converte .js/.jsx → .tsx | ✅ Sempre true |
| `applyPrettier` | Formata código | ✅ true |
| `applyESLint` | Lint automático | ⚠️ false (pode gerar warnings) |
| `createBackup` | Backup antes de sobrescrever | ✅ true |
| `parallelProcessing` | Processa múltiplos arquivos | ✅ true |

### ⚙️ Options (Opções)

| Opção | O que faz | Valor Padrão |
|-------|-----------|--------------|
| `maxParallelOps` | Arquivos simultâneos | 5 |
| `skipExisting` | Pular arquivos existentes | true |
| `dryRun` | Teste sem aplicar | false |
| `verbose` | Logs detalhados | false |

---

## 🚨 Troubleshooting

### Problema: "Pasta emergent-clone não encontrada"

**Solução:**
```bash
# Verifique se está na raiz do projeto
pwd

# Clone deve estar em:
# /projeto/emergent-clone/
ls -la emergent-clone/
```

### Problema: "Muitos erros de conversão"

**Solução:**
```json
{
  "features": {
    "convertToTsx": false  // Desabilite temporariamente
  },
  "options": {
    "verbose": true  // Ative logs detalhados
  }
}
```

### Problema: "Prettier falhando"

**Solução:**
```bash
# Instale/atualize Prettier
npm install --save-dev prettier

# Ou desabilite no config
{
  "features": {
    "applyPrettier": false
  }
}
```

### Problema: "Script muito lento"

**Solução:**
```json
{
  "features": {
    "applyPrettier": false,  // Prettier pode ser lento
    "parallelProcessing": true
  },
  "options": {
    "maxParallelOps": 10  // Aumente se tiver CPU potente
  }
}
```

### Problema: "Erros de TypeScript após migração"

**Solução:**
```bash
# Execute diagnóstico
npm run typecheck

# Revise arquivos com erros
# Geralmente são imports faltantes ou tipos incorretos
```

---

## 📈 O Que Esperar

### Logs no Terminal

```
================================================================================
VALIDANDO PRÉ-REQUISITOS
================================================================================

✓ Pré-requisitos validados

================================================================================
MIGRANDO COMPONENTES
================================================================================

✓ Convertido: Header.jsx → Header.tsx
✓ Convertido: Footer.jsx → Footer.tsx
✓ Convertido: Hero.jsx → Hero.tsx
✓ Componentes migrados: 15/15

================================================================================
MIGRANDO MOCKS
================================================================================

✓ Mock convertido: mock.js → mock.ts
✓ Mocks migrados: 3/3

================================================================================
MIGRANDO ESTILOS
================================================================================

✓ Estilos mesclados com globals.css
⚠ Revise manualmente globals.css para verificar conflitos

================================================================================
RESUMO DA MIGRAÇÃO
================================================================================

ℹ Tempo total: 3.45s
ℹ Arquivos processados: 18
✓ Arquivos migrados: 18
ℹ Arquivos pulados: 0
```

### Arquivo migration.log.json

```json
[
  {
    "level": "SUCCESS",
    "message": "✓ Convertido: Header.jsx → Header.tsx",
    "timestamp": "2025-01-05T18:30:15.123Z"
  },
  {
    "level": "WARNING",
    "message": "⚠ Revise manualmente globals.css",
    "timestamp": "2025-01-05T18:30:16.456Z"
  }
]
```

---

## 💡 Dicas Pro

### 1. Use Dry-Run Sempre Primeiro
```bash
# Sempre teste antes de aplicar
# Revise os logs
# Só então execute de verdade
```

### 2. Configure Paralelismo Conforme CPU
```bash
# 4 cores = maxParallelOps: 3-4
# 8 cores = maxParallelOps: 6-8
# 16 cores = maxParallelOps: 12-16
```

### 3. Backup Manual é Sempre Bom
```bash
# Antes de executar
cp -r src/ src.backup/
```

### 4. Revise Sempre o globals.css
```bash
# Após migração
diff src/globals.css src/globals.css.backup
```

### 5. Execute Diagnóstico Completo
```bash
# Sempre após migração
npm run diagnose

# Isso executa:
# - lint
# - typecheck
# - format:check
# - test
# - build
```

---

## 🎓 Próximos Passos

Após migração bem-sucedida:

1. **Teste o projeto**: `npm run dev`
2. **Revise componentes**: Verifique se todos renderizam
3. **Execute testes**: `npm run test`
4. **Build de produção**: `npm run build`
5. **Deploy**: Quando tudo estiver OK

---

## 📞 Suporte

Se encontrar problemas:

1. Ative `verbose: true` no config
2. Revise `migration.log.json`
3. Execute `npm run diagnose`
4. Verifique a documentação completa em `MIGRATION_IMPROVEMENTS.md`

---

**Boa migração! 🚀**
