import React, { useCallback, useState } from "react";

export default function PostForm() {
  const [content, setContent] = useState<string>("");
  const handleSubmit = useCallback(() => {}, [content]);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Content</label>
      </div>
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <div>
        <button type="submit">Save Post</button>
      </div>
      <pre>
        <code>{JSON.stringify({ content }, null, 2)}</code>
      </pre>
    </form>
  );
}
