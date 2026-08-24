export const gateIds = [
  'architecture-review',
  'biome',
  'build',
  'codeql',
  'dependency-audit',
  'e2e-tests',
  'integration-tests',
  'mutation-tests',
  'secret-scan',
  'typecheck',
  'unit-tests',
] as const;

export type GateId = (typeof gateIds)[number];

export type GateStatus = 'passed' | 'failed' | 'skipped';

export type GateDisposition = 'blocking' | 'advisory';

export interface GateEvidence {
  readonly name: string;
  readonly uri: string;
}

export interface GateResult {
  readonly id: GateId;
  readonly status: GateStatus;
  readonly disposition: GateDisposition;
  readonly evidence: readonly GateEvidence[];
}

export interface QualityAssessment {
  readonly requestId: string;
  readonly evaluatedAt: string;
  readonly decision: 'pass' | 'warn' | 'block';
  readonly results: readonly GateResult[];
}
