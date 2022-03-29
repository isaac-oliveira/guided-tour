import React, { useMemo, useState } from 'react';
import { GuidedContext } from '../contexts';

import type { GuidedProviderProps } from '../@types';

const GuidedProvider = ({
    children,
    backgroundColor,
    insets,
    renderTooltip
}: GuidedProviderProps) => {
    const [current, setCurrent] = useState<string | null>(null);

    const close = () => {
        setCurrent(null);
    };

    const value = useMemo(
        () => ({
            backgroundColor,
            insets,
            renderTooltip,
            current,
            setCurrent,
            close
        }),
        [current, backgroundColor, insets, renderTooltip, close]
    );

    return (
        <GuidedContext.Provider value={value}>
            {children}
        </GuidedContext.Provider>
    );
};

export { GuidedProvider };
