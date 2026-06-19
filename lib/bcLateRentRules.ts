export function validateLateRent(
  rentDueDate: string,
  noticeServeDate: string
): {
  valid: boolean;
  calculatedDaysLate: number;
} {
  const [dueYear, dueMonth, dueDay] = rentDueDate.split("-").map(Number);
  const [noticeYear, noticeMonth, noticeDay] = noticeServeDate
    .split("-")
    .map(Number);

  const due = new Date(dueYear, dueMonth - 1, dueDay);
  const notice = new Date(noticeYear, noticeMonth - 1, noticeDay);

  const diffTime = notice.getTime() - due.getTime();
  const calculatedDaysLate = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const valid = calculatedDaysLate >= 1;

  return { valid, calculatedDaysLate };
}
