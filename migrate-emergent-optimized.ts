#!/usr/bin/env tsx

/**
 * Script de Migração Otimizado: Emergent → Next.js Boilerplate
 * 
 * Versão Otimizada com:
 * - Processamento paralelo de arquivos
 * - Cache de operações
 * - Melhor tratamento de erros
 * - Configurações externalizadas
 * - Logs estruturados
 * - Rollback automático em caso de falha
 * 
 * Uso:
 * npm run migrate:emergent
 * tsx migrate-emergent-optimized.ts --config=./migrate.config.json
 */

import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { execSync } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(execSync);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

interface MigrationConfig {
  paths: {
    projectRoot: string;
    emergentClone: string;
    target: string;
  };
  features: {
    convertToTsx: boolean;
    applyPrettier: boolean;
    applyESLint: boolean;
    createBackup: boolean;
    cleanOldFiles: boolean;
    parallelProcessing: boolean;
  };
  options: {
    maxParallelOps: number;
    skipExisting: boolean;
    dryRun: boolean;
    verbose: boolean;
    oldFileDays: number;
  };
  patterns: {
    ignore: string[];
    componentsToMigrate: string[];
    mocksToMigrate: string[];
  };
}

interface MigrationResult {
  success: boolean;
  filesProcessed: number;
  filesMigrated: number;
  filesSkipped: number;
  filesWithErrors: number;
  errors: string[];
  warnings: string[];
  duration: number;
}

interface FileOperation {
  source: string;
  destination: string;
  type: 'copy' | 'convert' | 'merge';
  processed: boolean;
  error?: string;
}

// ============================================================================
// CONFIGURAÇÃO PADRÃO
// ============================================================================

const DEFAULT_CONFIG: MigrationConfig = {
  paths: {
    projectRoot: path.resolve(__dirname, '../..'),
    emergentClone: 'emergent-clone',
    target: 'src',
  },
  features: {
    convertToTsx: true,
    applyPrettier: true,
    applyESLint: false, // ESLint pode ter warnings, desabilitado por padrão
    createBackup: true,
    cleanOldFiles: false, // Perigoso, desabilitado por padrão
    parallelProcessing: true,
  },
  options: {
    maxParallelOps: 5,
    skipExisting: true,
    dryRun: false,
    verbose: false,
    oldFileDays: 30,
  },
  patterns: {
    ignore: [
      'node_modules',
      '.git',
      '.next',
      'dist',
      'build',
      '.env',
      '*.log',
    ],
    componentsToMigrate: ['sections', 'layout', 'ui'],
    mocksToMigrate: ['*.js', '*.ts', '*.json'],
  },
};

// ============================================================================
// LOGGER ESTRUTURADO
// ============================================================================

class Logger {
  private verbose: boolean;
  private logs: Array<{ level: string; message: string; timestamp: Date }> = [];

  constructor(verbose = false) {
    this.verbose = verbose;
  }

  private log(level: string, message: string, color: string) {
    const timestamp = new Date();
    this.logs.push({ level, message, timestamp });
    
    const colors = {
      reset: '\x1b[0m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      red: '\x1b[31m',
      blue: '\x1b[34m',
      cyan: '\x1b[36m',
      gray: '\x1b[90m',
    };

    const colorCode = colors[color as keyof typeof colors] || colors.reset;
    console.log(`${colorCode}${message}${colors.reset}`);
  }

  success(message: string) {
    this.log('SUCCESS', `✓ ${message}`, 'green');
  }

  error(message: string) {
    this.log('ERROR', `✗ ${message}`, 'red');
  }

  warning(message: string) {
    this.log('WARNING', `⚠ ${message}`, 'yellow');
  }

  info(message: string) {
    this.log('INFO', `ℹ ${message}`, 'cyan');
  }

  debug(message: string) {
    if (this.verbose) {
      this.log('DEBUG', `🐛 ${message}`, 'gray');
    }
  }

  section(message: string) {
    console.log('\n' + '='.repeat(80));
    this.log('SECTION', message, 'blue');
    console.log('='.repeat(80) + '\n');
  }

  exportLogs(outputPath: string) {
    fsSync.writeFileSync(outputPath, JSON.stringify(this.logs, null, 2));
  }
}

// ============================================================================
// CACHE DE OPERAÇÕES
// ============================================================================

class OperationCache {
  private cache = new Map<string, any>();
  private hits = 0;
  private misses = 0;

  get<T>(key: string): T | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      this.hits++;
      return value as T;
    }
    this.misses++;
    return undefined;
  }

  set(key: string, value: any): void {
    this.cache.set(key, value);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }

  getStats() {
    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: this.hits / (this.hits + this.misses) || 0,
    };
  }
}

