var time, _study_data,
  enable_local = document.querySelector('#enable_local'),
  voices = document.querySelector('#voices'),
  article = document.querySelector('#article'),
  audio = document.querySelector('#audio'),
  sections = document.querySelector('#sections'),
  player = document.querySelector('#player');


player.btn = document.querySelector('#player_btn')
  player.btn.onmouseup = player.btn.ontouchend = function() {
  player.style.display = 'none'
  article.style.display = 'block'
  audio.finish_play_all()
  return false
}

change_voice = async function functionName(self) {
  var speech = self.id == 'voices_zh'? _speech.zh:_speech.en
  speech.index = speech.index < speech.voices.length - 1 ? speech.index + 1 : 0
  speech.voice = speech.voices[speech.index]
  speech.lang = speech.voice.lang
  self.innerText = speech.voice.name
}

var _voices, _speech = {}
var get_voices = function() {
  _voices = speechSynthesis.getVoices()
  if (_voices.length > 0) voices_init()
  if (speechSynthesis.onvoiceschanged == null) speechSynthesis.onvoiceschanged = get_voices
}
voices_init = function() {

  enable_local.checked = audio.local = false

  var _zh = _speech.zh = new SpeechSynthesisUtterance()
  var _en = _speech.en = new SpeechSynthesisUtterance()
  _zh.voices = _voices.filter((item) => {
    if (item.lang.indexOf("zh") > -1 && item.localService)
      return item
  })
  _en.voices = _voices.filter((item) => {
    if (item.lang.indexOf("en") > -1 && item.localService)
      return item
  })
  var _default = _zh.voices[0]

  voices_zh.innerText = `${  _default.name}`
  _zh.lang = _default.lang
  _zh.voice = _default
  _zh.index = 0
  var _default = _en.voices[0]
  _en.lang = _default.lang
  _en.voice = _default
  _en.index = 0
  voices_en.innerText = `${_default.name}`
}

get_voices()

player.content = document.querySelector('#player_content')
async function init() {
  _study_data = []
  res = await fetch('source.json')
  _texts = await res.json()
  _texts.forEach((texts, i) => _study_data[i] = {
    texts
  })

  function createSections() {
    let i = 0,
      html = ''
    while (i < _study_data.length) {
      html += `<li id='${i}'><a onclick="event.preventDefault();select(event,this,${i})" href="#"> ${i+1}</a></li>`
      i++
    }
    sections.innerHTML = `<ul> ${html}</ul>`
  }
  createSections()
  load(0)
}
init()
async function load(i) {
  //loading
  document.body.classList.add('loading')
  if (_study_data[i].times == undefined) {
    res = await fetch(`${i}.mp3`)
    _study_data[i].blob = await res.blob()
    res = await fetch(`${i}.json`)
    _study_data[i].times = await res.json()
  }
  document.body.classList.remove('loading')
  audio.src = window.URL.createObjectURL(_study_data[i].blob)
  _study_data.cur = i

  //loaded
  function render(i) {
    var html = '',
      arr
    arr = _study_data[i].texts
    i = 0
    while (i < arr.length) {
      let item = arr[i]
      html += `
            <p data-lang="en" data-index="${i}" onmousedown="article.touchstart(event,this)" onmouseup="article.touchend(event,this)" ontouchstart="article.touchstart(event,this)" ontouchend="article.touchend(event,this)">${item.en}</p>

            <p data-lang="zh" data-index="${i}" onmousedown="article.touchstart(event,this)" onmouseup="article.touchend(event,this)" ontouchstart="article.touchstart(event,this)" ontouchend="article.touchend(event,this)">${item.zh}</p>
            `
      i++
    }
    article.innerHTML = html
  }
  render(i)
}

function select(event, self, index) {
  load(index)
}
audio.play_text = function(lang, text) {
  speech = lang == 'zh' ? _speech.zh : _speech.en
  speechSynthesis.pending && speechSynthesis.cancel()
  speechSynthesis.speaking && speechSynthesis.pause()
  speech.text = text
  speechSynthesis.speak(speech)
}
audio.pause_text = function() {
  speechSynthesis.pause()
}

