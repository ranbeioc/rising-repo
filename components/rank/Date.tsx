'use client'

import { dateToDuring } from '@/components/rank/DateToDuring'
import { useQueryState } from 'nuqs'
import { dateParser } from '@/components/rank/dateParser'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { clsx } from 'clsx'
interface Props {}

export default function Date({}: Props) {
  const [date, setDate] = useQueryState('date', dateParser)
  return (
    <div>
      <RadioGroup
        defaultValue={date}
        className={clsx('space-x-5')}
        onValueChange={async (value) => {
          setDate(value)
        }}
      >
        {Object.keys(dateToDuring).map((value) => {
          return (
            <Label
              key={value}
              className={clsx('inline-flex flex-row items-center gap-1')}
            >
              <RadioGroupItem value={value}></RadioGroupItem>
              {value}
            </Label>
          )
        })}
      </RadioGroup>
    </div>
  )
}
