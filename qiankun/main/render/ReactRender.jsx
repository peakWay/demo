import React from 'react'
import { createRoot } from 'react-dom/client';

function ReactRender(props) {
    return (
        <>
            {props.loading && <h4 className="subapp-loading">Loading...</h4>}
            <div id="subapp-viewport"></div>
        </>
    )
}

let app = null

export default function render(loading) {
    if (!app) {
        app = createRoot(document.getElementById('subapp-container'))
    } 

    app.render(<ReactRender loading={loading} />)
}