audio.play_one = function(index, lang) {
  index = index.length?parseInt(index):index
  var cur = _study_data.cur
  var times = _study_data[cur].times
  var item = _study_data[_study_data.cur].texts[index]
  if (lang == 'en') {
    if (this.local)
      this.play_text('en', item.en)
    else{
      this.currentTime = times[index].timeSeconds
      this.play()
    }
  }
  else
    this.play_text('zh', item.zh)

  this.currentIndex = index
}
audio._play_all = false
audio.play_all = function play_all(index) {
  audio.play_one(index, 'en')
  audio._play_all = true
}
audio.finish_play_all = function() {
  audio.pause()
  audio._play_all = false
  audio.fresh = null
}
audio.which_one = function(time) {
  var times = _study_data[_study_data.cur].times
  var i = 0
  while (i < times.length) {
    time1 = times[i]
    if(time<time1.timeSeconds)
      return (time1.timeSeconds-1<time)?{index:i-1,enter:true}:{index:i-1,enter:false}
    i++
  }

}
audio.which_time = function(index) {
  var times = _study_data[_study_data.cur].times
  return times[index].timeSeconds
}
this.currentTime = 0
this.currentIndex = 0
audio.ontimeupdate = function() {
  this.currentIndex = this.currentIndex?this.currentIndex:0
  var times = _study_data[_study_data.cur].times
  if(!times)return
  var time = audio.currentTime
  var item = audio.which_one(time)
  if (audio._play_all) {
    audio.fresh && audio.fresh(item.index)
  }
  else if (this.currentTime>times[this.currentIndex+1].timeSeconds-1&&this.currentTime<times[this.currentIndex+1].timeSeconds) {
    audio.pause()
    this.currentIndex++
    this.currentTime = times[this.currentIndex].timeSeconds
  }
}



function open_player(index, method) {
  if (player.rnd_data) player.rnd_data = null

  function randomize() {
    var data = []
    var arr = []
    var i = 0
    while (i < player.current_texts.length) data.push(i++)
    while (data.length > 1) {
      let r = Math.floor(Math.random() * data.length)
      arr.push(data.splice(r, 1)[0])
    }
    arr.push(data[0])
    return arr
  }
  player.index = index
  player.method = method
  player.style.display = 'flex'
  article.style.display = 'none'
  player.current_texts = _study_data[_study_data.cur].texts
  if (method == 'random') {
    player.rnd_data = randomize()
    index = player.rnd_data[index]
  }

  player.content.innerHTML = `${player.current_texts[index].en}`
  if (method == 'play_all') {
    audio.currentIndex = 0
    audio._play_all = true
    audio.fresh = function(_index) {
      player.index = _index
      player.render('en')
    }
  }
}
player.onmousedown = player.ontouchstart = touch_event.touchstart
player.onmouseup = player.ontouchend = touch_event.touchend
player.doclicking = function(e) {
  if (e.target == player.btn) return
  switch (this.method) {
    case 'play_all':
      audio.paused ? audio.play() : audio.pause()
      break
    case 'play_zh':
      audio.play_one(player.index, 'zh')
      break;
    case 'random':
      audio.play_one(player.rnd_data[player.index], 'en')
      break;
    default:
      audio.play_one(player.index, 'en')
  }
}
player.doflowing = function() {
  switch (this.method) {
    case 'play_all':
      audio.play_all(player.index)
      break
    default:
      audio.play_one(player.index, 'en')
  }
}
player.dochanging = function(_, change) {
  change < 0 ? player.index++ : player.index--
  if (player.index < 0 || (player.index > player.current_texts.length - 1)) player.index = 0
  switch (player.method) {
    case 'play_all':
      audio.currentTime = audio.which_time(player.index)
      break;
    case 'random':
      audio.currentTime = audio.which_time(player.rnd_data[player.index])
  }
  player.render("en")
}
player.render = function(lang) {
  lang = lang ? lang : 'en'
  var index = this.rnd_data ? this.rnd_data[this.index] : this.index
  var item = this.current_texts[index]
  var content = lang == 'en' ? item.en : item.zh
  this.content.innerHTML = `${content}`
}
article.do_clicking = function(event, self) {
  audio.play_one(self.dataset.index, self.dataset.lang)
}
article.do_flowing = function(event, self) {
  open_player(this.dataset.index, this.dataset.lang == 'en' ? 'play_en' : 'play_zh')
}
article.touchstart = function(e, self) {
  self.doclicking = article.do_clicking
  self.doflowing = article.do_flowing
  touch_event.touchstart.call(self, e)
}
article.touchend = function(e, self) {
  touch_event.touchend.call(self, e)
}


