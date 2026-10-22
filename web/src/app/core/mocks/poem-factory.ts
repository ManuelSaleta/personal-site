import type { Poem } from '../models/portfolio.model';

/**
 * Seed templates used by {@link poemFactory} to deterministically generate Slice of Life poems
 * in local development and test environments without external network dependencies.
 */
const SEED_POEMS: readonly Omit<Poem, 'number'>[] = [
  {
    title: 'Midnight Compilation',
    body: [
      'A quiet hum beneath the desk,',
      'Green cursors blinking in the dark,',
      'Each trace of logic put to test,',
      'Until the green checks leave their mark.',
      '',
      'Outside the rain begins to fall,',
      'Inside the containers softly spin,',
      'Small packets answering the call,',
      'Where new architectures begin.',
    ].join('\n'),
  },
  {
    title: 'Coffee Before Dawn',
    body: [
      'Steam rises from a ceramic cup,',
      'While Biscayne Bay is still asleep,',
      'The morning sun is coming up,',
      'And promises are ours to keep.',
      '',
      'A notebook open on the table,',
      'Sketches of systems yet unbuilt,',
      'Resilient, simple, clean, and stable,',
      'Free of complexity and guilt.',
    ].join('\n'),
  },
  {
    title: 'Topography of Thought',
    body: [
      'Contour lines across the page,',
      'Map out the valleys and the peaks,',
      'Every release another stage,',
      'In what the patient builder seeks.',
      '',
      'Not haste, but clarity of form,',
      'Where every signal knows its place,',
      'An anchor steady in the storm,',
      'With room to breathe and room for grace.',
    ].join('\n'),
  },
  {
    title: 'Harbor Cranes at Dusk',
    body: [
      'Steel giants silhouetted high,',
      'Against the violet ocean breeze,',
      'Containers stacked beneath the sky,',
      'Bound for the distant southern seas.',
      '',
      'Each manifest a careful thread,',
      'Connecting ports we never see,',
      'A thousand miles of water ahead,',
      'In quiet synchronicity.',
    ].join('\n'),
  },
] as const;

/**
 * Generates an array of deterministic {@link Poem} entries for local development and unit tests.
 *
 * @param count - Number of poems to generate (defaults to `20`).
 * @returns Readonly array of generated {@link Poem} objects numbered `1..count`.
 */
export function poemFactory(count = 20): readonly Poem[] {
  const safeCount = Math.max(0, Math.trunc(count));
  return Array.from({ length: safeCount }, (_, index): Poem => {
    const template = SEED_POEMS[index % SEED_POEMS.length] ?? {
      title: 'Untitled Reflection',
      body: 'Quiet lines written in the margin.',
    };
    const cycle = Math.floor(index / SEED_POEMS.length);
    const suffix = cycle > 0 ? ` (${String(cycle + 1)})` : '';
    return {
      number: index + 1,
      title: `${template.title}${suffix}`,
      body: template.body,
    };
  });
}
