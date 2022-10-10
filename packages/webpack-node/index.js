import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nodeConfig": () => (/* binding */ nodeConfig)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_webpack_configs_base_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _src_webpack_loaders_babel_loader_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _src_webpack_loaders_source_map_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25);
/* harmony import */ var _src_webpack_plugins_dependency_packer_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27);





function nodeConfig(opts) {
  const {
    context = process.cwd(),
    isLib,
    noEntry,
    packageJsonProperties
  } = opts;
  const base = (0,_src_webpack_configs_base_config__WEBPACK_IMPORTED_MODULE_1__.baseConfig)(context);
  return { ...base,
    target: 'node',
    entry: noEntry ? {} : {
      index: (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(context, `src/index.ts`)
    },
    output: {
      path: (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(context, 'dist'),
      filename: `[name].js`,
      clean: true,
      chunkFormat: 'module',
      ...(isLib ? {
        library: {
          type: 'module'
        }
      } : {})
    },
    module: {
      rules: [(0,_src_webpack_loaders_babel_loader_node__WEBPACK_IMPORTED_MODULE_2__.babelLoaderNode)(), (0,_src_webpack_loaders_source_map_loader__WEBPACK_IMPORTED_MODULE_3__.sourceMapLoader)()]
    },
    plugins: [...(base.plugins ?? []), (0,_src_webpack_plugins_dependency_packer_plugin__WEBPACK_IMPORTED_MODULE_4__.dependencyPackerPlugin)(packageJsonProperties)],
    experiments: {
      outputModule: true
    }
  };
}

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:path");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "baseConfig": () => (/* binding */ baseConfig)
/* harmony export */ });
/* harmony import */ var _src_webpack_plugins_clean_terminal_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _src_webpack_plugins_define_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _src_webpack_plugins_eslint_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _src_webpack_plugins_fork_ts_checker_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _src_webpack_plugins_terser_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* harmony import */ var _src_webpack_plugins_ts_config_alias__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);







function baseConfig(contextOpt) {
  const context = contextOpt ?? process.cwd();
  return {
    mode: 'none',
    context,
    entry: {},
    // devtool: isProd() ? 'source-map' : 'eval',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: (0,_src_webpack_plugins_ts_config_alias__WEBPACK_IMPORTED_MODULE_5__.getTsConfigAlias)(context)
    },
    plugins: [(0,_src_webpack_plugins_fork_ts_checker_plugin__WEBPACK_IMPORTED_MODULE_3__.forkTsCheckerPlugin)(context), (0,_src_webpack_plugins_eslint_plugin__WEBPACK_IMPORTED_MODULE_2__.eslintPlugin)(), (0,_src_webpack_plugins_define_plugin__WEBPACK_IMPORTED_MODULE_1__.definePlugin)(), (0,_src_webpack_plugins_clean_terminal_plugin__WEBPACK_IMPORTED_MODULE_0__.cleanTerminalPlugin)()],
    stats: {
      preset: 'errors-warnings',
      assets: true,
      timings: true
    },
    optimization: {
      minimize: (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.isProd)(),
      minimizer: [(0,_src_webpack_plugins_terser_plugin__WEBPACK_IMPORTED_MODULE_4__.terserPlugin)()]
    },
    externals: (ctx, cb) => {
      var _ctx$getResolve;

      const {
        request,
        context
      } = ctx;

      if (request === undefined) {
        return cb();
      }

      if (request.startsWith('node:')) {
        return cb(undefined, `node-commonjs ${request}`);
      }

      const resolver = (_ctx$getResolve = ctx.getResolve) === null || _ctx$getResolve === void 0 ? void 0 : _ctx$getResolve.call(ctx);

      if (!resolver) {
        return cb(new Error('No resolver when checking for externals'));
      }

      resolver(context ?? '', request).then(res => {
        if (!res.includes('/node_modules/')) {
          return cb();
        }

        (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_6__.findPackageJson)(res).then(packageJson => {
          if (packageJson && packageJson['type'] === 'module') {
            return cb(undefined, `module ${request}`);
          }

          cb(undefined, `node-commonjs ${request}`);
        }).catch(() => cb(undefined, `node-commonjs ${request}`));
      }).catch(err => {
        console.log('Resolution failure for webpack externals');

        if (typeof err === 'object' && err && 'details' in err) {
          console.log(String(err));
          console.log(err.details);
        } else {
          console.log(err);
        }
      });
    },
    experiments: {
      backCompat: true
    }
  };
}

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cleanTerminalPlugin": () => (/* binding */ cleanTerminalPlugin)
/* harmony export */ });
class CleanTerminalPlugin {
  firstRun = true;

