import { createContext } from 'react';

import type { IGuidedContext } from '../@types';

export const GuidedContext = createContext<IGuidedContext>({
    current: null,
    setCurrent: () => {},
    close: () => {}
});
