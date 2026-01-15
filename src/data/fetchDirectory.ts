export async function fetchDirectoryJson(url = "/data/directory.json") {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch directory: ${res.status}`);
  const data = await res.json();
  return data;
}