  apply(compiler) {
    this.firstRun = true;
    compiler.hooks.afterCompile.tap('CleanTerminalPlugin', () => {
      if (this.firstRun) {
        this.firstRun = false;
        return;
      }

      process.stdout.write('\u001B[2J\u001B[3J\u001B[H');
    });
  }

}

function cleanTerminalPlugin() {
  return new CleanTerminalPlugin();
}

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "definePlugin": () => (/* binding */ definePlugin)
/* harmony export */ });
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
 // eslint-disable-line import/no-named-as-default


function definePlugin() {
  const envPrefix = 'MATTHIS_';
  const extraEnv = Object.fromEntries(Object.entries(process.env) // eslint-disable-line node/no-process-env
  .filter(([name]) => name.startsWith(envPrefix)).map(([name, value]) => [`process.env.${name.slice(envPrefix.length)}`, value]));
  return new (webpack__WEBPACK_IMPORTED_MODULE_0___default().DefinePlugin)({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'process.env.NODE_ENV': JSON.stringify((0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_1__.getEnv)()),
    ...extraEnv
  });
}

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("webpack");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findPackageJson": () => (/* binding */ findPackageJson),
/* harmony export */   "getEnv": () => (/* binding */ getEnv),
/* harmony export */   "isProd": () => (/* binding */ isProd),
/* harmony export */   "isSelenium": () => (/* binding */ isSelenium)
/* harmony export */ });
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);


function isProd() {
  return process.env['NODE_ENV'] === 'production'; // eslint-disable-line node/no-process-env
}
function isSelenium() {
  return process.env['IS_SELENIUM'] === '1'; // eslint-disable-line node/no-process-env
}
function getEnv() {
  return isProd() ? 'production' : 'development';
}
const packageJsonCache = new Map();
async function findPackageJson(p) {
  if (packageJsonCache.has(p)) {
    return packageJsonCache.get(p);
  }

  try {
    const pStat = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.stat)(p);

    if (pStat.isDirectory()) {
      const dir = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.readdir)(p);

      if (dir.includes('package.json')) {
        const fileContent = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.readFile)((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(p, 'package.json'));
        const json = JSON.parse(fileContent.toString());
        packageJsonCache.set(p, json);
        return json;
      }

      if (p === '/') {
        return undefined;
      }
    }

    const res = await findPackageJson((0,node_path__WEBPACK_IMPORTED_MODULE_1__.resolve)(`${p}/..`));
    packageJsonCache.set(p, res);
    return res;
  } catch (err) {
    console.log('findPackageJson');
    console.log(err);
    packageJsonCache.set(p, undefined);
    return undefined;
  }
}

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs/promises");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eslintPlugin": () => (/* binding */ eslintPlugin)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var chokidar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var chokidar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chokidar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var eslint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var eslint__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(eslint__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_webpack_plugins_formatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
/* harmony import */ var _src_webpack_plugins_standalone_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);







class EslintWebpackError extends webpack__WEBPACK_IMPORTED_MODULE_3__.WebpackError {
  name = 'EslintWebpackError';

