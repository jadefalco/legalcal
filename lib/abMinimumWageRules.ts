export function calculateMinimumWage(
  hoursWorked: number,
  wageType: string
): {
  hourlyRate: number;
  totalPay: number;
} {
  let hourlyRate: number;

  if (wageType === "general") {
    hourlyRate = 15.0;
  } else if (wageType === "student_under_18") {
    hourlyRate = 13.0;
  } else {
    hourlyRate = 15.0;
  }

  const totalPay = hoursWorked * hourlyRate;

  return {
    hourlyRate,
    totalPay,
  };
}
