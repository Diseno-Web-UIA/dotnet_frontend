export default (env) => {
    const mode = process.env.REACT_APP_MODE ?? "0";
    const prefix = parseInt(mode) === 0 ? "REACT_APP_SB_" : "REACT_APP_PROD_";
    return process.env[prefix+env] ?? null;
}