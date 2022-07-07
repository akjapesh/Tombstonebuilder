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
  { top: 80, left: 80, height: 80, width: 80, type: "rect" }, //cx-120, cy-120 d-160, r-160
  { top: 48, left: 48, height: 48, width: 48, type: "circle" }, //cx-72, cy-72 d-96, r-96
  { top: 32, left: 32, height: 32, width: 32, type: "rect" }, //cx-48, cy-48 d-64, r-64
  { top: 144, left: 144, height: 144, width: 144, type: "circle" }, //cx-216, cy-216 d-288, r-288
  { top: 80, left: 144, height: 144, width: 144, type: "rect" }, //cx-216, cy-152 d-224, r-288
  { top: 144, left: 48, height: 144, width: 144, type: "circle" }, //cx-120, cy-216 d-288, r-192
  { top: 256, left: 64, height: 160, width: 112, type: "rect" }, //cx-120, cy-336 d-416, r-176
  { top: 128, left: 368, height: 160, width: 144, type: "circle" }, //cx-440, cy-208 d-288, r-504
  { top: 0, left: 0, height: 16, width: 192, type: "circle" }, //cx-96, cy-8 d-16, r-192
  { top: 0, left: 320, height: 80, width: 16, type: "circle" }, //cx-328, cy-8 d-80, r-336
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
  it("should correctly remove lines,shapes with 0 dimensions from canvas", () => {
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
  //1
  it("should correctly draw lines for targets that have centers aligned vertically", () => {
    const dummySketchRef = {
      current: {
        _fc: {
          _objects: CANVAS_STATE.slice(0, 2),
        },
      },
    };
    dummySketchRef.current._fc.add = jest.fn();
    dummySketchRef.current._fc.remove = jest.fn();
    connectCenterAlignLine(dummySketchRef, CANVAS_STATE[6]);
    expect(Line).toHaveBeenCalledWith([120, 336, 120, 120], { stroke: "red" });
  });
  //2
  it("should correctly draw lines for targets that have centers aligned horizontally", () => {
    const dummySketchRef = {
      current: {
        _fc: {
          _objects: CANVAS_STATE.slice(0, 4),
        },
      },
    };
    dummySketchRef.current._fc.add = jest.fn();
    dummySketchRef.current._fc.remove = jest.fn();
    connectCenterAlignLine(dummySketchRef, CANVAS_STATE[5]);
    expect(Line).toHaveBeenCalledWith([120, 216, 216, 216], { stroke: "red" });
  });
  //3
  it("should correctly draw lines for targets that have top edge aligned", () => {
    const dummySketchRef = {
      current: {
        _fc: {
          _objects: CANVAS_STATE,
        },
      },
    };
    dummySketchRef.current._fc.add = jest.fn();
    dummySketchRef.current._fc.remove = jest.fn();
    connectCenterAlignLine(dummySketchRef, CANVAS_STATE[4]);

    expect(Line).toHaveBeenCalledWith([216, 80, 120, 80], { stroke: "red" });
  });
  it("should correctly draw lines for targets that have left edge aligned", () => {
    const dummySketchRef = {
      current: {
        _fc: {
          _objects: CANVAS_STATE.slice(1, 3),
        },
      },
    };
    dummySketchRef.current._fc.add = jest.fn();
    dummySketchRef.current._fc.remove = jest.fn();
    connectCenterAlignLine(dummySketchRef, CANVAS_STATE[5]);

    expect(Line).toHaveBeenCalledWith([48, 216, 48, 72], { stroke: "red" });
  });
  it("should correctly draw lines for targets that have bottom edge aligned", () => {
    const dummySketchRef = {
      current: {
        _fc: {
          _objects: CANVAS_STATE.slice(5, 6),
        },
      },
    };
    dummySketchRef.current._fc.add = jest.fn();
    dummySketchRef.current._fc.remove = jest.fn();
    connectCenterAlignLine(dummySketchRef, CANVAS_STATE[7]);

    expect(Line).toHaveBeenCalledWith([440, 288, 120, 288], { stroke: "red" });
  });
  it("should correctly draw lines for targets that have right edge aligned", () => {
    const dummySketchRef = {
      current: {
        _fc: {
          _objects: CANVAS_STATE,
        },
      },
    };
    dummySketchRef.current._fc.add = jest.fn();
    dummySketchRef.current._fc.remove = jest.fn();
    connectCenterAlignLine(dummySketchRef, CANVAS_STATE[8]);

    expect(Line).toHaveBeenCalledWith([192, 8, 192, 216], { stroke: "red" });
  });
  it("should correctly draw lines for targets that have top-down edge aligned", () => {
    const dummySketchRef = {
      current: {
        _fc: {
          _objects: CANVAS_STATE.slice(0, 2),
        },
      },
    };
    dummySketchRef.current._fc.add = jest.fn();
    dummySketchRef.current._fc.remove = jest.fn();
    connectCenterAlignLine(dummySketchRef, CANVAS_STATE[9]);

    expect(Line).toHaveBeenCalledWith([328, 80, 120, 80], { stroke: "red" });
  });
  it("should correctly draw lines for targets that have down-top edge aligned", () => {
    const dummySketchRef = {
      current: {
        _fc: {
          _objects: CANVAS_STATE.slice(9, 10),
        },
      },
    };
    dummySketchRef.current._fc.add = jest.fn();
    dummySketchRef.current._fc.remove = jest.fn();
    connectCenterAlignLine(dummySketchRef, CANVAS_STATE[0]);

    expect(Line).toHaveBeenCalledWith([120, 80, 328, 80], { stroke: "red" });
  });
  it("should correctly draw lines for targets that have left-right edge aligned", () => {
    const dummySketchRef = {
      current: {
        _fc: {
          _objects: CANVAS_STATE.slice(1, 3),
        },
      },
    };
    dummySketchRef.current._fc.add = jest.fn();
    dummySketchRef.current._fc.remove = jest.fn();
    connectCenterAlignLine(dummySketchRef, CANVAS_STATE[6]);

    expect(Line).toHaveBeenCalledWith([64, 336, 64, 48], { stroke: "red" });
  });
  it("should correctly draw lines for targets that have right-left edge aligned", () => {
    const dummySketchRef = {
      current: {
        _fc: {
          _objects: CANVAS_STATE.slice(6, 7),
        },
      },
    };
    dummySketchRef.current._fc.add = jest.fn();
    dummySketchRef.current._fc.remove = jest.fn();
    connectCenterAlignLine(dummySketchRef, CANVAS_STATE[2]);

    expect(Line).toHaveBeenCalledWith([64, 48, 64, 336], { stroke: "red" });
  });
});
