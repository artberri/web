const Deployer = require('ssh-deploy-release');

const options = {
    localPath: 'public',
    host: 'berriart.com',
    username: 'deploy',
    deployPath: '/data/www/berriart.com',
    currentReleaseLink: 'current',
    privateKeyFile: process.env.BERRIART_DEPLOY_KEY
};

const deployer = new Deployer(options);
deployer.deployRelease(() => {
    console.log('Ok !')
});
