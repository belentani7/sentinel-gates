import type { GateEvidence, GateResult, QualityAssessment } from '../domain/quality-gate.js';

export interface GateInput {
  readonly id: GateResult['id'];
  readonly status: GateResult['status'];
  readonly disposition: GateResult['disposition'];
  readonly evidence?: readonly GateEvidence[];
}

export interface AssessmentInput {
  readonly requestId: string;
  readonly evaluatedAt: Date;
  readonly gates: readonly GateInput[];
}

function assertNonBlank(value: string, field: string): void {
  if (value.trim().length === 0) {
    throw new Error(`${field} must not be blank`);
  }
}

function assertUniqueGateIds(gates: readonly GateInput[]): void {
  const ids = new Set<string>();

  for (const gate of gates) {
    if (ids.has(gate.id)) {
      throw new Error(`gate id must be unique: ${gate.id}`);
    }

    ids.add(gate.id);
  }
}

function determineDecision(results: readonly GateResult[]): QualityAssessment['decision'] {
  if (results.some((result) => result.status === 'failed' && result.disposition === 'blocking')) {
    return 'block';
  }

  if (results.some((result) => result.status === 'failed' || result.status === 'skipped')) {
    return 'warn';
  }

  return 'pass';
}

export function evaluateQualityAssessment(input: AssessmentInput): QualityAssessment {
  assertNonBlank(input.requestId, 'requestId');
  assertUniqueGateIds(input.gates);

  const results = input.gates.map(
    (gate): GateResult => ({
      id: gate.id,
      status: gate.status,
      disposition: gate.disposition,
      evidence: gate.evidence ?? [],
    }),
  );

  return {
    requestId: input.requestId,
    evaluatedAt: input.evaluatedAt.toISOString(),
    decision: determineDecision(results),
    results,
  };
}
