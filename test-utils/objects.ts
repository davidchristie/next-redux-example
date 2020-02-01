export const itShouldHaveMethod = <T>(instance: T, method: keyof T) => {
  it(`Should have ${method} method`, () => {
    expect(instance[method]).toBeInstanceOf(Function);
  });
};
