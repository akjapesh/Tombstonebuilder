import {calculateCenter} from "../centerAlign";

const testTargets=[
    [{top:50,left:100,height:200,width:100,type:"rect"},{centerX:144,centerY:152,top:48,left:96,right:192,down:256}],
    [{top:0,left:96,height:16,width:32,type:"rect"},{centerX:112,centerY:8,top:0,left:96,right:128,down:16}],
    [{top:34,left:67,height:66,width:26,type:"circle"},{centerX:80,centerY:64,top:32,left:64,right:96,down:96}],
    [{top:44,left:44,height:44,width:44,type:"circle"},{centerX:72,centerY:72,top:48,left:48,right:96,down:96}]
]

it("calculates center and edge points ",()=>{
    testTargets.forEach((testTarget)=>{expect(calculateCenter(testTarget[0])).toEqual(testTarget[1]);})

})