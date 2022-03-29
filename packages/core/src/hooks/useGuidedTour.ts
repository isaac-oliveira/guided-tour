import { useContext } from 'react';
import { GuidedContext } from '../contexts';

const useGuidedTour = (
    initialName: string
): { current: string | null; start: () => void; close: () => void } => {
    const { current, setCurrent, close } = useContext(GuidedContext);

    const start = () => {
        setCurrent(initialName);
    };

    return { current, start, close };
};

export { useGuidedTour };
