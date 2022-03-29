import React, { useMemo, useState } from 'react';
import { GuidedContext } from '../contexts';

import type { GuidedProviderProps } from '../@types';

const GuidedProvider = ({
    children,
    backgroundColor,
    insets,
    renderTooltip,
    renderWelcome
}: GuidedProviderProps) => {
    const [current, setCurrent] = useState<string | null>(null);
    const [isStartGuide, setIsStartGuide] = useState<boolean>(false);
    const [welcomeData, setWelcomeData] = useState<any>({})

    const close = () => {
        setCurrent(null);
    };

    const closeWelcome = () => {
        setIsStartGuide(false);
    }

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
            setWelcomeData
        }),
        [current, backgroundColor, insets, renderTooltip, renderWelcome, isStartGuide, welcomeData]
    );

    return (
        <GuidedContext.Provider value={value}>
            {children}
        </GuidedContext.Provider>
    );
};

export { GuidedProvider };
