import { useContext } from 'react';
import { GuidedContext } from '../contexts';
import type { GuidedOptions, IGuided } from '../@types';

const useGuided = ({ previousName, nextName }: GuidedOptions): IGuided => {
    const { current, setCurrent, ...rest } = useContext(GuidedContext);

    const previous = () => {
        setCurrent(previousName);
    };

    const next = () => {
        setCurrent(nextName);
    };

    const isFirst = previousName === null;
    const isLast = nextName === null;

    return { current, previous, next, isFirst, isLast, ...rest };
};

export { useGuided };
