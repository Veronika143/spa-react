import React from "react";
import { forwardRef } from "react";

const News = forwardRef((props, ref) => {
    return (
        <div className="new" ref={ref}>
            <h2 className="new__title">{props.title}</h2>
            <p className="new__text">{props.content}</p>
        </div>
    );
});

export default News;
