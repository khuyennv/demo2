export default (): Record<string, unknown> => ({
    PORT: parseInt(process.env.PORT, 10) || 3000,
    apiPrefix: process.env.API_PREFIX,
    language: "vi",
    redisUri: process.env.REDIS_URI,
    rabbitmqUri: process.env.RABBITMQ_URI,
    DEFAULT_AVATAR: "https://storage.googleapis.com/fjob-dev/default-avatar.png",
    logLevel: process.env.LOG_LEVEL,
    SENTRY_DSN: process.env.SENTRY_DSN,
})
