import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Safe storage access ─────────────────────────────────────────────────
// Safari (a Safari jedině) hodí synchronní SecurityError při čtení/zápisu
// do localStorage/sessionStorage, když má uživatel zapnuté "Block All
// Cookies" — bez try/catch to shodí celý React strom (žádný error boundary
// v rootu), stránka zůstane prázdná/bílá. Chrome/Firefox tohle nastavení
// buď nemají, nebo storage jen tiše nepersistuje, nehodí výjimku.
export function safeStorageGet(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key)
  } catch {
    return null
  }
}

export function safeStorageSet(storage: Storage, key: string, value: string): void {
  try {
    storage.setItem(key, value)
  } catch {
    // Storage nedostupné (Safari "Block All Cookies") — tiché selhání,
    // funkce (cookie souhlas, intro jednou za session, session ID) prostě
    // nebude persistovat, ale appka musí zůstat funkční.
  }
}
