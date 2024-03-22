import React, { useRef, useState } from 'react';
import ExpandedLayout from './ExpandedLayout.tsx'

interface Props {
    imagePaths: string[];
    backgroundImage: string;
}

const TunnelBook: React.FC<Props> = ({ imagePaths, backgroundImage }) => {    
    const [showExpandedLayout, setShowExpandedLayout] = useState(false);

    const toggleLayout = () => {
        setShowExpandedLayout(!showExpandedLayout);
    };

    const containerRef = useRef<HTMLDivElement>(null);
    let currentPerspective = 1300; // Initial perspective value

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Convert mouse position to percentage values
        const perspectiveOriginX = (mouseX / rect.width) * 100;
        const perspectiveOriginY = (mouseY / rect.height) * 100;

        // Set the perspective origin dynamically
        containerRef.current.style.perspectiveOrigin = `${perspectiveOriginX}% ${perspectiveOriginY}%`;
    };

    const handleMouseWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        // Increase or decrease perspective based on the direction of mouse scroll
        const scrollDelta = -Math.sign(event.deltaY); // Reverse the direction
        currentPerspective += scrollDelta * 100;

        // Ensure perspective doesn't go below 1000 and above 5000
        currentPerspective = Math.min(Math.max(currentPerspective, 1000), 5000);

        // Set the new perspective value
        containerRef.current.style.perspective = `${currentPerspective}px`;

        // Prevent default scroll behavior to avoid page scrolling
        event.preventDefault();
    };

    const parentImageStyles: React.CSSProperties = {
        height: '1000px', // Adjust as needed
        width: '100%',
        transformStyle: 'preserve-3d',
        perspective: `${currentPerspective}px`, // Set initial perspective
        perspectiveOrigin: '50% 50%',
        position: 'relative',
        cursor: 'crosshair'
    };

    const translateImages = (index: number) => {
        const translateZ = index * -100; // Adjust as needed
        return {
            transform: `translate3d(0px, 0px, ${translateZ}px)`,
            width: '100%',
            height: '100%',
            borderRadius: '20px',
            position: 'absolute',
            transition: 'transform 0.5s ease-in-out',
            objectFit: 'cover' // Ensure image covers entire container while maintaining aspect ratio
        };
    };

    return (
        <>
            <div key={showExpandedLayout ? 'expanded' : 'collapsed'} style={{
                backgroundImage: showExpandedLayout ? 'black' : `url('${backgroundImage}')`,
                backgroundSize: 'cover',
                filter: 'blur(199px)',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1
            }} />
            {!showExpandedLayout ? (
                <div>
                    <div
                        ref={containerRef}
                        className="image-container"
                        style={parentImageStyles}
                        onMouseMove={handleMouseMove}
                        onWheel={handleMouseWheel}
                    >
                        {imagePaths.map((path, index) => (
                            <img key={index} src={path} alt="" style={translateImages(index)} />
                        ))}
                    </div>
                </div>
            ) : (
                <ExpandedLayout imagePaths={imagePaths} />
            )}
            <button onClick={toggleLayout}>Expand</button>
        </>
    );
    
    }
export default TunnelBook;
