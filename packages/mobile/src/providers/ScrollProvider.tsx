import React, { useMemo, useRef } from 'react';
import { View } from 'react-native';
import { ScrollContext } from '../contexts';

const ScrollProvider = ({ children }: React.PropsWithChildren<any>) => {
    const containerRef = useRef<View>(null);

    const value = useMemo(
        () => ({
            containerRef
        }),
        [containerRef]
    );

    return (
        <ScrollContext.Provider value={value}>
            <View ref={containerRef} style={{ flex: 1 }}>
                {children}
            </View>
        </ScrollContext.Provider>
    );
};

export { ScrollProvider };
