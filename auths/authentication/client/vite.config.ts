import { defineConfig, loadEnv } from 'vite'
import fs from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => 
{
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [ react() ],
    build: {
      outDir: 'public', // Specify the output directory
    },
    base: path.join( env.VITE_BASENAME, env.VITE_APP_NAME ),
    // server: {
    //   https: {
    //     // key: fs.readFileSync(path.resolve(__dirname, 'path/to/private-key.pem')),
    //     // cert: fs.readFileSync(path.resolve(__dirname, 'path/to/certificate.pem')),
    //   },
    // },
  }
})
