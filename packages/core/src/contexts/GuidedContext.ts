import { createContext } from 'react';

import type { IGuidedContext } from '../@types';

export const GuidedContext = createContext<IGuidedContext>({
    current: null,
    lastComponentMeasure: null,
    lastTooltipPosition: null,
    setCurrent: () => {},
    close: () => {},
    setIsStartGuide: () => {},
    setOnClose: () => {},
    setWelcomeData: () => {},
    closeWelcome: () => {},
    setLastComponentMeasure: () => {},
    setLastTooltipPosition: () => {}
});
