import React from 'react';
import './tag.style.scss';

const Tag = ({tag}) => {
    return (
      <div className="tag">
        <button className=" btn-tag">
          {tag}
        </button>
      </div>
    );
}

export default Tag;
