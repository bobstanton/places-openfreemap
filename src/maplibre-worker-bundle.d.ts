// Virtual module supplied by the maplibre-worker-inline esbuild plugin
// (see esbuild.config.mjs). Its default export is the self-contained maplibre-gl 6
// worker source, which the provider serves to maplibre via a blob URL.
declare module "maplibre-worker-bundle" {
  const workerCode: string;
  export default workerCode;
}
