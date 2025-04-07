// export function add(a: number, b: number): number {
//   return a + b;
// }

// // Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
// if (import.meta.main) {
//   console.log("Add 2 + 3 =", add(2, 3));
// }

import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

// Servidor para rodar frontend com HTML + TS direto no navegador
Deno.serve((req) => serveDir(req, { fsRoot: "./Home" }));