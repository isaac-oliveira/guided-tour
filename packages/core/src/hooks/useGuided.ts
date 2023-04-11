import { useContext } from 'react';
import { GuidedContext } from '../contexts';
import type { GuidedOptions, IGuided } from '../@types';

const useGuided = ({ previousName, nextName }: GuidedOptions): IGuided => {
    const { current, setCurrent, lastComponentMeasure, setLastComponentMeasure, lastTooltipPosition, setLastTooltipPosition, ...rest } = useContext(GuidedContext);

    const previous = () => {
        setCurrent(previousName);
    };

    const next = () => {
        setCurrent(nextName);
    };

    const isFirst = previousName === null;
    const isLast = nextName === null;

    return { current, previous, next, isFirst, isLast, lastComponentMeasure, setLastComponentMeasure, lastTooltipPosition,
        setLastTooltipPosition, ...rest };
};

export { useGuided };
