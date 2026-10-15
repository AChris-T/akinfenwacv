import { cacheLife } from "next/cache";

// Cache Components forbids a bare `new Date()` during prerender; a cached component may read it.
// Refreshed daily, so the footer year rolls over on its own.
export default async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
