export function calculateOvertimePay(
  regularHoursWorked: number,
  overtimeHoursWorked: number,
  hourlyWage: number,
  overtimeRule: string
): {
  overtimeRate: number;
  overtimePayAmount: number;
  totalPay: number;
} {
  let overtimeRate: number;

  if (overtimeRule === "8_and_44") {
    overtimeRate = hourlyWage * 1.5;
  } else if (overtimeRule === "flexible_arrangement") {
    overtimeRate = hourlyWage * 1.0;
  } else {
    overtimeRate = hourlyWage * 1.5;
  }

  const overtimePayAmount = overtimeHoursWorked * overtimeRate;
  const totalPay = regularHoursWorked * hourlyWage + overtimePayAmount;

  return {
    overtimeRate,
    overtimePayAmount,
    totalPay,
  };
}
