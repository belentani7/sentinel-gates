import { describe, expect, it } from 'vitest';

import { evaluateQualityAssessment } from '../../src/application/evaluate-quality-assessment.js';

describe('evaluateQualityAssessment', () => {
  const evaluatedAt = new Date('2026-08-22T10:00:00.000Z');

  it('aprueba cuando todas las puertas obligatorias pasan', () => {
    const assessment = evaluateQualityAssessment({
      requestId: 'req-approve',
      evaluatedAt,
      gates: [
        { id: 'biome', status: 'passed', disposition: 'blocking' },
        { id: 'typecheck', status: 'passed', disposition: 'blocking' },
      ],
    });

    expect(assessment).toMatchObject({
      requestId: 'req-approve',
      evaluatedAt: '2026-08-22T10:00:00.000Z',
      decision: 'pass',
    });
    expect(assessment.results).toHaveLength(2);
    expect(assessment.results[0]?.evidence).toEqual([]);
  });

  it('bloquea ante un fallo en una puerta obligatoria', () => {
    const assessment = evaluateQualityAssessment({
      requestId: 'req-block',
      evaluatedAt,
      gates: [
        { id: 'secret-scan', status: 'failed', disposition: 'blocking' },
        { id: 'mutation-tests', status: 'passed', disposition: 'advisory' },
      ],
    });

    expect(assessment.decision).toBe('block');
  });

  it('advierte ante un fallo advisory y preserva la evidencia', () => {
    const assessment = evaluateQualityAssessment({
      requestId: 'req-warn-failed',
      evaluatedAt,
      gates: [
        { id: 'biome', status: 'passed', disposition: 'blocking' },
        {
          id: 'mutation-tests',
          status: 'failed',
          disposition: 'advisory',
          evidence: [{ name: 'mutation report', uri: 'reports/mutation.html' }],
        },
      ],
    });

    expect(assessment.decision).toBe('warn');
    expect(assessment.results[1]?.evidence).toEqual([
      { name: 'mutation report', uri: 'reports/mutation.html' },
    ]);
  });

  it('advierte ante una puerta advisory omitida aunque el resto apruebe', () => {
    const assessment = evaluateQualityAssessment({
      requestId: 'req-warn-skipped',
      evaluatedAt,
      gates: [
        { id: 'biome', status: 'passed', disposition: 'blocking' },
        { id: 'e2e-tests', status: 'skipped', disposition: 'advisory' },
      ],
    });

    expect(assessment.decision).toBe('warn');
  });

  it('rechaza entradas que impedirían una auditoría fiable', () => {
    expect(() =>
      evaluateQualityAssessment({
        requestId: ' ',
        evaluatedAt,
        gates: [],
      }),
    ).toThrow('requestId must not be blank');

    expect(() =>
      evaluateQualityAssessment({
        requestId: 'req-duplicate',
        evaluatedAt,
        gates: [
          { id: 'biome', status: 'passed', disposition: 'blocking' },
          { id: 'biome', status: 'passed', disposition: 'blocking' },
        ],
      }),
    ).toThrow('gate id must be unique: biome');
  });
});
