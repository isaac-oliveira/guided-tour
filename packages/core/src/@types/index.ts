import type React from 'react';

export interface Insets {
    top: number;
    left: number;
    bottom: number;
    right: number;
}

export type Anchor =
    | 'top_left'
    | 'top_right'
    | 'top_center'
    | 'left_top'
    | 'left_bottom'
    | 'left_center'
    | 'bottom_left'
    | 'bottom_right'
    | 'bottom_center'
    | 'right_top'
    | 'right_bottom'
    | 'right_center';

export type TooltipData = {
    title: string;
    description: string;
    anchor: Anchor;
};

export interface TooltipProps {
    isLast: boolean;
    isFirst: boolean;
    current: string | null;
    data: TooltipData;
    next: () => void;
    previous: () => void;
    close: () => void;
}

export interface WelcomeModalData {
    title: string;
    text: string;
    onPress: () => void;
    onPressClose: () => void;
}

export interface WelcomeModalProps {
    closeWelcome: () => void;
    close: () => void;
}

export interface IGuidedContext {
    backgroundColor?: string;
    insets?: Insets;
    renderTooltip?: (props: TooltipProps) => React.ReactElement<any>;
    renderWelcome?: (props: WelcomeModalProps) => React.ReactElement<any>;
    current: string | null;
    setCurrent: (current: string | null) => void;
    close: () => void;
    setIsStartGuide: (value: boolean) => void
}

export type GuidedProviderProps = React.PropsWithChildren<{
    insets?: Insets;
    backgroundColor?: string;
    renderTooltip?: (props: TooltipProps) => React.ReactElement<any>;
    renderWelcome?: (props: WelcomeModalProps) => React.ReactElement<any>;
}>;

export type GuidedOptions = {
    previousName: string | null;
    nextName: string | null;
};

export type IGuided = {
    current: string | null;
    backgroundColor?: string;
    insets?: Insets;
    isFirst: boolean;
    isLast: boolean;
    renderTooltip?: (props: TooltipProps) => React.ReactElement<any>;
    renderWelcome?: (props: WelcomeModalProps) => React.ReactElement<any>;
    previous: () => void;
    next: () => void;
    close: () => void;
    closeWelcome: () => void;
    isStartGuide: boolean;
};
