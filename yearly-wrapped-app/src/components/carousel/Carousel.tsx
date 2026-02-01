import React from 'react';
import { useState, useEffect } from 'react';

import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';

import './carousel.css';

interface CarouselProps {
  children: React.ReactNode;  
  onIndexChange?: (index: number) => void;
  initialIndex?: number;
}

const Carousel: React.FC<CarouselProps> = ({children, onIndexChange, initialIndex }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, watchDrag: false });
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedSnap, setSelectedSnap] = useState(initialIndex)

  const navigateToPrevious = () => emblaApi?.scrollPrev();
  const navigateToNext = () => emblaApi?.scrollNext();

  const navigateTo = (index: number) => emblaApi?.scrollTo(index);
  const setupSnaps = (emblaApi: EmblaCarouselType) => setScrollSnaps(emblaApi.scrollSnapList());
  const setActiveSnap = (emblaApi: EmblaCarouselType) => setSelectedSnap(emblaApi.selectedScrollSnap());

  useEffect(() => {
    if (!emblaApi || initialIndex == null){
      return;
    }

    emblaApi.scrollTo(initialIndex, false)
  }, [emblaApi, initialIndex])

  useEffect(() => {
    if (emblaApi) {
      setupSnaps(emblaApi);
      emblaApi.on('reInit', setupSnaps)

      const handleIndexChange = () => {
        const index = emblaApi.selectedScrollSnap();
        onIndexChange?.(index);
      };

      emblaApi.on('select', handleIndexChange);
      handleIndexChange();

      return () => {
        emblaApi.off('select', handleIndexChange);
      }
    }

  }, [emblaApi, onIndexChange])

  useEffect(() => {
    if (emblaApi) {
      setupSnaps(emblaApi)
      emblaApi.on('reInit', setupSnaps)
      emblaApi.on('reInit', setActiveSnap)
      emblaApi.on('select', setActiveSnap)
    }    
  }, [emblaApi])

  return (
    <>
    {
      <div className="carousel">
        <div className='embla'>
          <div className='embla__viewport mb-3' ref={emblaRef}>
            <div className='embla__container'>
              {
                React.Children.map(children, (child, index) => (
                  <div className='embla__slide' key={index}>
                    {child}
                  </div>
                ))
              }
            </div>
          </div>
        </div>  

        <div className="navigation-controls d-flex flex-row justify-content-between align-items-center px-2">
          <div className="navigation-buttons d-flex flex-row gap-3">
            <button className="btn embla__prev background-background color-primary" onClick={navigateToPrevious}>
              <i className="bi bi-chevron-left "></i>
            </button>
            <button className="btn embla__next background-background color-primary" onClick={navigateToNext}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
          <div className="line">.</div>
          <div className="navigation-dots d-flex flex-row align-items-center justify-content-end">
            <div className="embla__dots">
              <div className="button-dots-container d-flex flex-row gap-1">
                {
                  scrollSnaps.map((_, index) => (
                    <button className={`btn embla__dot ${index == selectedSnap ? 'embla__dot--selected' : ''} background-background`} key={index}
                      onClick={() => navigateTo(index)}></button>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default Carousel