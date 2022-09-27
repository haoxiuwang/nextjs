
import {useState,useEffect,useRef} from "react"
import event_all from "../libs/event_all"
// var store = {
//     scale: 1
// }
// var start = (event)=>{
//   // event.preventDefault();
//   var touches = event.touches;
//
//   var events = touches[0];
//   var events2 = touches[1];
//
//   store.slide = true
//
//   // 第一个触摸点的坐标
//   store.pageX = events.pageX;
//   store.pageY = events.pageY;
//   store.changed = event.changedTouches[0]
//   store.moveable = true;
//
//   if (events2) {
//       store.slide = false
//       store.pageX2 = events2.pageX;
//       store.pageY2 = events2.pageY;
//   }
//
//   store.originScale = store.scale || 1;
// }
// var end = (event)=>{
//   // event.preventDefault();
//
//
//   if (!store.slide) {
//       return;
//   }
//
//
//   var events = event.changedTouches[0];
//
//   var awayX = events.pageX-store.changed.pageX
//   var awayY = events.pageY-store.changed.pageY
//   // event.target.innerText = JSON.stringify({awayY,awayX})
//   var absX = Math.abs(awayX)
//   var absY = Math.abs(awayY)
//   if(absY>40||absX>40)
//     event.target.innerText = absX>absY?awayX:awayY
//   else
//     event.target.innerText = "click"
//
//
// }
// var move = (event)=>{
//       event.preventDefault();
//       if (!store.moveable) {
//           return;
//       }
//
//
//
//       var touches = event.touches;
//       var events = touches[0];
//       var events2 = touches[1];
//       // 双指移动
//       if (events2) {
//           // 第2个指头坐标在touchmove时候获取
//           if (!store.pageX2) {
//               store.pageX2 = events2.pageX;
//           }
//           if (!store.pageY2) {
//               store.pageY2 = events2.pageY;
//           }
//
//           // 获取坐标之间的举例
//           var getDistance = function (start, stop) {
//               return Math.hypot(stop.x - start.x, stop.y - start.y);
//           };
//           // 双指缩放比例计算
//           var zoom = getDistance({
//               x: events.pageX,
//               y: events.pageY
//           }, {
//               x: events2.pageX,
//               y: events2.pageY
//           }) /
//           getDistance({
//               x: store.pageX,
//               y: store.pageY
//           }, {
//               x: store.pageX2,
//               y: store.pageY2
//           });
//           // 应用在元素上的缩放比例
//           var newScale = store.originScale * zoom;
//           // 最大缩放比例限制
//           if (newScale > 3) {
//               newScale = 3;
//           }
//           // 记住使用的缩放值
//           store.scale = newScale;
//           // 图像应用缩放效果
//           console.log(newScale);
//           newScale = newScale<1?1:newScale
//           newScale = newScale>3?3:newScale
//           event.target.innerText = 20*newScale+"px"
//           event.target.style.fontSize = 20*newScale+"px"
//       }
// }
// var menu = (event)=>{
//   event.preventDefault()
//   event.target.innerText = "menu"
// }
export default function Test() {
  const card = useRef(null)
  useEffect(()=>{
    // card.current.addEventListener("touchmove",move,{passive:false})
    // card.current.addEventListener("touchstart",start)
    // card.current.addEventListener("touchend",end)
    // card.current.addEventListener("contextmenu",()=>alert("menu"))

    event_all({card,
      left:(x)=>{alert("left")},
      up:(y)=>{alert("left")},
      scale:(zoom)=>{alert(zoom)},
      click:()=>{alert("click")},
      menu:()=>{alert("menu")}
    })
  },[])
  return <div ref={card} className="fixed inset-0 flex place-content-center place-items-center select-none">hello</div>
}
