import {calculateCenter, clearCenterAlignLines} from "../centerAlign";

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

testTargets1.forEach((testTarget)=>{it("calculates center and edge points ",()=>{
    expect(calculateCenter(testTarget[0])).toEqual(testTarget[1]);
})})


// test("draws line ", () => {
//     const dummySketchRef = {
//       current: { _fc: { _objects: [testTargets[0][0], testTargets[1][0]] } },
//     };
//     dummySketchRef.current._fc.add = jest.fn();
//     jest.mock("fabric", () => {
//       return {
//         Line: (...args) => args,
//       };
//     });
//     expect(connectCenterAlignLine(testTargets[0][0]).toEqual());
//   });

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