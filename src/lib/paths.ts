export function withBasePath(path: string, basePath: string): string {
  return `${basePath}${path}`;
}

export function absoluteUrl(path: string, siteUrl: string): string {
  return `${siteUrl.replace(/\/+$/, "")}${path}`;
}
