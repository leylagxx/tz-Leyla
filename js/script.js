var levels = document.querySelector('.levels')
var progress = document.querySelector('.progress')
var knob = document.querySelector('.knob')

var levelsBox, knobBox, points, min, max

knob.addEventListener('mousedown', function(e) {
  e.preventDefault()

  window.addEventListener('mousemove', dragging)
  window.addEventListener('mouseup', drop)

  knob.style.transition = '0s'
  progress.style.transition = '0s'

  var knobBox = knob.getBoundingClientRect()
  // координата нажатия мыши относительно ручки
  var shift = e.x - knobBox.left;

  function dragging(e) {
    var x = 0

    // не даем выйти за границы
    if (e.x < min) x = min
    else if (e.x > max) x = max
    else x = e.x

    X = x - shift - levelsBox.left
    knob.style.transform = `translateX(${X}px) rotate(-45deg)`
    progress.style.width = X + knobBox.width / 2 + 'px'
  }

  function drop(e) {
    // ближайшее число в массиве точек к текущей координате ручки
    var closest = getClosest(X)

    knob.style.transition = '0.5s'
    progress.style.transition = '0.5s'

    // перемащаем к полученной ближайшей точке
    knob.style.transform = `
    	translateX(${closest - knobBox.width / 2.7}px)
    	rotate(-45deg)
     `
    progress.style.width = closest + 'px'

    window.removeEventListener('mousemove', dragging)
    window.removeEventListener('mousemove', drop)
  }
})

function getClosest(v) {
  return points.reduce((prev, curr) =>
    (Math.abs(curr - v) < Math.abs(prev - v) ? curr : prev)
  )
}

function init() {
  levelsBox = levels.getBoundingClientRect()
  knobBox = knob.getBoundingClientRect()

  /* ширина промежутков */
  points = [
    0,
    levelsBox.width * 0.2,
    levelsBox.width * 0.45,
    levelsBox.width
  ]

  min = levelsBox.left,
    max = levelsBox.right,

     knob.style.transform = `translateX(-${knobBox.width / 2.7}px) rotate(-45deg)`
  progress.style.width = 0
}

// при изменении ширины окна пересчитываем
// некоторые размеры для корректного отображения
window.onresize = init

init()