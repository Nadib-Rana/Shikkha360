// src/utils/registration.ts
export function generateStudentRegId(
  schoolCode = "SCH",
  year = new Date().getFullYear()
): string {
  // Example: SCH-2025-0001
  const rand = Math.floor(Math.random() * 9999) + 1;
  const padded = String(rand).padStart(4, "0");
  return `${schoolCode}-${year}-${padded}`;
}
