import type * as JsdelivrApi from './jsdelivr.types';

const API_URL = import.meta.env.VITE_JSDELIVR_API_URL;

const getJson = async <T>(url: string): Promise<T> => {
  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error(`jsDelivr request failed: ${resp.status}`);
  }

  return (await resp.json()) as T;
};

export const fetchStats = (packageName: string) =>
  getJson<JsdelivrApi.Stats>(`${API_URL}/v1/stats/packages/npm/${packageName}`);

export const fetchVersions = (packageName: string) =>
  getJson<JsdelivrApi.Version[]>(`${API_URL}/v1/stats/packages/npm/${packageName}/versions`);

export const fetchVersionFiles = (packageName: string, version: string) =>
  getJson<JsdelivrApi.File[]>(`${API_URL}/v1/stats/packages/npm/${packageName}@${version}/files`);
