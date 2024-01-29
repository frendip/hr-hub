function getOrElse(env: NodeJS.ProcessEnv, key: string, def: string) {
    if (key in env) {
        return env[key]!!;
    }
    return def;
}

export const urlPath = getOrElse(process.env, 'API_URL', 'http://localhost:8001/api/');
