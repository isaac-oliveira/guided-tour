import { useContext, useEffect } from 'react';
import { GuidedContext } from '../contexts';

type Options = {
    initialName: string
    welcomeData: {
        title: string
        description: string
    }
}

const useGuidedTour = ({
    initialName,
    welcomeData
}: Options): { current: string | null; start: () => void; close: () => void } => {
    const { current, setCurrent, close, setIsStartGuide, setWelcomeData } = useContext(GuidedContext);

    const start = () => {
        setIsStartGuide(true);
        setCurrent(initialName);
        console.log("entrou aqui")
    };

    useEffect(() => {
        setWelcomeData(welcomeData)
    }, [welcomeData])

    return { current, start, close };
};

export { useGuidedTour };
