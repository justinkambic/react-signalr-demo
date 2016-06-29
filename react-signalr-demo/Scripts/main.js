// app entry point

import 'babel-polyfill';

import React from 'react';
import Root from './lib/components/root';
import { render } from 'react-dom';

render(
    <Root />,
    document.getElementById('root')
);