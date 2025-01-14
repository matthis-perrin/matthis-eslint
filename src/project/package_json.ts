import {PROJECT_TYPE_TO_METADATA, WorkspaceName} from '@src/models';
import {WorkspaceProject} from '@src/project/generate_workspace';
import {NODE_VERSION, PACKAGE_VERSIONS, TYPESCRIPT_VERSION} from '@src/versions';

function uniq<T>(val: T[]): T[] {
  return [...new Set(val).values()];
}

export function generateWorkspacePackageJson(
  workspaceName: WorkspaceName,
  projects: WorkspaceProject[]
): Record<string, unknown> {
  const eslintRuntimes = uniq(projects.map(p => PROJECT_TYPE_TO_METADATA[p.type].eslint));
  const tsconfigRuntimes = uniq(projects.map(p => PROJECT_TYPE_TO_METADATA[p.type].tsconfig));
  const webpackRuntimes = uniq(projects.map(p => PROJECT_TYPE_TO_METADATA[p.type].webpack));

  return {
    name: workspaceName,
    license: 'UNLICENSED',
    type: 'module',
    engines: {
      node: NODE_VERSION,
    },
    scripts: {
      setup: 'node ./setup.js',
      deploy: 'node ./deploy.js',
      build: 'node ./build.js',
      watch: 'node ./build.js --watch',
    },
    prettier: '@matthis/prettier-config',
    devDependencies: Object.fromEntries(
      (
        [
          ...eslintRuntimes.map(runtime => [
            `@matthis/eslint-config-${runtime}`,
            PACKAGE_VERSIONS.eslint,
          ]),
          ['@matthis/prettier-config', PACKAGE_VERSIONS.prettier],
          ...tsconfigRuntimes.map(runtime => [
            `@matthis/tsconfig-${runtime}`,
            PACKAGE_VERSIONS.tsconfig,
          ]),
          ...webpackRuntimes.map(runtime => [
            `@matthis/webpack-${runtime}`,
            PACKAGE_VERSIONS.webpack,
          ]),
          ['@matthis/webpack-runner', PACKAGE_VERSIONS.runner],
          ['typescript', TYPESCRIPT_VERSION],
        ] as [string, string][]
      ).sort((d1, d2) => d1[0].localeCompare(d2[0]))
    ),
  };
}