  constructor(eslintRunId, message, filePath, loc) {
    super(message);
    this.eslintRunId = eslintRunId;

    if (filePath !== undefined) {
      this.file = filePath;
    }

    if (loc) {
      this.loc = loc;
    }
  }

}

const RUN_ESLINT_INTERVAL = 500;

class EslintPlugin extends _src_webpack_plugins_standalone_plugin__WEBPACK_IMPORTED_MODULE_5__.StandalonePlugin {
  name = 'EslintPlugin';
  fileStates = new Map();

  async setup(compiler) {
    return new Promise(resolve => {
      this.runEslintInterval = setInterval(() => this.runEslint(), RUN_ESLINT_INTERVAL);
      this.watcher = (0,chokidar__WEBPACK_IMPORTED_MODULE_1__.watch)(['src/**/*.ts', 'src/**/*.tsx'].map(p => (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(this.context, p)));
      this.watcher.on('add', path => {
        this.fileStates.set(path, {
          status: 'queued'
        });
      }).on('change', path => {
        this.fileStates.set(path, {
          status: 'queued'
        });
      }).on('unlink', path => {
        this.fileStates.delete(path);
      }).on('ready', () => {
        this.runEslint();
        resolve();
      });
      compiler.hooks.compilation.tap(this.name, comp => {
        this.compilation = comp;
        this.syncErrorsAndWarnings();
      });
      compiler.hooks.afterCompile.tapAsync(this.name, (compilation, cb) => {
        setTimeout(() => {
          this.awaitIdle().finally(cb);
        }, RUN_ESLINT_INTERVAL);
      });
    });
  }

  runEslint() {
    const filesQueued = [...this.fileStates.entries()].filter(e => e[1].status === 'queued');

    if (filesQueued.length === 0) {
      return;
    }

    const eslintRunId = Math.random();

    for (const [filePath] of filesQueued) {
      this.fileStates.set(filePath, {
        status: 'in-progress',
        eslintRunId
      });
    }

    const handleError = err => {
      for (const [filePath] of filesQueued) {
        const currentState = this.fileStates.get(filePath);

        if (!currentState || currentState.status !== 'in-progress' || currentState.eslintRunId !== eslintRunId) {
          continue;
        }

        this.fileStates.set(filePath, {
          status: 'errored',
          eslintRunId,
          err
        });
      }
    };

    try {
      const tsConfigPath = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(this.context, 'tsconfig.json');
      const eslint = new eslint__WEBPACK_IMPORTED_MODULE_2__.ESLint({
        cwd: this.context,
        overrideConfig: {
          settings: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'import/resolver': {
              typescript: {
                project: tsConfigPath
              }
            }
          },
          parserOptions: {
            project: tsConfigPath
          }
        }
      });
      eslint.lintFiles(filesQueued.map(e => e[0])).then(results => {
        for (const result of results) {
          const currentState = this.fileStates.get(result.filePath);

          if (!currentState || currentState.status !== 'in-progress' || currentState.eslintRunId !== eslintRunId) {
            continue;
          }

          if (result.messages.length > 0) {
            this.fileStates.set(result.filePath, {
              status: 'failed',
              eslintRunId,
              messages: result.messages
            });
          } else {
            this.fileStates.set(result.filePath, {
              status: 'success',
              eslintRunId
            });
          }
        }
      }).catch(handleError).finally(() => {
        this.syncErrorsAndWarnings();
        this.checkIdle();
      });
    } catch (err) {
      handleError(err);
      this.syncErrorsAndWarnings();
      this.checkIdle();
    }
  }

