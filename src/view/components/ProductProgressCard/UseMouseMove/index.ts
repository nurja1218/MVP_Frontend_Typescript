import { useEffect, useState } from 'react';

export const useMouseMove = () => {
    const [mouseMove, setMouseMove] = useState({});

    useEffect(() => {
        const getMouseMove = (e: any) => {
            const posX = e.clientX;
            const posY = e.clientY;
            setMouseMove({ posX, posY });
        };
        document.addEventListener('mousemove', getMouseMove);
        return function cleanup() {
            document.removeEventListener('mousemove', getMouseMove);
        };
    }, [mouseMove]);

    return mouseMove;
};
