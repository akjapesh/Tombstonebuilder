import {
  calculateCenter,
  clearCenterAlignLines,
  connectCenterAlignLine,
} from "../centerAlign";
import { Line } from "fabric";

jest.mock("fabric", () => ({
  ...jest.requireActual("fabric"),
  Line: jest.fn(),
}));

const CANVAS_STATE_WITH_LINES = [
  { top: 44, left: 44, height: 0, width: 44, type: "rect" },
  { top: 44, left: 44, height: 44, width: 44, type: "line" },
  { top: 44, left: 44, height: 0, width: 0, type: "rect" },
  { top: 44, left: 44, radius: 0, type: "circle" },
];

const CANVAS_STATE = [
  { top: 80, left: 80, height: 80, width: 80, type: "rect" },
  { top: 48, left: 48, height: 48, width: 48, type: "circle" },
  { top: 32, left: 32, height: 32, width: 32, type: "rect" },
  { top: 144, left: 144, height: 144, width: 144, type: "circle" },
  { top: 80, left: 144, height: 144, width: 144, type: "rect" },
  { top: 144, left: 48, height: 144, width: 144, type: "circle" },
];

describe("calculateCenter", () => {
  it("should correctly calculate center and boundaries for rect", () => {
    const rectTarget = {
      top: 50,
      left: 100,
      height: 200,
      width: 100,
      type: "rect",
    };
    expect(calculateCenter(rectTarget)).toEqual({
      centerX: 144,
      centerY: 152,
      top: 48,
      left: 96,
      right: 192,
      down: 256,
    });
  });
  it("should correctly calculate center and boundaries for circle", () => {
    const circleTarget = {
      top: 34,
      left: 67,
      height: 66,
      width: 26,
      type: "circle",
    };

    expect(calculateCenter(circleTarget)).toEqual({
      centerX: 80,
      centerY: 64,
      top: 32,
      left: 64,
      right: 96,
      down: 96,
    });
  });
});

describe("clearCenterAlignLines", () => {
  it("should correctly remove lines from canvas", () => {
    const dummySketchRef = {
      current: {
        _fc: {
          _objects: CANVAS_STATE_WITH_LINES,
        },
      },
    };
    dummySketchRef.current._fc.remove = jest.fn();
    const testFunc = dummySketchRef.current._fc.remove;
    clearCenterAlignLines(dummySketchRef);
    expect(testFunc).toHaveBeenCalledTimes(4);
  });
});

describe("connectCenterAlignLine", () => {
  it("should correctly draw lines for targets that have centers aligned horizontally", () => {
    const dummySketchRef = {
      current: {
        _fc: {
          _objects: CANVAS_STATE.slice(0, 4),
        },
      },
    };
    dummySketchRef.current._fc.add = jest.fn((value) => value);
    dummySketchRef.current._fc.remove = jest.fn();
    connectCenterAlignLine(dummySketchRef, CANVAS_STATE[4]);

    expect(Line).toHaveBeenCalledWith([], {});
  });
});
