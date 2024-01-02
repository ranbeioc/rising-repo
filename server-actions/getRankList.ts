'use server'

import { ofetch } from 'ofetch'
import { memoize } from 'nextjs-better-unstable-cache'

export interface IDuring {
  start: string
  end: string
}

export default memoize(
  async function getRankList({ during }: { during: IDuring }) {
    const data = await ofetch('https://play.clickhouse.com/?user=play', {
      method: 'POST',
      body: `
      SELECT
        repo_name,
        count() AS stars
      FROM github_events
      WHERE
        event_type = 'WatchEvent' AND
        created_at >= '${during.start}' AND
        created_at < '${during.end}'
      GROUP BY
        repo_name
      ORDER BY stars DESC
        LIMIT 10
        FORMAT JSON
    `,
    })
    return data.data as { repo_name: string; stars: number }[]
  },
  {
    persist: true,
    duration: 24 * 3600,
    log: ['datacache'],
  },
)
