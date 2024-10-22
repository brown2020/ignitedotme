"use client";

import { Fragment, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import ExtensionKit from "../extensions/extension-kit";
import { TextMenu } from "./menus/TextMenu";

interface TipTapEditorProps {
  getEditorContent: (content: string) => void;
  content: string
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ getEditorContent, content }) => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const userPosition = useRef({ from: 0, to: 0 });
  const isUpdating = useRef(false);
  const menuContainerRef = useRef(null)

  const editor = useEditor({
    extensions: [...ExtensionKit({})],
    autofocus: true,
    onSelectionUpdate: ({ editor }) => {
      if (isUpdating.current) return;
      const { from, to } = editor.state.selection;
      userPosition.current = ({ from, to });
    },
    onUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      userPosition.current = ({ from, to });
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        const htmlContent = editor.getHTML();
        getEditorContent(htmlContent);
      }, 300);
    },
  });

  useEffect(() => {
    if (editor) editor.commands.setContent(content, false)
  }, [editor, content])

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <Fragment>
      <div className="flex w-full justify-between rounded-lg">
        <div className="grow overflow-y-hidden scroll-bar-design mb-2">
          <TextMenu editor={editor} />
        </div>
      </div>
      <div ref={menuContainerRef} className="grow overflow-y-auto scroll-bar-design border border-gray-200 rounded-md shadow-md">
        <EditorContent
          editor={editor}
          className="h-full relative prose prose-sm max-w-none [&>div]:h-full"
        />
      </div>
    </Fragment>
  );
}

export default TipTapEditor;
