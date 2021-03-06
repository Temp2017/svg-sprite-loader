/**
 * Find nearest module chunk (not sure that is reliable method, but who cares).
 * @see http://stackoverflow.com/questions/43202761/how-to-determine-all-module-chunks-in-webpack
 * @param {NormalModule} module
 * @param {NormalModule[]} modules - webpack 1 compat
 * @return {Chunk|null}
 */
function getModuleChunk(module, modules) {
  const { chunks } = module;

  // webpack 1 compat
  const issuer = typeof module.issuer === 'string'
    ? modules.find(m => m.request === module.issuer)
    : module.issuer;

  if (Array.isArray(chunks) && chunks.length > 0) {
    return chunks[chunks.length - 1];
  } else if (issuer) {
    return getModuleChunk(issuer, modules);
  }

  return null;
}

module.exports = getModuleChunk;
