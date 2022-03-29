import React from 'react';
import { useFocused } from '@guided-tour/core';

import type { GuidedControllerProps } from '../@types';
import { GuidedComponent } from './GuidedComponent';

const GuidedController = ({
    name,
    renderComponent,
    ...rest
}: GuidedControllerProps) => {
    const focused = useFocused(name);

    if (!focused) {
        return renderComponent();
    }

    return (
        <GuidedComponent
            focused={focused}
            renderComponent={renderComponent}
            {...rest}
        />
    );
};

export { GuidedController };
