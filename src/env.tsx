export enum Environments {
    DEVELOPMENT = 'development',
    TESTING = 'test',
    PRODUCTION = 'production'
}

export function currentEnv(): Environments {
    if (Environments.PRODUCTION === process.env.NODE_ENV) {
        return Environments.PRODUCTION;
    } else {
        return Environments.DEVELOPMENT;
    }
}

export function isProd(): boolean {
    return (Environments.PRODUCTION === process.env.NODE_ENV);
}

export function isTest(): boolean {
    return (Environments.TESTING === process.env.NODE_ENV);
}

export function isDev(): boolean {
    return (Environments.DEVELOPMENT === process.env.NODE_ENV);
}