import { createContext } from 'react';
import type { IScrollContext } from '../@types';

const ScrollContext = createContext<IScrollContext>({
    containerRef: { current: null }
});

export { ScrollContext };
