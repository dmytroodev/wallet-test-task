import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import {
  faBagShopping,
  faBolt,
  faCartShopping,
  faFilm,
  faGasPump,
  faGift,
  faHouse,
  faLocationDot,
  faMugHot,
} from '@fortawesome/free-solid-svg-icons'

import type { TransactionType } from '../types/transaction'

const MS_PER_DAY = 24 * 60 * 60 * 1000

export const CARD_LIMIT = 1500

const iconPool: IconDefinition[] = [
  faApple,
  faCartShopping,
  faHouse,
  faFilm,
  faGasPump,
  faBagShopping,
  faMugHot,
  faBolt,
  faGift,
  faLocationDot,
]

const darkBackgrounds = [
  '#2f3b52',
  '#2f4f4f',
  '#3a3459',
  '#4a3b2f',
  '#1e3a5f',
  '#3d2f45',
  '#303841',
]

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'numeric',
  day: 'numeric',
  year: '2-digit',
})

const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
})

const fullDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'numeric',
  day: 'numeric',
  year: '2-digit',
  hour: 'numeric',
  minute: '2-digit',
})

function atStartOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function hash(value: string): number {
  return value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

function getSeasonStart(date: Date): Date {
  const year = date.getFullYear()
  const month = date.getMonth()

  if (month >= 2 && month <= 4) {
    return new Date(year, 2, 1)
  }

  if (month >= 5 && month <= 7) {
    return new Date(year, 5, 1)
  }

  if (month >= 8 && month <= 10) {
    return new Date(year, 8, 1)
  }

  if (month === 11) {
    return new Date(year, 11, 1)
  }

  return new Date(year - 1, 11, 1)
}

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount)
}

export function formatAmount(type: TransactionType, amount: number): string {
  const base = formatCurrency(amount)
  return type === 'Payment' ? `+${base}` : base
}

export function formatDateForList(value: string, now = new Date()): string {
  const date = new Date(value)
  const diffDays = Math.floor(
    (atStartOfDay(now).getTime() - atStartOfDay(date).getTime()) / MS_PER_DAY,
  )

  if (diffDays === 1) {
    return 'Yesterday'
  }

  if (diffDays >= 0 && diffDays < 7) {
    return weekdayFormatter.format(date)
  }

  return dateFormatter.format(date)
}

export function formatFullDate(value: string): string {
  return fullDateFormatter.format(new Date(value))
}

export function calculateDailyPoints(now = new Date()): number {
  const seasonStart = getSeasonStart(now)
  const seasonDay =
    Math.floor((atStartOfDay(now).getTime() - seasonStart.getTime()) / MS_PER_DAY) +
    1

  if (seasonDay <= 1) {
    return 2
  }

  if (seasonDay === 2) {
    return 3
  }

  let twoDaysAgo = 2
  let previousDay = 3

  for (let day = 3; day <= seasonDay; day += 1) {
    const current = Math.round(twoDaysAgo + previousDay * 0.6)
    twoDaysAgo = previousDay
    previousDay = current
  }

  return previousDay
}

export function formatPoints(points: number): string {
  if (points > 1000) {
    return `${Math.round(points / 1000)}K`
  }

  return String(points)
}

export function getTransactionIcon(id: string): {
  icon: IconDefinition
  background: string
} {
  const index = hash(id)

  return {
    icon: iconPool[index % iconPool.length],
    background: darkBackgrounds[index % darkBackgrounds.length],
  }
}
