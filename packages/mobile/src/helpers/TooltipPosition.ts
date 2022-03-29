import type { Anchor } from '@guided-tour/core';
import type { Measure, Dimensions } from '../@types';

type ITooltipPosition = {
    [key in Anchor]: (
        measure: Measure | null,
        dimension: Dimensions | null
    ) => { top: number; left: number };
};

const TooltipPosition: ITooltipPosition = {
    top_left: (measure, dimensions) => {
        if (!measure || !dimensions) {
            return { top: 0, left: 0 };
        }
        return { top: measure.top - dimensions.height, left: measure.left };
    },
    top_right: (measure, dimensions) => {
        if (!measure || !dimensions) {
            return { top: 0, left: 0 };
        }

        return {
            top: measure.top - dimensions.height,
            left: measure.width - dimensions.width + measure.left
        };
    },
    top_center: (measure, dimensions) => {
        if (!measure || !dimensions) {
            return { top: 0, left: 0 };
        }

        return {
            top: measure.top - dimensions.height,
            left: measure.width / 2 - dimensions.width / 2 + measure.left
        };
    },
    left_bottom: (measure, dimensions) => {
        if (!measure || !dimensions) {
            return { top: 0, left: 0 };
        }

        return {
            top: measure.top + measure.height - dimensions.height,
            left: measure.left - dimensions.width
        };
    },
    left_center: (measure, dimensions) => {
        if (!measure || !dimensions) {
            return { top: 0, left: 0 };
        }

        return {
            top: measure.height / 2 - dimensions.height / 2 + measure.top,
            left: measure.left - dimensions.width
        };
    },
    left_top: (measure, dimensions) => {
        if (!measure || !dimensions) {
            return { top: 0, left: 0 };
        }

        return {
            top: measure.top,
            left: measure.left - dimensions.width
        };
    },
    bottom_center: (measure, dimensions) => {
        if (!measure || !dimensions) {
            return { top: 0, left: 0 };
        }

        return {
            top: measure.top + measure.height,
            left: measure.width / 2 - dimensions.width / 2 + measure.left
        };
    },
    bottom_left: (measure, dimensions) => {
        if (!measure || !dimensions) {
            return { top: 0, left: 0 };
        }

        return {
            top: measure.top + measure.height,
            left: measure.left
        };
    },
    bottom_right: (measure, dimensions) => {
        if (!measure || !dimensions) {
            return { top: 0, left: 0 };
        }

        return {
            top: measure.top + measure.height,
            left: measure.width - dimensions.width + measure.left
        };
    },
    right_bottom: (measure, dimensions) => {
        if (!measure || !dimensions) {
            return { top: 0, left: 0 };
        }

        return {
            top: measure.top + measure.height - dimensions.height,
            left: measure.left + measure.width
        };
    },
    right_center: (measure, dimensions) => {
        if (!measure || !dimensions) {
            return { top: 0, left: 0 };
        }

        return {
            top: measure.height / 2 - dimensions.height / 2 + measure.top,
            left: measure.left + measure.width
        };
    },
    right_top: (measure, dimensions) => {
        if (!measure || !dimensions) {
            return { top: 0, left: 0 };
        }

        return {
            top: measure.top,
            left: measure.left + measure.width
        };
    }
};

export { TooltipPosition };
