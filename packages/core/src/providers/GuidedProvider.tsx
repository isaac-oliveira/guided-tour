import React, { useMemo, useRef, useState } from 'react';
import { GuidedContext } from '../contexts';

import type { GuidedProviderProps, WelcomeData } from '../@types';

const GuidedProvider = ({
    children,
    backgroundColor,
    insets,
    renderTooltip,
    renderWelcome
}: GuidedProviderProps) => {
    const onClose = useRef(() => {});
    const [current, setCurrent] = useState<string | null>(null);
    const [isStartGuide, setIsStartGuide] = useState<boolean>(false);
    const [welcomeData, setWelcomeData] = useState<WelcomeData>();

    const setOnClose = (callback: () => void) => {
        onClose.current = callback;
    };

    const close = () => {
        setCurrent(null);
        onClose.current();
    };

    const closeWelcome = () => {
        setIsStartGuide(false);
    };

    const value = useMemo(
        () => ({
            backgroundColor,
            insets,
            renderTooltip,
            current,
            setCurrent,
            close,
            renderWelcome,
            isStartGuide,
            setIsStartGuide,
            closeWelcome,
            welcomeData,
            setWelcomeData,
            setOnClose
        }),
        [
            current,
            backgroundColor,
            insets,
            renderTooltip,
            renderWelcome,
            isStartGuide,
            welcomeData
        ]
    );

    return (
        <GuidedContext.Provider value={value}>
            {children}
        </GuidedContext.Provider>
    );
};

export { GuidedProvider };
