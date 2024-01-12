import { ColumnDef } from '@tanstack/react-table'
import { IRankItem } from '@/server-actions/kv/setRank'
import { clsx } from 'clsx'
import * as React from 'react'

export const addedStarsColumn: ColumnDef<IRankItem> = {
  id: 'addedStars',
  size: 20,
  accessorKey: 'addedStars',
  header: () => {
    return <p className={clsx('text-start')}>Stars</p>
  },
  cell: (props) => {
    const addedStars = props.row.original.addedStars
    return (
      <p
        className={clsx(
          'flex flex-row items-center  justify-start',
          'text-green-700',
        )}
      >
        +{addedStars}
      </p>
    )
  },
}