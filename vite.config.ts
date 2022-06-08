import { UserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const config: UserConfig = {
    publicDir: 'public',
    base: '/portfolio-mario/',
    build: {
        outDir: 'docs',
    },
    plugins: [tsconfigPaths()]
}


export default config