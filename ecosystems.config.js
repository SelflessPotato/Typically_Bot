module.exports = {
    apps: [
        {
            name: "typically_bot",
            script: "dist\\bot.mjs",
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            },
            instances: 1,
            exec_mode: "fork"
        }
    ]
}