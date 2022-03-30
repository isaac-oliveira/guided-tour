import { useContext } from 'react';
import { GuidedContext } from '../contexts';

type Options = {
    initialName: string;
    welcomeData?: {
        title: string;
        description: string;
    };
    onClose: () => void;
};

const useGuidedTour = ({
    initialName,
    welcomeData,
    onClose
}: Options): {
    current: string | null;
    start: () => void;
    close: () => void;
} => {
    const {
        current,
        setCurrent,
        renderWelcome,
        setOnClose,
        setWelcomeData,
        setIsStartGuide,
        close
    } = useContext(GuidedContext);

    const start = () => {
        setOnClose(onClose);
        setWelcomeData(welcomeData);
        setIsStartGuide(!!welcomeData && !!renderWelcome);
        setCurrent(initialName);
    };

    return { current, start, close };
};

export { useGuidedTour };
