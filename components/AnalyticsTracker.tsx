'use client'

import { useAnalytics } from '@/hooks/useAnalytics'

export default function AnalyticsTracker({ page }: { page: string }) {
  useAnalytics(page)
  return null
}
