var PAGE_MAX_WIDTH = 750
var BASE_FONT_SIZE = 50;

//  在窗口各宽情况时，动态计算出html的font-size
(() => {
  var DOC_ROOT_STYLE = document.documentElement.style
  var timer = null

  window.addEventListener('load', resizeFontSize)
  window.addEventListener('resize', () => {
    clearTimeout(timer)
    timer = setTimeout(resizeFontSize, 100)
  })
  timer = setTimeout(resizeFontSize, 300)
  resizeFontSize()

  function resizeFontSize () {
    DOC_ROOT_STYLE.fontSize = Math.min((document.documentElement.clientWidth) / PAGE_MAX_WIDTH * BASE_FONT_SIZE, BASE_FONT_SIZE) + 'px'
  }
})()

