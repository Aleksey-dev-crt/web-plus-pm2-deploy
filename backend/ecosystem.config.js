require('dotenv').config();
require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REPO, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-backend',
    script: './dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-setup': 'rm -rf mesto',
      'pre-deploy-local': `scp ./.env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend`,
      'pre-deploy': 'cd ~/mesto/source/backend/ && npm i && npm run build',
      'post-deploy': 'cd ~/mesto/source/backend/ && pm2 start',
    },
  },
};
