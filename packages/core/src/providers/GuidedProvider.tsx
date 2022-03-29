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
            closeWelcome
        }),
        [current, backgroundColor, insets, renderTooltip, renderWelcome, isStartGuide]
    );

    return (
        <GuidedContext.Provider value={value}>
            {children}
        </GuidedContext.Provider>
    );
};

export { GuidedProvider };
