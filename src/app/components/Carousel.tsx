import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets";
import "./Carousel.scss";

interface CarouselProps {
    children: React.ReactNode;
    title?: string;
}

/**
 *
 * @param root0 Carousel options
 * @param root0.children Carousel children
 * @param root0.title Carousel title
 * @returns The node to render.
 */
function Carousel({ children, title }: CarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex(prevIndex => (prevIndex === 0 ? (children as JSX.Element[]).length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex(prevIndex => (prevIndex === (children as JSX.Element[]).length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div>
            <div className="carousel-header">
                {title && <h2>{title}</h2>}
                <div>
                    <button type="button" onClick={handlePrev}>
                        <ChevronLeftIcon />
                    </button>
                    <button type="button" onClick={handleNext}>
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>
            <div>{(children as JSX.Element[])[activeIndex]}</div>
        </div>
    );
}

export default Carousel;

Carousel.defaultProps = {
    title: undefined,
};
