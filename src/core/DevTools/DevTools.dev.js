import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
    <DockMonitor
        defaultIsVisible={false}
        toggleVisibilityKey="ctrl-h"
        changePositionKey="ctrl-q"
        changeMonitorKey="ctrl-m"
    >
        <LogMonitor hideMainButtons={true} expandStateRoot={false} expandActionRoot={true} markStateDiff={true} />
        <SliderMonitor />
    </DockMonitor>
);
