// fail if missing env variables 
function mustGetEnv(name:string): string {
    const v = process.env[name];
    if(!v) throw new Error(`Missing env var: ${name}`);
    return v;
}
const PASSWORD = mustGetEnv('STANDARD_PASSWORD');
//helper function to not repeat password
const withPWD = (username:string) => ({
    username,
    password: PASSWORD
});

export const Users = {
    standard: withPWD('standard_user'),
    locked: withPWD('locked_out_user'),
    problem: withPWD('problem_user'),
    glitch: withPWD('performance_glitch_user'),
    error: withPWD('error_user'),
    visual: withPWD('visual_user')

} as const;