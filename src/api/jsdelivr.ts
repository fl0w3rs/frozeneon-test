import type * as JsdelivrApi from './jsdelivr.types';

const API_URL = 'https://data.jsdelivr.com';

export const fetchStats = async (packageName: string): Promise<JsdelivrApi.Stats> => {
  const url = `${API_URL}/v1/stats/packages/npm/${packageName}`;
  const resp = await fetch(url);

  return await resp.json();
};

export const fetchVersions = async (packageName: string): Promise<JsdelivrApi.Version[]> => {
  const url = `${API_URL}/v1/stats/packages/npm/${packageName}/versions`;
  const resp = await fetch(url);

  return await resp.json();
};

export const fetchVersionFiles = async (
  packageName: string,
  version: string
): Promise<JsdelivrApi.File[]> => {
  const url = `${API_URL}/v1/stats/packages/npm/${packageName}@${version}/files`;
  const resp = await fetch(url);

  return await resp.json();
};
