import { useContext } from 'react';
import { GuidedContext } from '../contexts';

const useGuidedTour = (
    name: string
): { current: string | null; start: () => void; close: () => void } => {
    const { current, setCurrent, close } = useContext(GuidedContext);

    const start = () => {
        setCurrent(name);
    };

    return { current, start, close };
};

export { useGuidedTour };
