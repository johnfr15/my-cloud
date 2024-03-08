import { defineConfig } from 'vite'
import fs from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ react() ],
  build: {
    outDir: 'public', // Specify the output directory
  },
  // server: {
  //   https: {
  //     // key: fs.readFileSync(path.resolve(__dirname, 'path/to/private-key.pem')),
  //     // cert: fs.readFileSync(path.resolve(__dirname, 'path/to/certificate.pem')),
  //   },
  // },
})
