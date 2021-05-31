const render = template => {
    const handle = document.createElement('div')
    handle.innerHTML = template

    return handle
}

export {
    render
}