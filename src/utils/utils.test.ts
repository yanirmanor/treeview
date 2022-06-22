import { describe, expect, it, vi } from "vitest";
import { getNodeDepth, randomNumBetween } from ".";

describe("random numbers between 2 and 5", () => {
  const spy = vi.spyOn(global.Math, "random");
  it("Should get 2 when random return 0", () => {
    spy.mockReturnValue(0.1);
    const randomNumber = randomNumBetween(2, 5);
    expect(randomNumber).toBe(2);
  });
  it("Should get 5 when random return 3", () => {
    spy.mockReturnValue(0.9);
    const randomNumber = randomNumBetween(2, 5);
    expect(randomNumber).toBe(5);
  });
});

describe("Node depth", () => {
  it('Should get 1 when nodeId is "0"', () => {
    const nodeDepth = getNodeDepth("0");
    expect(nodeDepth).toBe(1);
  });
  it('Should get 2 when nodeId is "0.0"', () => {
    const nodeDepth = getNodeDepth("0.0");
    expect(nodeDepth).toBe(2);
  });
  it('Should get 3 when nodeId is "0.0.0"', () => {
    const nodeDepth = getNodeDepth("0.0.0");
    expect(nodeDepth).toBe(3);
  });
});
