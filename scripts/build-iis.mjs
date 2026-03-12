import { cp, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');

const copyIfExists = async (src, dest) => {
  try {
    await stat(src);
    await cp(src, dest, { recursive: true });
  } catch {
    // Skip missing optional paths.
  }
};

const build = async () => {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  const rootItems = await readdir(rootDir, { withFileTypes: true });
  const htmlFiles = rootItems
    .filter((item) => item.isFile() && item.name.toLowerCase().endsWith('.html'))
    .map((item) => item.name);

  for (const htmlFile of htmlFiles) {
    await cp(path.join(rootDir, htmlFile), path.join(distDir, htmlFile));
  }

  await copyIfExists(path.join(rootDir, 'assets'), path.join(distDir, 'assets'));
  await copyIfExists(path.join(rootDir, 'css'), path.join(distDir, 'css'));
  await copyIfExists(path.join(rootDir, 'js'), path.join(distDir, 'js'));
  await copyIfExists(path.join(rootDir, 'robots.txt'), path.join(distDir, 'robots.txt'));
  await copyIfExists(path.join(rootDir, 'sitemap.xml'), path.join(distDir, 'sitemap.xml'));
  await copyIfExists(path.join(rootDir, 'llms.txt'), path.join(distDir, 'llms.txt'));

  const webConfig = `<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <defaultDocument enabled="true">
      <files>
        <clear />
        <add value="index.html" />
      </files>
    </defaultDocument>
    <staticContent>
      <remove fileExtension=".webp" />
      <mimeMap fileExtension=".webp" mimeType="image/webp" />
      <remove fileExtension=".json" />
      <mimeMap fileExtension=".json" mimeType="application/json" />
      <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="7.00:00:00" />
    </staticContent>
    <httpProtocol>
      <customHeaders>
        <remove name="X-Powered-By" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>
`;

  await writeFile(path.join(distDir, 'web.config'), webConfig, 'utf8');

  console.log('IIS build complete. Deploy the dist folder contents to IIS.');
};

build().catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
