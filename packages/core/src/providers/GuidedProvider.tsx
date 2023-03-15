import React, { useMemo, useRef, useState } from 'react';
import { GuidedContext } from '../contexts';

import type { GuidedProviderProps, WelcomeData, Measure } from '../@types';
import { View } from 'react-native';

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
    const [lastComponentMeasure, setLastComponentMeasure] = useState<Measure | null>(null);
    const [lastTooltipPosition, setLastTooltipPosition] = useState<{top: number, left: number} | null>(null);

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
            setOnClose,
            lastComponentMeasure,
            setLastComponentMeasure,
            lastTooltipPosition,
            setLastTooltipPosition
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
            {(current || isStartGuide) && <View style={{position: 'absolute', opacity: 0.8 , backgroundColor: backgroundColor || '#0201017f' , width: '100%', height: '100%', zIndex: 1}}/>}
            {children}
        </GuidedContext.Provider>
    );
};

export { GuidedProvider };
