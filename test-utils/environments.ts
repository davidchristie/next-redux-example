const environments = ["development", "production", "test"];

export const describeAllEnvironments = (fn: (environment: string) => void) => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    const mockEnv = { ...originalEnv };
    delete mockEnv.NODE_ENV;
    process.env = mockEnv;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe.each(environments.map(environment => [environment]))(
    'In Environment: "%s"',
    environment => {
      (process.env as any).NODE_ENV = environment;

      fn(environment);
    }
  );
};
