import {SelectItemGroup} from "primeng/api";
import {SelectItem} from "primeng/api/selectitem";

export function getCurrentSemester(groupedSemesters: SelectItemGroup[]): SelectItem | undefined {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const lastYear = currentYear - 1;

  if (currentMonth >= 1 && currentMonth <= 5) {
    const group = groupedSemesters.find(item => item.value === lastYear);
    return group?.items[1];
  } else if (currentMonth >= 6 && currentMonth <= 8) {
    const group = groupedSemesters.find(item => item.value === lastYear);
    return group?.items[0];
  } else if (currentMonth >= 9 && currentMonth <= 12) {
    const group = groupedSemesters.find(item => item.value === currentYear);
    return group?.items[2];
  }
  return undefined;
}
