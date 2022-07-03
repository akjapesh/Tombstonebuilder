import {calculateCenter, clearCenterAlignLines,connectCenterAlignLine,tester} from "../centerAlign";
import {fabric} from "fabric";

const testTargets1=[
    [{top:50,left:100,height:200,width:100,type:"rect"},{centerX:144,centerY:152,top:48,left:96,right:192,down:256}],
    [{top:0,left:96,height:16,width:32,type:"rect"},{centerX:112,centerY:8,top:0,left:96,right:128,down:16}],
    [{top:34,left:67,height:66,width:26,type:"circle"},{centerX:80,centerY:64,top:32,left:64,right:96,down:96}],
    [{top:44,left:44,height:44,width:44,type:"circle"},{centerX:72,centerY:72,top:48,left:48,right:96,down:96}]
    
]

const testTargets2=[
    {top:44,left:44,height:0,width:44,type:"rect"},
    {top:44,left:44,height:44,width:44,type:"line"},
    {top:44,left:44,height:0,width:0,type:"rect"},
    {top:44,left:44,radius:0,type:"circle"},
]

const testTargets3=[
    {top:80,left:80,height:80,width:80,type:"rect"},
    {top:48,left:48,height:48,width:48,type:"circle"},
    {top:32,left:32,height:32,width:32,type:"rect"},
    {top:144,left:144,height:144,width:144,type:"circle"},
    {top:80,left:144,height:144,width:144,type:"rect"},
    {top:144,left:48,height:144,width:144,type:"circle"},
]

testTargets1.forEach((testTarget)=>{it("calculates center and edge points ",()=>{
    expect(calculateCenter(testTarget[0])).toEqual(testTarget[1]);
})})


test("clear lines ",()=>{
    const dummySketchRef={
        current : {
            _fc:{
                _objects:[
                    testTargets2[0],
                    testTargets2[1],
                    testTargets2[2],
                    testTargets2[3],
                ]
            }
        }
    };
    dummySketchRef.current._fc.remove=jest.fn();
    const testFunc=dummySketchRef.current._fc.remove
    clearCenterAlignLines(dummySketchRef);
    expect(testFunc).toHaveBeenCalledTimes(4);
})

test("draws line ", () => {
    jest.mock("fabric", () => ({ Line: (...args) => args}));
    const dummySketchRef = {
      current: {
        _fc: {
          _objects: [
            testTargets3[0],
            testTargets3[1],
            testTargets3[2],
            testTargets3[3],
          ],
        },
      },
    };
    dummySketchRef.current._fc.add = jest.fn((value)=>value);
    dummySketchRef.current._fc.remove=jest.fn()
    expect(connectCenterAlignLine(dummySketchRef,testTargets3[4])).toEqual(3);
  });

test("testerrrrr ",()=>{
    jest.mock("fabric",()=>({Line:jest.fn(()=>3)}));
    const dumty=testTargets3[0];
    expect(tester(dumty)).toBe(3);
})