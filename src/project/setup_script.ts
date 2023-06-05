import {ProjectName} from '@src/models';

export function generateSetupScript(projects: ProjectName[]): string {
  return `
import {join} from 'path';
import {execSync, exec} from 'child_process';

//

function detectYarn() {
  try {
    const yarnVersion = execSync('yarn -v', {stdio: ['ignore', 'pipe', 'ignore']}).toString();
    if (!yarnVersion.split('\\n')[0].match(/^\\d+.\\d+.\\d+$/)) {
      return \`Invalid yarn version "\${yarnVersion}"\`;
    }
  } catch (err) {
    return 'Yarn is not installed';
  }
}

function detectTerraform() {
  try {
    const terraformVersion = execSync('terraform -v', {
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString();
    if (!terraformVersion.split('\\n')[0].match(/^Terraform v\\d+.\\d+.\\d+$/)) {
      return \`Invalid terraform version "\${terraformVersion}"\`;
    }
  } catch (err) {
    return 'Terraform is not installed';
  }
}

function requirementDetection() {
  const errors = [detectYarn(), detectTerraform()].filter(err => typeof err === 'string');
  if (errors.length > 0) {
    console.error(errors.join('\\n'));
    return false;
  }
  return true;
}

//

async function installNodeModulesAtPath(path) {
  return new Promise((resolve, reject) => {
    exec(\`yarn install --check-files --audit --non-interactive --ignore-optional\`, {cwd: path}, (error, stdout, stderr) => {
      if (!error) {
        resolve();
      } else {
        console.error(\`Failure to run \\\`yarn install\\\` at "\${path}"\\n\${stderr}\`);
        reject();
      }
    });
  });
}

async function installNodeModules() {
  await Promise.all([
    installNodeModulesAtPath(process.cwd()),
    ${projects.map(p => `installNodeModulesAtPath(join(process.cwd(), '${p}')),`).join('\n')}
  ])
  }

async function run() {
  console.log('Checking requirements...');
  if (!requirementDetection()) {
    throw 'requirementDetection failure';
  }
  console.log('Installing node_modules...');
  await installNodeModules();
  console.log('Done');
}

run()
  .catch(err => {
    console.error(err);
    console.log('Fix the issue then run \`node setup.js\` manually');
  })
  .catch(() => process.exit(13));
  `.trim();
}
