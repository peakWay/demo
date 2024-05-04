import { useState, useCallback } from 'react';

export const useUpdate = () => {
    const  [, setState] = useState({})
    return useCallback(() => setState({}), [])
}