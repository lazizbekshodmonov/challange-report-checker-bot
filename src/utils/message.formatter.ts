import type { IProject } from '../types/project.js';

export function projectMessageFormatter(projects: IProject[]) {
  const sorted = projects.sort((a: IProject, b: IProject) => b.voteCount - a.voteCount);

  const medals = ['🥇', '🥈', '🥉'];
  const project = sorted.find((item) => item.publicId == '052400859005');

  const list = sorted
    .map((item, index) => {
      const position = index < 3 ? medals[index] : `${index + 1}.`;
      const difference =
        project && project.publicId !== item.publicId ? item.voteCount - project?.voteCount : 0;

      return `${position} <strong>${item.quarterName}</strong>\n ${`<i>${(item.description ? item.description : item.categoryName).slice(0, 70)}...</i>` || '-'}\n <strong>Овозлар:</strong> <i>${item.voteCount}</i> \n <strong>Овозлар фарқи:</strong> <i>${difference}</i>`;
    })
    .join('\n\n');
  // <i>⚠️ Har 10 daqiqada avtomatik yangilanadi</i>

  return `<strong>📊 Миришкор тумани бўйича овоз бериш натижалари:</strong>\n ${list}`;
}