  syncErrorsAndWarnings() {
    if (!this.compilation) {
      return;
    } // Errors


    let eslintError;

    for (const fileState of this.fileStates.values()) {
      if (fileState.status === 'errored') {
        eslintError = new EslintWebpackError(fileState.eslintRunId, `Failure to run ESLint:\n${fileState.err instanceof Error ? fileState.err.stack : String(fileState.err)}`);
      }
    }

    this.compilation.errors = [...this.compilation.errors.filter(w => !('eslintRunId' in w)), ...(eslintError ? [eslintError] : [])]; // Warnings

    this.compilation.warnings = [...this.compilation.warnings.filter(w => !('eslintRunId' in w)), ...[...this.fileStates.entries()].sort((e1, e2) => e1[0].localeCompare(e2[0])).flatMap(([filePath, fileState]) => {
      if (fileState.status !== 'failed') {
        return [];
      }

      return fileState.messages.map(msg => new EslintWebpackError(fileState.eslintRunId, filePath, (0,_src_webpack_plugins_formatter__WEBPACK_IMPORTED_MODULE_4__.stripAnsi)(msg.message), {
        start: {
          line: msg.line,
          column: msg.column
        },
        end: msg.endLine === undefined ? undefined : {
          line: msg.endLine,
          column: msg.endColumn
        }
      }));
    })];
  }

  checkIdle() {
    if (!this.resolveAwaitIdlePromise) {
      return;
    }

    for (const state of this.fileStates.values()) {
      if (state.status === 'queued' || state.status === 'in-progress') {
        return;
      }
    }

    this.resolveAwaitIdlePromise();
  }

  async awaitIdle() {
    return new Promise(resolve => {
      this.resolveAwaitIdlePromise = resolve;
      this.checkIdle();
    });
  }

  async teardown() {
    var _this$watcher;

    clearInterval(this.runEslintInterval);
    await ((_this$watcher = this.watcher) === null || _this$watcher === void 0 ? void 0 : _this$watcher.close());
  }

}

function eslintPlugin() {
  return new EslintPlugin();
}

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("chokidar");

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("eslint");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stripAnsi": () => (/* binding */ stripAnsi)
/* harmony export */ });
const ansiRegex = new RegExp(['[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)', '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|'), 'gu');
const stripAnsi = s => s.replace(ansiRegex, '');

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StandalonePlugin": () => (/* binding */ StandalonePlugin)
/* harmony export */ });
class StandalonePlugin {
  context = process.cwd(); // INITIALIZE

  apply(compiler) {
    this.context = compiler.context;
    compiler.hooks.beforeRun.tapPromise(this.name, async () => this.setupHandler(compiler));
    compiler.hooks.watchRun.tapPromise(this.name, async () => this.setupHandler(compiler));
    compiler.hooks.shutdown.tapPromise(this.name, async () => this.exitHandlerAsync(compiler));
    process.on('beforeExit', () => this.exitHandler(compiler));
    process.on('exit', () => this.exitHandler(compiler));
    process.on('SIGTERM', () => this.exitHandler(compiler));
    process.on('SIGINT', () => this.exitHandler(compiler));
    process.on('uncaughtException', () => this.exitHandler(compiler));
  }

  // SETUP
  hasStarted = false;

  async setupHandler(compiler) {
    if (this.hasStarted) {
      return;
    }

    this.hasStarted = true;
    await this.setup(compiler);
  } // EXIT


  hasExited = false;

  exitHandler(compiler) {
    if (this.hasExited) {
      return;
    }

    this.hasExited = true;
    Promise.resolve(this.teardown(compiler)).catch(err => {
      console.error(`Error during teardown of plugin ${this.name}`);
      console.error(err);
    }) // eslint-disable-next-line node/no-process-exit
    .finally(() => process.exit(0));
  }

  async exitHandlerAsync(compiler) {
    if (this.hasExited) {
      return;
    }

    this.hasExited = true;
    await this.teardown(compiler);
  }

}

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "forkTsCheckerPlugin": () => (/* binding */ forkTsCheckerPlugin)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__);


