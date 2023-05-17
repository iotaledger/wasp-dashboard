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

    const handleFirst = () => {
        setActiveIndex(0);
    };
    const handlePrev = () => {
        setActiveIndex(prevIndex => (prevIndex === 0 ? (children as JSX.Element[]).length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex(prevIndex => (prevIndex === (children as JSX.Element[]).length - 1 ? 0 : prevIndex + 1));
    };

    const handleLast = () => {
        setActiveIndex((children as JSX.Element[]).length - 1);
    };

    return (
        <div>
            <div className="carousel-header margin-b-t">
                {title && <h2>{title}</h2>}
                {(children as JSX.Element[]).length > 0 && (
                    <div className="carousel-controls">
                        <small>Total: {(children as JSX.Element[]).length}</small>
                        <button type="button" onClick={handleFirst} disabled={activeIndex === 0}>
                            <ChevronLeftIcon />
                            <ChevronLeftIcon />
                        </button>
                        <button type="button" onClick={handlePrev} disabled={activeIndex === 0}>
                            <ChevronLeftIcon />
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={activeIndex === (children as JSX.Element[]).length - 1}
                        >
                            <ChevronRightIcon />
                        </button>
                        <button
                            type="button"
                            onClick={handleLast}
                            disabled={activeIndex === (children as JSX.Element[]).length - 1}
                        >
                            <ChevronRightIcon />
                            <ChevronRightIcon />
                        </button>
                    </div>
                )}
            </div>
            <div>{(children as JSX.Element[])[activeIndex]}</div>
        </div>
    );
}

export default Carousel;

Carousel.defaultProps = {
    title: undefined,
};
