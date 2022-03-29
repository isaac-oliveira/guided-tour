import { useContext, useEffect, useState } from 'react';
import { GuidedContext } from '../contexts';

const useFocused = (name: string) => {
    const [focused, setFocused] = useState<boolean>(false);
    const { current } = useContext(GuidedContext);

    useEffect(() => {
        setFocused(name === current);
    }, [current]);

    return focused;
};

export { useFocused };