function forkTsCheckerPlugin(context) {
  return new (fork_ts_checker_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default())({
    typescript: {
      diagnosticOptions: {
        syntactic: true,
        semantic: true,
        declaration: true,
        global: true
      },
      mode: 'readonly',
      configFile: (0,node_path__WEBPACK_IMPORTED_MODULE_0__.join)(context, 'tsconfig.json'),
      configOverwrite: {
        include: ['src']
      }
    },
    formatter: 'basic',
    logger: {
      log: () => {},
      error: () => {}
    }
  });
}

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fork-ts-checker-webpack-plugin");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "terserPlugin": () => (/* binding */ terserPlugin)
/* harmony export */ });
/* harmony import */ var terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0__);

function terserPlugin() {
  return new (terser_webpack_plugin__WEBPACK_IMPORTED_MODULE_0___default())({
    terserOptions: {
      format: {
        comments: false
      }
    },
    extractComments: false
  });
}

/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("terser-webpack-plugin");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTsConfigAlias": () => (/* binding */ getTsConfigAlias)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);



function loadConfig(path) {
  const config = JSON.parse((0,node_fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync)(path).toString());

  if (typeof config.extends !== 'string') {
    return config;
  }

  let extendConfig = {};
  let dir = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.dirname)(path);
  const extendPath = config.extends + (config.extends.endsWith('.json') ? '' : '.json');

  if (extendPath.startsWith('./')) {
    extendConfig = loadConfig((0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dir, extendPath));
  } else {
    while (true) {
      const pathToTry = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dir, 'node_modules', extendPath);

      if ((0,node_fs__WEBPACK_IMPORTED_MODULE_0__.existsSync)(pathToTry)) {
        extendConfig = loadConfig(pathToTry);
        break;
      }

      const newDir = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(dir, '..');

      if (newDir === dir) {
        break;
      }

      dir = newDir;
    }
  }

  delete config.extends;
  return { ...extendConfig,
    ...config,
    compilerOptions: { ...extendConfig.compilerOptions,
      ...config.compilerOptions
    }
  };
}

function getTsConfigAlias(context) {
  const tsconfigPath = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(context, 'tsconfig.json');
  const {
    paths = {}
  } = loadConfig(tsconfigPath)['compilerOptions'] ?? {};
  const alias = {};

  for (const item of Object.keys(paths)) {
    var _paths$item;

    const key = item.replace('/*', '');
    const value = ((_paths$item = paths[item]) === null || _paths$item === void 0 ? void 0 : _paths$item.map(v => (0,node_path__WEBPACK_IMPORTED_MODULE_1__.join)(context, v.replace('/*', '').replace('*', '')))) ?? [];
    alias[key] = value;
  }

  return alias;
}

/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs");

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "babelLoaderNode": () => (/* binding */ babelLoaderNode)
/* harmony export */ });
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_env__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_loader__WEBPACK_IMPORTED_MODULE_3__);
/* eslint-disable import/no-unassigned-import */





/* eslint-enable import/no-unassigned-import */
function babelLoaderNode() {
  return {
    test: /\.tsx?$/u,
    exclude: /\/node_modules\//u,
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env', {
        targets: {
          node: 16
        }
      }], ['@babel/preset-typescript']]
    }
  };
}

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("@babel/core");

/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("@babel/preset-env");

/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("@babel/preset-typescript");

/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("babel-loader");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sourceMapLoader": () => (/* binding */ sourceMapLoader)
/* harmony export */ });
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _babel_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _babel_preset_env__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_env__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var _babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_preset_typescript__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);
/* harmony import */ var babel_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var source_map_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26);
/* harmony import */ var source_map_loader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(source_map_loader__WEBPACK_IMPORTED_MODULE_4__);
/* eslint-disable import/no-unassigned-import */






/* eslint-enable import/no-unassigned-import */
function sourceMapLoader() {
  return {
    test: /\.js$/u,
    use: ['source-map-loader'],
    enforce: 'pre'
  };
}

