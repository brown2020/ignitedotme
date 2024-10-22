import { Editor } from '@tiptap/react'
import { useCallback } from 'react'

export const useTextmenuCommands = (editor: Editor) => {
  const onBold = useCallback(() => editor.chain().focus().toggleBold().run(), [editor])
  const onImageUpload = useCallback(() => editor.chain().focus().setImageUpload().run(), [editor])
  const onItalic = useCallback(() => editor.chain().focus().toggleItalic().run(), [editor])
  const onStrike = useCallback(() => editor.chain().focus().toggleStrike().run(), [editor])
  const onUnderline = useCallback(() => editor.chain().focus().toggleUnderline().run(), [editor])
  const onCode = useCallback(() => editor.chain().focus().toggleCode().run(), [editor])

  const onSubscript = useCallback(() => editor.chain().focus().toggleSubscript().run(), [editor])
  const onSuperscript = useCallback(() => editor.chain().focus().toggleSuperscript().run(), [editor])
  const onAlignLeft = useCallback(() => editor.chain().focus().setTextAlign('left').run(), [editor])
  const onAlignCenter = useCallback(() => editor.chain().focus().setTextAlign('center').run(), [editor])
  const onAlignRight = useCallback(() => editor.chain().focus().setTextAlign('right').run(), [editor])
  const onAlignJustify = useCallback(() => editor.chain().focus().setTextAlign('justify').run(), [editor])

  const onLink = useCallback(
    (url: string, inNewTab?: boolean) =>
      editor
        .chain()
        .focus()
        .setLink({ href: url, target: inNewTab ? '_blank' : '' })
        .run(),
    [editor],
  )

  const onSetFont = useCallback(
    (font: string) => {
      if (!font || font.length === 0) {
        return editor.chain().focus().unsetFontFamily().run()
      }
      return editor.chain().focus().setFontFamily(font).run()
    },
    [editor],
  )

  return {
    onImageUpload,
    onBold,
    onItalic,
    onStrike,
    onUnderline,
    onCode,
    onSubscript,
    onSuperscript,
    onAlignLeft,
    onAlignCenter,
    onAlignRight,
    onAlignJustify,
    onSetFont,
    onLink,
  }
}
