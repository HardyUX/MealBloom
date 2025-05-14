// babel.config.js
module.exports = {
    presets: [
        // For modern JS support
        ['@babel/preset-env', { targets: { node: 'current' } }],
        // For JSX - automatic runtime so you don't need `import React` if you don't want it
        ['@babel/preset-react', { runtime: 'automatic' }],
    ],
};