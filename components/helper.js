function cla() {
  var a = arguments
  var l = a.length
  var i = 0
  var str = ""
  while(i<l){
    str+=a[i]+(i<l-1?" ":"")
    i++
  }

  return str
}

export {cla}
