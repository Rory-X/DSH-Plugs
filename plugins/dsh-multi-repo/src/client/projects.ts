import type { MultiRepoProject } from '../shared.ts'
import { PROJECT_PATH } from '../shared.ts'
import { getJson } from './http.ts'

interface ListPayload {
  root: string
  projects: MultiRepoProject[]
}

let cache: MultiRepoProject[] = []
const listeners = new Set<() => void>()

function emit(): void {
  for (const listener of listeners) listener()
}

export function subscribeProjects(listener: () => void): () => void {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

export function getProjects(): MultiRepoProject[] {
  return cache
}

export async function refreshProjects(): Promise<MultiRepoProject[]> {
  const list = await getJson<ListPayload>(PROJECT_PATH)
  cache = list.projects
  emit()
  return cache
}
