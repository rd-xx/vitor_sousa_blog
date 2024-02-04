const addYears = (date: Date, years: number) => {
  date.setFullYear(date.getFullYear() + years)

  return date
}

export const DateUtils = {
  addYears,
}