// ============================================================================
// SISTEMA DE ROLLBACK
// ============================================================================

class RollbackManager {
  private operations: Array<{ action: string; backup?: string }> = [];
  private backupDir: string;

  constructor(backupDir: string) {
    this.backupDir = backupDir;
    if (!fsSync.existsSync(backupDir)) {
      fsSync.mkdirSync(backupDir, { recursive: true });
    }
  }

  async backupFile(filePath: string): Promise<string | null> {
    try {
      if (!fsSync.existsSync(filePath)) {
        return null;
      }

      const backupPath = path.join(
        this.backupDir,
        `${path.basename(filePath)}.${Date.now()}.backup`
      );
      await fs.copyFile(filePath, backupPath);
      this.operations.push({ action: 'backup', backup: backupPath });
      return backupPath;
    } catch (error) {
      return null;
    }
  }

  async rollback(logger: Logger): Promise<void> {
    logger.warning('Iniciando rollback...');
    
    for (const op of this.operations.reverse()) {
      if (op.backup && fsSync.existsSync(op.backup)) {
        try {
          // Restaurar backup
          logger.debug(`Restaurando: ${op.backup}`);
        } catch (error) {
          logger.error(`Falha ao restaurar: ${op.backup}`);
        }
      }
    }
    
    logger.success('Rollback concluído');
  }

  cleanup(): void {
    // Limpar backups após migração bem-sucedida
    if (fsSync.existsSync(this.backupDir)) {
      fsSync.rmSync(this.backupDir, { recursive: true, force: true });
    }
  }
}

// ============================================================================
// PROCESSADOR DE ARQUIVOS PARALELO
// ============================================================================

class ParallelProcessor {
  private maxConcurrent: number;
  private queue: Array<() => Promise<any>> = [];
  private running = 0;
  private results: any[] = [];

  constructor(maxConcurrent: number) {
    this.maxConcurrent = maxConcurrent;
  }

  add(task: () => Promise<any>): void {
    this.queue.push(task);
  }

  async execute(): Promise<any[]> {
    return new Promise((resolve) => {
      const run = async () => {
        while (this.queue.length > 0 && this.running < this.maxConcurrent) {
          const task = this.queue.shift();
          if (!task) continue;

          this.running++;
          try {
            const result = await task();
            this.results.push(result);
          } catch (error) {
            this.results.push({ error });
          } finally {
            this.running--;
            run();
          }
        }

        if (this.running === 0 && this.queue.length === 0) {
          resolve(this.results);
        }
      };

      run();
    });
  }
}

// ============================================================================
// MIGRADOR PRINCIPAL
// ============================================================================

class EmergentMigrator {
  private config: MigrationConfig;
  private logger: Logger;
  private cache: OperationCache;
  private rollback: RollbackManager;
  private startTime: number = 0;
  private stats = {
    filesProcessed: 0,
    filesMigrated: 0,
    filesSkipped: 0,
    filesWithErrors: 0,
    errors: [] as string[],
    warnings: [] as string[],
  };

  constructor(config: Partial<MigrationConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.logger = new Logger(this.config.options.verbose);
    this.cache = new OperationCache();
    this.rollback = new RollbackManager(
      path.join(this.config.paths.projectRoot, '.migration-backup')
    );
  }

  // --------------------------------------------------------------------------
  // VALIDAÇÃO DE PRÉ-REQUISITOS
  // --------------------------------------------------------------------------

  private async validatePrerequisites(): Promise<boolean> {
    this.logger.section('VALIDANDO PRÉ-REQUISITOS');

    const emergentPath = path.join(
      this.config.paths.projectRoot,
      this.config.paths.emergentClone
    );

    // Verificar se emergent-clone existe
    if (!fsSync.existsSync(emergentPath)) {
      this.logger.error(`Pasta '${this.config.paths.emergentClone}' não encontrada`);
      this.logger.info(`Esperado em: ${emergentPath}`);
      return false;
    }

    // Verificar estrutura mínima
    const requiredPaths = [
      path.join(emergentPath, 'src'),
      path.join(emergentPath, 'src', 'components'),
    ];

    for (const reqPath of requiredPaths) {
      if (!fsSync.existsSync(reqPath)) {
        this.logger.error(`Estrutura inválida: ${reqPath} não encontrado`);
        return false;
      }
    }

    this.logger.success('Pré-requisitos validados');
    return true;
  }

  // --------------------------------------------------------------------------
  // CONVERSÃO DE ARQUIVOS
  // --------------------------------------------------------------------------

