@echo off
set "PATH=C:\Users\hyded\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%PATH%"
cd /d "C:\Users\hyded\OneDrive\The Evolution of bikes\website"
"C:\Users\hyded\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" "node_modules\astro\bin\astro.mjs" dev --host 127.0.0.1
