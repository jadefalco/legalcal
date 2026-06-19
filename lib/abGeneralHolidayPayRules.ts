export function calculateGeneralHolidayPay(
  averageDailyWage: number,
  hoursWorkedOnHoliday: number,
  isRegularWorkday: boolean
): {
  holidayPayAmount: number;
  premiumPayAmount: number;
  totalPay: number;
} {
  const holidayPayAmount = averageDailyWage;

  const hourlyRate = averageDailyWage / 8;

  let premiumPayAmount: number;
  if (hoursWorkedOnHoliday > 0) {
    premiumPayAmount = hoursWorkedOnHoliday * (hourlyRate * 1.5);
  } else {
    premiumPayAmount = 0;
  }

  let totalPay: number;
  if (isRegularWorkday) {
    totalPay = holidayPayAmount + premiumPayAmount;
  } else {
    totalPay = premiumPayAmount;
  }

  return {
    holidayPayAmount,
    premiumPayAmount,
    totalPay,
  };
}
