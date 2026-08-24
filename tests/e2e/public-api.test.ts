import { describe, expect, it } from 'vitest';

import { evaluateQualityAssessment, gateIds } from '../../src/index.js';

describe('public API', () => {
  it('expone el catálogo de puertas y una evaluación utilizable por un consumidor', () => {
    const assessment = evaluateQualityAssessment({
      requestId: 'req-public-api',
      evaluatedAt: new Date('2026-08-22T10:00:00.000Z'),
      gates: [
        {
          id: gateIds[0],
          status: 'passed',
          disposition: 'blocking',
        },
      ],
    });

    expect(gateIds).toContain('codeql');
    expect(assessment.decision).toBe('pass');
  });
});