/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("source-map-loader");

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dependencyPackerPlugin": () => (/* binding */ dependencyPackerPlugin)
/* harmony export */ });
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_webpack_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



class DependencyPackerPlugin {
  constructor(packageJsonProperties = {}) {
    this.packageJsonProperties = packageJsonProperties;
  }

  apply(compiler) {
    const name = 'DependencyPackerPlugin';
    const depMap = new Map();
    compiler.resolverFactory.hooks.resolver.for('normal').tap(name, resolver => {
      resolver.hooks.result.tap(name, result => {
        if (result.descriptionFileRoot !== undefined && result.descriptionFileRoot === compiler.context) {
          return result;
        }

        if (result.descriptionFileData && 'name' in result.descriptionFileData && 'version' in result.descriptionFileData) {
          const {
            name,
            version
          } = result.descriptionFileData;
          depMap.set(name, version);
        } else {
          console.log('failure to identify module', result.descriptionFileData);
        }

        return result;
      });
    });
    compiler.hooks.beforeRun.tap(name, () => depMap.clear()); // compiler.hooks.compilation.tap(name, compilation => {
    //   // compilation.hooks.finishModules.tapPromise(name, async modules => {
    //   //   await Promise.allSettled(
    //   //     [...modules].map(async m => {
    //   //       if (!('userRequest' in m)) {
    //   //         return;
    //   //       }
    //   //       // console.log(
    //   //       //   compilation.resolverFactory
    //   //       //     .get('normal')
    //   //       //     .resolveSync(m.context, compiler.context, m.request)
    //   //       // );
    //   //       const module = m as ExternalModule | NormalModule;
    //   //       const request = module.userRequest;
    //   //       if (request.startsWith('node:')) {
    //   //         return;
    //   //       }
    //   //       const res = await matcherAsync(module.userRequest);
    //   //       if (res === undefined) {
    //   //         return;
    //   //       }
    //   //       const packageJson = await findPackageJson(res);
    //   //       if (packageJson === undefined) {
    //   //         return;
    //   //       }
    //   //       depMap.set(packageJson['name'] as string, packageJson['version'] as string);
    //   //     })
    //   //   );
    //   // });
    // });

    compiler.hooks.done.tapPromise(name, async stats => {
      if (stats.hasErrors()) {
        return;
      }

      const dependencies = Object.fromEntries([...depMap.entries()].sort((e1, e2) => e1[0].localeCompare(e2[0])));
      let {
        name,
        version,
        ...extraProps
      } = this.packageJsonProperties;

      if (name === undefined || version === undefined) {
        const entryPoints = Object.values(stats.compilation.compiler.options.entry);
        const [firstEntryPoint] = entryPoints;

        if (firstEntryPoint === undefined) {
          return;
        }

        const entryPoint = firstEntryPoint.import.at(-1);
        const entryPackageJson = await (0,_src_webpack_utils__WEBPACK_IMPORTED_MODULE_1__.findPackageJson)(entryPoint);

        if (!entryPackageJson) {
          console.error(`Failure to retrieve entryPoint's package.json for ${entryPoint}`);
          return;
        }

        name = entryPackageJson['name'];
        version = entryPackageJson['version'];
      }

      const outputDirectory = stats.compilation.compiler.options.output.path;
      await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.writeFile)(`${outputDirectory}/package.json`, JSON.stringify({
        name,
        version,
        type: 'module',
        main: 'index.js',
        ...extraProps,
        dependencies
      }, undefined, 2));
    });
  }

}

function dependencyPackerPlugin(packageJsonProperties) {
  return new DependencyPackerPlugin(packageJsonProperties);
}

/***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _src_webpack_configs_node_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

function config(context) {
  return (0,_src_webpack_configs_node_config__WEBPACK_IMPORTED_MODULE_0__.nodeConfig)({
    context,
    isLib: false
  });
}
})();

var __webpack_exports__config = __webpack_exports__.config;
export { __webpack_exports__config as config };
