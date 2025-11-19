import { useRef, useState, useEffect } from 'react'
import { MatchCard } from './MatchCard'
import type { MatchCardProps } from './MatchCard'
import './MatchCardSlider.scss'

type MatchCardSliderProps = {
  matches: Omit<MatchCardProps, 'className'>[]
  className?: string
}

export function MatchCardSlider({ matches, className = '' }: MatchCardSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (!sliderRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }

  useEffect(() => {
    checkScrollButtons()
    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener('scroll', checkScrollButtons)
      window.addEventListener('resize', checkScrollButtons)
      return () => {
        slider.removeEventListener('scroll', checkScrollButtons)
        window.removeEventListener('resize', checkScrollButtons)
      }
    }
  }, [matches])

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return

    const cardWidth = sliderRef.current.querySelector('.match-card')?.clientWidth || 0
    const gap = 16
    const scrollAmount = cardWidth + gap

    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div className={`match-card-slider ${className}`}>
      {canScrollLeft && (
        <button
          className="match-card-slider__button match-card-slider__button--left"
          onClick={() => scroll('left')}
          aria-label="Rolar para esquerda"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <div className="match-card-slider__container" ref={sliderRef}>
        <div className="match-card-slider__track">
          {matches.map((match, index) => (
            <MatchCard key={`${match.sport}-${match.matchNumber}-${index}`} {...match} />
          ))}
        </div>
      </div>

      {canScrollRight && (
        <button
          className="match-card-slider__button match-card-slider__button--right"
          onClick={() => scroll('right')}
          aria-label="Rolar para direita"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

