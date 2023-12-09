import {TrainingProcess} from "../domain/lecturer";

export function generateLevel(trainingProcess: TrainingProcess[]): string {
  const sortedTrainingProcess = trainingProcess.sort((a, b) => a.level.displayOrder - b.level.displayOrder);
  const top2TrainingProcess = sortedTrainingProcess.slice(0, 2);
  return top2TrainingProcess.map((tp) => tp.level.kyHieu).join('.');
}
