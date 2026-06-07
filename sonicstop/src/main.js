import EmblaCarousel from 'embla-carousel'
import './style.css'

const mainEl = document.getElementById('embla-main')
const thumbsEl = document.getElementById('embla-thumbs')

if (mainEl && thumbsEl) {
  const mainCarousel = EmblaCarousel(mainEl, {
    loop: false,
    align: 'start',
    dragFree: false,
  })

  let thumbsCarousel = null

  const initThumbsCarousel = () => {
    if (window.innerWidth < 768) {
      if (!thumbsCarousel) {
        thumbsCarousel = EmblaCarousel(thumbsEl, {
          containScroll: 'keepSnaps',
          dragFree: true,
          axis: 'x',
        })
      }
    } else {
      if (thumbsCarousel) {
        thumbsCarousel.destroy()
        thumbsCarousel = null
      }
    }
  }

  initThumbsCarousel()
  window.addEventListener('resize', initThumbsCarousel)

  const thumbButtons = thumbsEl.querySelectorAll('.gallery__thumb')

  const selectThumb = (index) => {
    thumbButtons.forEach((btn, i) => {
      btn.classList.toggle('gallery__thumb--selected', i === index)
    })
    thumbsCarousel?.scrollTo(index)
  }

  selectThumb(mainCarousel.selectedScrollSnap())

  mainCarousel.on('select', () => {
    selectThumb(mainCarousel.selectedScrollSnap())
  })

  thumbButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.index)
      mainCarousel.scrollTo(index)
    })
  })

  const wrapper = mainEl.parentElement
  const prevBtn = wrapper.querySelector('.gallery__arrow--prev')
  const nextBtn = wrapper.querySelector('.gallery__arrow--next')
  prevBtn?.addEventListener('click', () => mainCarousel.scrollPrev())
  nextBtn?.addEventListener('click', () => mainCarousel.scrollNext())
}
