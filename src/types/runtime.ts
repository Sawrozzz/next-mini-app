export interface SDKBridge {
  invoke<T = unknown>(action: string, payload?: unknown): Promise<T>;
  emit(event: string, payload?: unknown): void;
  subscribe(event: string, callback: (payload?: unknown) => void): () => void;
}

export interface Runtime {
  sdk: SDKBridge;
  config: {
    tenantId?: string;
    locale?: string;
    theme?: string;
    [key: string]: unknown;
  };
}

export interface AppInstance {
  unmount(): void;
}
