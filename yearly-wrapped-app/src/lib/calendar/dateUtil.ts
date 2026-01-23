export function datesAreEqual(day1: Date, day2: Date): boolean {
  const equal: boolean = day1.getFullYear() == day2.getFullYear()
    && day1.getMonth() == day2.getMonth()
    && day1.getDate() == day2.getDate();

  return equal;
}