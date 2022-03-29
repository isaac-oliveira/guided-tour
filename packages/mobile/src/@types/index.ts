import type { TooltipData } from '@guided-tour/core';
import type React from 'react';
import type { View } from 'react-native';

export type Measure = {
    top: number;
    left: number;
    width: number;
    height: number;
};

export type Position = {
    x: number;
    y: number;
};

export type Dimensions = {
    width: number;
    height: number;
};

export type OnChangeScroll = (position: Position) => void;

export type ScrollControl = {
    onChangeScroll: OnChangeScroll;
};

export interface GuidedControllerProps {
    name: string;
    previousName: string | null;
    nextName: string | null;
    renderComponent: (
        ref?: React.MutableRefObject<any>
    ) => React.ReactElement<any>;
    scrollControl?: ScrollControl;
    tooltipData: TooltipData;
}

export interface IScrollContext {
    containerRef: React.RefObject<View | any>;
}
