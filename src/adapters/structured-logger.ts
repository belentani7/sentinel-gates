export interface LogEvent {
  readonly event: string;
  readonly level: 'info' | 'warn' | 'error';
  readonly requestId: string;
  readonly timestamp: string;
  readonly attributes?: Readonly<Record<string, string | number | boolean>>;
}

export interface StructuredLogger {
  emit(event: LogEvent): void;
}

export class JsonLineLogger implements StructuredLogger {
  emit(event: LogEvent): void {
    process.stdout.write(`${JSON.stringify(event)}\n`);
  }
}
