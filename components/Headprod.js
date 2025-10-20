import { Head } from "next/document";
import React from "react";
import { getPageFiles } from "next/dist/next-server/server/get-page-files";

function getOptionalModernScriptVariant(path) {
  if (process.env.__NEXT_MODERN_BUILD) {
    return path.replace(/\.js$/, ".module.js");
  }
  return path;
}

function getDocumentFiles(buildManifest, pathname) {
  const sharedFiles = getPageFiles(buildManifest, "/_app");
  const pageFiles = pathname !== "/_error" ? getPageFiles(buildManifest, pathname) : [];

  return {
    sharedFiles,
    pageFiles,
    allFiles: [...new Set([...sharedFiles, ...pageFiles])],
  };
}

class HeadProduction extends Head {
  getPreloadMainLinks(files) {
    const { assetPrefix, devOnlyCacheBusterQueryString } = this.context;
    const preloadFiles = files.allFiles.filter((file) => file.endsWith(getOptionalModernScriptVariant(".js")));

    return !preloadFiles.length
      ? null
      : preloadFiles.map((file) => (
        <link
          key={file}
          nonce={this.props.nonce}
          // rel="preload" <------------------- comment preload 
          href={`${assetPrefix}/_next/${encodeURI(
            file,
          )}${devOnlyCacheBusterQueryString}`}
          as="script"
          crossOrigin={
              this.props.crossOrigin || process.env.__NEXT_CROSS_ORIGIN
            }
        />
      ));
  }

  render() {
   const { head, headTags, styles } = this.context;
    const { children } = this.props;
    const files = getDocumentFiles(
      this.context.buildManifest,
      this.context.__NEXT_DATA__.page,
    );
    return (
      <head {...this.props}>
        {children}
        {head}
        {this.getCssLinks(files)}
        {this.getPreloadDynamicChunks()}
        {this.getPreloadMainLinks(files)}
        {styles || null}
        {React.createElement(React.Fragment, {}, ...(headTags || []))}
      </head>
    );
  }
}
export default HeadProduction;