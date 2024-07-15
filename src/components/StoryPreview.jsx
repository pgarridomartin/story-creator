import React from 'react';

function StoryPreview({ story }) {
  return (
    <div className="story-preview">
      <h2>Generated Story</h2>
      <p>{story}</p>
    </div>
  );
}

export default StoryPreview;
