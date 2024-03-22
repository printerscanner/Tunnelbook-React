import React, { useEffect } from 'react';

const ExpandedLayout: React.FC<{ imagePaths: string[] }> = ({ imagePaths }) => {
    const translateImagesY = (index: number) => {
        const translateZ = index * -100; // Adjust as needed
        const translateY = index * 100; // Adjust as needed
        const translateX = index * 200; // Adjust as needed
        return {
            transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`,
            width: '50%',
            height: 'auto',
            borderRadius: '20px',
            position: 'absolute',
            transition: 'transform 0.5s ease-in-out',
            objectFit: 'cover' // Ensure image covers entire container while maintaining aspect ratio
        };
    };

    useEffect(() => {
        const images = document.querySelectorAll('.expanded-image');
        images.forEach(image => {
            image.addEventListener('mouseover', () => {
                image.style.transform = 'translateZ(50px)';
                image.style.zIndex = '1';
            });
            image.addEventListener('mouseout', () => {
                image.style.transform = 'none';
                image.style.zIndex = '0';
            });
        });

        return () => {
            images.forEach(image => {
                image.removeEventListener('mouseover', () => {});
                image.removeEventListener('mouseout', () => {});
            });
        };
    }, []);

    const parentImageStyles: React.CSSProperties = {
        height: '100vh', // Adjust as needed
        width: '100%',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        perspectiveOrigin: '50% 50%',
        position: 'relative',
        cursor: 'crosshair'
    };

    return (
        <div style={parentImageStyles}>
            {/* Layout images nicely */}
            {imagePaths.map((path, index) => (
                <img key={index} src={path} alt="" style={translateImagesY(index)} className="expanded-image" />
            ))}
        </div>
    );
}

export default ExpandedLayout;
