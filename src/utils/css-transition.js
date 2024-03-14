  
import React from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';

const CSSTransition = (props)=> {

    const onEnter = (node, isAppearing) => {
        props.onEnter && props.onEnter(node, isAppearing); // component
        props.options && props.options.onEnter && props.options.onEnter(node, isAppearing); // user option
    }

    const onEntering = (node, isAppearing) => {
        props.onEntering && props.onEntering(node, isAppearing); // component
        props.options && props.options.onEntering && props.options.onEntering(node, isAppearing); // user option
    }

     const onEntered = (node, isAppearing) => {
        props.onEntered && props.onEntered(node, isAppearing); // component
        props.options && props.options.onEntered && props.options.onEntered(node, isAppearing); // user option
    }

    const onExit = (node) => {
        props.onExit && props.onExit(node); // component
        props.options && props.options.onExit && props.options.onExit(node); // user option
    }

    const onExiting = (node) => {
        props.onExiting && props.onExiting(node); // component
        props.options && props.options.onExiting && props.options.onExiting(node); // user option
    }

    const onExited = (node) => {
        props.onExited && props.onExited(node); // component
        props.options && props.options.onExited && props.options.onExited(node); // user option
    }
        const immutableProps = { nodeRef: props.nodeRef, in: props.in, onEnter: onEnter, onEntering: onEntering, onEntered: onEntered, onExit: onExit, onExiting: onExiting, onExited: onExited };
        const mutableProps = { classNames: props.classNames, timeout: props.timeout, unmountOnExit: props.unmountOnExit };
        const ComponentProps = { ...mutableProps, ...(props.options || {}), ...immutableProps };
        return (
            <ReactCSSTransition {...ComponentProps}>
                {props.children}
            </ReactCSSTransition>
        )
}
export default CSSTransition