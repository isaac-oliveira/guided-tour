import { useContext } from 'react';
import { GuidedContext } from '../contexts';

const useGuidedTour = (
    initialName: string
): { current: string | null; start: () => void; close: () => void } => {
    const { current, setCurrent, close, setIsStartGuide } = useContext(GuidedContext);

    const start = () => {
        setIsStartGuide(true);
        setCurrent(initialName);
    };

    return { current, start, close };
};

export { useGuidedTour };
