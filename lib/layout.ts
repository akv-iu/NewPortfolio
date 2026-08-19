/** Decides how a dropped file renders and how the work grid packs. */

const VIDEO = /\.(mp4|webm|mov|m4v)$/i;

export function isVideo(file: string) {
  return VIDEO.test(file);
}

/**
 * After the featured project, tiles pair up two per row. A leftover odd tile
 * widens to fill its row so the grid never ends on an empty cell.
 *
 * @param index position within the non-featured projects
 * @param total how many non-featured projects there are
 */
export function spansFullRow(index: number, total: number) {
  return index === total - 1 && total % 2 === 1;
}
