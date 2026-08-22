import { afterEach, describe, expect, it, vi } from 'vitest';

import { JsonLineLogger } from '../../src/adapters/structured-logger.js';

describe('JsonLineLogger', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('emite una sola línea JSON con requestId y atributos explícitos', () => {
    const write = vi.spyOn(process.stdout, 'write').mockReturnValue(true);
    const logger = new JsonLineLogger();

    logger.emit({
      event: 'quality_gate.evaluated',
      level: 'info',
      requestId: 'req-observe',
      timestamp: '2026-08-22T10:00:00.000Z',
      attributes: { decision: 'pass', resultCount: 2 },
    });

    expect(write).toHaveBeenCalledWith(
      '{"event":"quality_gate.evaluated","level":"info","requestId":"req-observe","timestamp":"2026-08-22T10:00:00.000Z","attributes":{"decision":"pass","resultCount":2}}\n',
    );
  });
});
