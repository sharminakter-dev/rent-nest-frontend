// app/dashboard/tenant/_components/utils.ts
export function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateStr))
}

export function computeEndDate(startDate: string, durationMonths: number) {
  const end = new Date(startDate)
  end.setMonth(end.getMonth() + durationMonths)
  return end.toISOString()
}

export function formatCurrency(amountInCents: string) {
  const value = Number(amountInCents) / 100
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}