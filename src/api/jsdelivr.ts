import type { JsdelivrApi } from './jsdelivr.types';

const API_URL = 'https://data.jsdelivr.com';

export const fetchStats = async (packageName: string) => {
  const url = `${API_URL}/v1/stats/packages/npm/${packageName}`;
  const resp = await fetch(url);

  return await resp.json() as Promise<JsdelivrApi.Stats>;
}

export const fetchVersions = async (packageName: string) => {
  const url = `${API_URL}/v1/stats/packages/npm/${packageName}/versions`;
  const resp = await fetch(url);

  return await resp.json() as Promise<JsdelivrApi.Version[]>;
}

export const fetchVersionFiles = async (packageName: string, version: string) => {
  const url = `${API_URL}/v1/stats/packages/npm/${packageName}@${version}/files`;
  const resp = await fetch(url);

  return await resp.json() as Promise<JsdelivrApi.File[]>;
}