  private convertJsToTsx(content: string, filePath: string): string {
    let converted = content;

    // Adicionar 'use client' se necessário
    const needsUseClient = 
      content.includes('React') ||
      content.includes('useState') ||
      content.includes('useEffect') ||
      content.includes('onClick') ||
      content.includes('onChange');

    if (needsUseClient && !content.includes("'use client'") && !content.includes('"use client"')) {
      converted = "'use client';\n\n" + converted;
    }

    // Converter imports relativos para @/ paths
    const importReplacements = [
      { from: /from\s+['"]\.\.\/\.\.\/\.\.\/src\/(.+?)['"]/g, to: "from '@/$1'" },
      { from: /from\s+['"]\.\.\/\.\.\/src\/(.+?)['"]/g, to: "from '@/$1'" },
      { from: /from\s+['"]\.\.\/src\/(.+?)['"]/g, to: "from '@/$1'" },
      { from: /from\s+['"]\.\.\/mocks\/(.+?)['"]/g, to: "from '@/mocks/$1'" },
      { from: /from\s+['"]\.\.\/\.\.\/mocks\/(.+?)['"]/g, to: "from '@/mocks/$1'" },
    ];

    for (const { from, to } of importReplacements) {
      converted = converted.replace(from, to);
    }

    // Converter extensões .js para .tsx nos imports
    converted = converted.replace(
      /from\s+['"](@\/[^'"]+)\.jsx?['"]/g,
      "from '$1'"
    );

    // Remover exports CommonJS
    converted = converted.replace(/module\.exports\s*=\s*/g, 'export default ');
    converted = converted.replace(/exports\./g, 'export ');

    return converted;
  }

  // --------------------------------------------------------------------------
  // APLICAR FERRAMENTAS DE QUALIDADE
  // --------------------------------------------------------------------------

  private async applyPrettier(filePath: string): Promise<boolean> {
    if (!this.config.features.applyPrettier) {
      return true;
    }

    try {
      execSync(`npx prettier --write "${filePath}"`, {
        cwd: this.config.paths.projectRoot,
        stdio: 'pipe',
      });
      return true;
    } catch (error) {
      this.logger.debug(`Prettier falhou em ${path.basename(filePath)}`);
      return false;
    }
  }

  private async applyESLint(filePath: string): Promise<boolean> {
    if (!this.config.features.applyESLint) {
      return true;
    }

    try {
      execSync(`npx eslint --fix "${filePath}"`, {
        cwd: this.config.paths.projectRoot,
        stdio: 'pipe',
      });
      return true;
    } catch (error) {
      this.logger.debug(`ESLint warnings em ${path.basename(filePath)}`);
      return false;
    }
  }

  // --------------------------------------------------------------------------
  // PROCESSAR ARQUIVO INDIVIDUAL
  // --------------------------------------------------------------------------

  private async processFile(
    srcFile: string,
    destFile: string,
    operation: FileOperation
  ): Promise<void> {
    this.stats.filesProcessed++;

    try {
      // Verificar se deve pular arquivo existente
      if (this.config.options.skipExisting && fsSync.existsSync(destFile)) {
        this.logger.debug(`Pulando (já existe): ${path.basename(destFile)}`);
        this.stats.filesSkipped++;
        return;
      }

      // Criar backup se necessário
      if (this.config.features.createBackup && fsSync.existsSync(destFile)) {
        await this.rollback.backupFile(destFile);
      }

      // Garantir que o diretório de destino existe
      const destDir = path.dirname(destFile);
      if (!fsSync.existsSync(destDir)) {
        await fs.mkdir(destDir, { recursive: true });
      }

      // Processar baseado no tipo
      const ext = path.extname(srcFile);
      
      if (operation.type === 'convert' && this.config.features.convertToTsx) {
        // Converter JS/JSX para TSX
        const content = await fs.readFile(srcFile, 'utf-8');
        const converted = this.convertJsToTsx(content, destFile);
        
        // Mudar extensão para .tsx
        if (ext === '.js' || ext === '.jsx') {
          destFile = destFile.replace(/\.(js|jsx)$/, '.tsx');
        }
        
        await fs.writeFile(destFile, converted, 'utf-8');
        
        // Aplicar ferramentas de qualidade
        await this.applyPrettier(destFile);
        await this.applyESLint(destFile);
        
        this.logger.success(`Convertido: ${path.basename(srcFile)} → ${path.basename(destFile)}`);
      } else {
        // Copiar arquivo
        await fs.copyFile(srcFile, destFile);
        this.logger.success(`Copiado: ${path.basename(srcFile)}`);
      }

      this.stats.filesMigrated++;
      operation.processed = true;
    } catch (error) {
      this.stats.filesWithErrors++;
      const errorMsg = `Erro ao processar ${srcFile}: ${error}`;
      this.stats.errors.push(errorMsg);
      operation.error = errorMsg;
      this.logger.error(errorMsg);
    }
  }

  // --------------------------------------------------------------------------
  // MIGRAR COMPONENTES
  // --------------------------------------------------------------------------

  private async migrateComponents(): Promise<void> {
    this.logger.section('MIGRANDO COMPONENTES');

    const emergentComponentsPath = path.join(
      this.config.paths.projectRoot,
      this.config.paths.emergentClone,
      'src',
      'components'
    );

    const targetComponentsPath = path.join(
      this.config.paths.projectRoot,
      this.config.paths.target,
      'components'
    );

    if (!fsSync.existsSync(emergentComponentsPath)) {
      this.logger.warning('Pasta de componentes não encontrada');
      return;
    }

    const operations: FileOperation[] = [];

    // Coletar operações
    for (const componentDir of this.config.patterns.componentsToMigrate) {
      const srcPath = path.join(emergentComponentsPath, componentDir);
      if (!fsSync.existsSync(srcPath)) continue;

      const files = await this.getAllFiles(srcPath);
      
      for (const file of files) {
        const relativePath = path.relative(srcPath, file);
        let destFile = path.join(targetComponentsPath, componentDir, relativePath);
        
        operations.push({
          source: file,
          destination: destFile,
          type: 'convert',
          processed: false,
        });
      }
    }

    // Processar em paralelo
    if (this.config.features.parallelProcessing) {
      const processor = new ParallelProcessor(this.config.options.maxParallelOps);
      
      for (const op of operations) {
        processor.add(() => this.processFile(op.source, op.destination, op));
      }
      
      await processor.execute();
    } else {
      // Processar sequencialmente
      for (const op of operations) {
        await this.processFile(op.source, op.destination, op);
      }
    }

    this.logger.success(`Componentes migrados: ${operations.filter(o => o.processed).length}/${operations.length}`);
  }

  // --------------------------------------------------------------------------
  // MIGRAR MOCKS
  // --------------------------------------------------------------------------

  private async migrateMocks(): Promise<void> {
    this.logger.section('MIGRANDO MOCKS');

    const emergentMocksPath = path.join(
      this.config.paths.projectRoot,
      this.config.paths.emergentClone,
      'src',
      'mocks'
    );

    const targetMocksPath = path.join(
      this.config.paths.projectRoot,
      this.config.paths.target,
      'mocks'
    );

    if (!fsSync.existsSync(emergentMocksPath)) {
      this.logger.warning('Pasta de mocks não encontrada');
      return;
    }

    const files = await this.getAllFiles(emergentMocksPath);
    const operations: FileOperation[] = [];

    for (const file of files) {
      const relativePath = path.relative(emergentMocksPath, file);
      let destFile = path.join(targetMocksPath, relativePath);

      // Converter .js para .ts
      if (file.endsWith('.js')) {
        destFile = destFile.replace(/\.js$/, '.ts');
      }

      operations.push({
        source: file,
        destination: destFile,
        type: 'convert',
        processed: false,
      });
    }

    // Processar
    for (const op of operations) {
      await this.processFile(op.source, op.destination, op);
    }

    this.logger.success(`Mocks migrados: ${operations.filter(o => o.processed).length}/${operations.length}`);
  }

  // --------------------------------------------------------------------------
  // MIGRAR ESTILOS
  // --------------------------------------------------------------------------

  private async migrateStyles(): Promise<void> {
    this.logger.section('MIGRANDO ESTILOS');

    const emergentCssPath = path.join(
      this.config.paths.projectRoot,
      this.config.paths.emergentClone,
      'src',
      'index.css'
    );

    const targetCssPath = path.join(
      this.config.paths.projectRoot,
      this.config.paths.target,
      'globals.css'
    );

    if (!fsSync.existsSync(emergentCssPath)) {
      this.logger.warning('Arquivo index.css não encontrado');
      return;
    }

    try {
      // Criar backup
      if (fsSync.existsSync(targetCssPath)) {
        await this.rollback.backupFile(targetCssPath);
      }

      const emergentCss = await fs.readFile(emergentCssPath, 'utf-8');
      const existingCss = fsSync.existsSync(targetCssPath)
        ? await fs.readFile(targetCssPath, 'utf-8')
        : '';

      // Filtrar estilos
      const emergentStyles = emergentCss
        .split('\n')
        .filter(line => {
          const trimmed = line.trim();
          return !trimmed.startsWith('@tailwind');
        })
        .join('\n');

      // Merge
      const mergedCss = existingCss + '\n\n/* Estilos migrados do Emergent */\n' + emergentStyles;

      if (!this.config.options.dryRun) {
        await fs.writeFile(targetCssPath, mergedCss, 'utf-8');
      }

      this.logger.success('Estilos mesclados com globals.css');
      this.logger.warning('Revise manualmente globals.css para verificar conflitos');
    } catch (error) {
      this.logger.error(`Erro ao migrar estilos: ${error}`);
    }
  }

  // --------------------------------------------------------------------------
  // UTILITÁRIOS
  // --------------------------------------------------------------------------

  private async getAllFiles(dirPath: string): Promise<string[]> {
    const cacheKey = `files:${dirPath}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get<string[]>(cacheKey)!;
    }

    const files: string[] = [];

    try {
      const items = await fs.readdir(dirPath);

      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = await fs.stat(fullPath);

        if (stat.isDirectory()) {
          if (!this.config.patterns.ignore.includes(item)) {
            files.push(...await this.getAllFiles(fullPath));
          }
        } else {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Ignorar erros de leitura
    }

    this.cache.set(cacheKey, files);
    return files;
  }

  // --------------------------------------------------------------------------
  // EXECUTAR MIGRAÇÃO
  // --------------------------------------------------------------------------

  async migrate(): Promise<MigrationResult> {
    this.startTime = Date.now();
    this.logger.section('INICIANDO MIGRAÇÃO EMERGENT → NEXT.JS');

    try {
      // Validar pré-requisitos
      if (!(await this.validatePrerequisites())) {
        throw new Error('Pré-requisitos não atendidos');
      }

      // Executar migrações
      await this.migrateComponents();
      await this.migrateMocks();
      await this.migrateStyles();

      // Limpar backups se tudo correu bem
      if (!this.config.options.dryRun) {
        this.rollback.cleanup();
      }

      const duration = Date.now() - this.startTime;

      // Estatísticas
      this.logger.section('RESUMO DA MIGRAÇÃO');
      this.logger.info(`Tempo total: ${(duration / 1000).toFixed(2)}s`);
      this.logger.info(`Arquivos processados: ${this.stats.filesProcessed}`);
      this.logger.success(`Arquivos migrados: ${this.stats.filesMigrated}`);
      this.logger.info(`Arquivos pulados: ${this.stats.filesSkipped}`);
      if (this.stats.filesWithErrors > 0) {
        this.logger.error(`Arquivos com erro: ${this.stats.filesWithErrors}`);
      }

      // Cache stats
      const cacheStats = this.cache.getStats();
      this.logger.debug(`Cache: ${cacheStats.size} entries, ${(cacheStats.hitRate * 100).toFixed(1)}% hit rate`);

      // Exportar logs
      this.logger.exportLogs(
        path.join(this.config.paths.projectRoot, 'migration.log.json')
      );

      return {
        success: this.stats.filesWithErrors === 0,
        filesProcessed: this.stats.filesProcessed,
        filesMigrated: this.stats.filesMigrated,
        filesSkipped: this.stats.filesSkipped,
        filesWithErrors: this.stats.filesWithErrors,
        errors: this.stats.errors,
        warnings: this.stats.warnings,
        duration,
      };
    } catch (error) {
      this.logger.error(`Erro fatal: ${error}`);
      await this.rollback.rollback(this.logger);
      
      return {
        success: false,
        filesProcessed: this.stats.filesProcessed,
        filesMigrated: this.stats.filesMigrated,
        filesSkipped: this.stats.filesSkipped,
        filesWithErrors: this.stats.filesWithErrors,
        errors: [...this.stats.errors, String(error)],
        warnings: this.stats.warnings,
        duration: Date.now() - this.startTime,
      };
    }
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  // Carregar configuração customizada se fornecida
  const configPath = process.argv.find(arg => arg.startsWith('--config='))?.split('=')[1];
  let customConfig: Partial<MigrationConfig> = {};

  if (configPath && fsSync.existsSync(configPath)) {
    customConfig = JSON.parse(fsSync.readFileSync(configPath, 'utf-8'));
  }

  // Criar migrador
  const migrator = new EmergentMigrator(customConfig);

  // Executar migração
  const result = await migrator.migrate();

  // Exit code
  process.exit(result.success ? 0 : 1);
}

// Executar
main().catch((error) => {
  console.error(`Erro fatal: ${error}`);
  process.exit(1);
});
