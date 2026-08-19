import assert from "node:assert/strict";
import { test } from "node:test";

import { isVideo, spansFullRow } from "../lib/layout.ts";

test("isVideo picks video extensions, case insensitive", () => {
  for (const file of ["a.mp4", "a.webm", "a.mov", "a.m4v", "A.MP4"]) {
    assert.equal(isVideo(file), true, file);
  }
  for (const file of ["a.png", "a.jpg", "a.jpeg", "a.webp", "a.gif", "mp4.png", ""]) {
    assert.equal(isVideo(file), false, file);
  }
});

test("the grid never ends on an empty cell", () => {
  // 1 leftover: it spans the whole row on its own.
  assert.deepEqual([0].map((i) => spansFullRow(i, 1)), [true]);
  // 2 leftovers: they pair up.
  assert.deepEqual([0, 1].map((i) => spansFullRow(i, 2)), [false, false]);
  // 3 leftovers: two pair up, the third widens.
  assert.deepEqual([0, 1, 2].map((i) => spansFullRow(i, 3)), [false, false, true]);
  // 4 leftovers: two clean rows.
  assert.deepEqual(
    [0, 1, 2, 3].map((i) => spansFullRow(i, 4)),
    [false, false, false, false],
  );
  // No projects beyond the featured one: nothing to place.
  assert.equal(spansFullRow(0, 0), false);
});
