var touch_event = {
	touchstart : function (e) {
	if(e.type=='touchsart'&&e.changedTouches.length>1)return
        self = this
        self.sy = (e.type=="mousedown"?e.screenY:e.changedTouches[0].screenY)
        self.s = Date.now()
        self.timer = setTimeout(function () {
          self.doflowing&&self.doflowing(e,self)
          self.timer = null
        },750)
       return false
	},
       touchend : function (e) {
            if(e.type=='touchend'&&e.changedTouches.length>1)return
        	var self = this
        	if (self.timer) {
      	    var change = (e.type=="mouseup"?e.screenY:e.changedTouches[0].screenY)-self.sy
      	    if (Math.abs(change)>20) {
      	      self.dochanging&&self.dochanging(self,change)
      	    }
      	    else{
      	      t = Date.now()-self.s
      	      // alert(t)
      	      if(t>40)
      	      self.doclicking&&self.doclicking(e,self)
      	    }
      	    clearTimeout(self.timer)
      	    self.timer = null
	       }

	        return false
     }
}


