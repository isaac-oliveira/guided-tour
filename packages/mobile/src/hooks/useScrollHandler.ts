import { useCallback, useMemo } from 'react';
import type { OnChangeScroll, ScrollControl } from '../@types';

type Return = { scrollControl: ScrollControl };

const useScrollHandler = (
    onChangeScroll: OnChangeScroll,
    deps: any[]
): Return => {
    const callback = useCallback(onChangeScroll, deps);

    const scrollControl = useMemo(
        () => ({
            onChangeScroll: callback
        }),
        [callback]
    );

    return { scrollControl };
};

export { useScrollHandler };
