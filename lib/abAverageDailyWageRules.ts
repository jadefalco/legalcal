export function calculateAverageDailyWage(
  totalWagesEarned: number,
  daysWorked: number
): {
  averageDailyWage: number;
} {
  const averageDailyWage = totalWagesEarned / daysWorked;

  return {
    averageDailyWage,
  };
}
