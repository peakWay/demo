
import { asyncFetchPostsIfNeed, fetchPostsIfNeed } from '@/store/actions';
import React from 'react';
import { render } from 'react-dom';
import App from './app';
import store from './src/store/store';

// store
//     .dispatch(fetchPostsIfNeed('rejectjs'))
//     .then(() => console.log(store.getState()))

store
    .dispatch(asyncFetchPostsIfNeed('rejectjs'))

    
render(
    <App />, 
    document.getElementById('root')
);