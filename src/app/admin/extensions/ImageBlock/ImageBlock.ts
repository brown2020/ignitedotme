import { ReactNodeViewRenderer } from '@tiptap/react'
import { mergeAttributes, Range } from '@tiptap/core'

import ImageBlockView from './components/ImageBlockView'
import { Image } from '../Image'

export interface ImageOptions {
  inline: boolean;
  imageBaseUrl?: string;
  allowBase64: boolean;
  HTMLAttributes: Record<string | number | symbol, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageBlock: {
      setImageBlock: (attributes: { src: string }) => ReturnType
      setImageBlockAt: (attributes: { src: string; pos: number | Range }) => ReturnType
      setImageBlockAlign: (align: 'left' | 'center' | 'right') => ReturnType
      setImageBlockWidth: (width: number) => ReturnType
    }
  }
}

export const ImageBlock = Image.extend<ImageOptions>({
  name: 'imageBlock',

  group: 'block',

  defining: true,

  isolating: true,

  addOptions() {
    return {
      ...this.parent?.(),
      imageBaseUrl: undefined,
    }
  },

  addAttributes() {
    return {
      src: {
        default: '',
        parseHTML: (element) => element.getAttribute('src'),
        renderHTML: (attributes) => ({
          src: attributes.src,
        }),
      },
      width: {
        default: '100%',
        parseHTML: (element) => element.getAttribute('data-width'),
        renderHTML: (attributes) => ({
          'data-width': attributes.width,
        }),
      },
      align: {
        default: 'center',
        parseHTML: (element) => element.getAttribute('data-align'),
        renderHTML: (attributes) => ({
          'data-align': attributes.align,
        }),
      },
      alt: {
        default: '',
        parseHTML: (element) => element.getAttribute('alt'),
        renderHTML: (attributes) => ({
          alt: attributes.alt,
        }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="imageBlock"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {

      setImageBlock:
        attrs =>
          ({ commands }) => {
            return commands.insertContent({ type: 'imageBlock', attrs: { src: attrs.src } })
          },

      setImageBlockAt:
        attrs =>
          ({ commands }) => {
            return commands.insertContentAt(attrs.pos, { type: 'imageBlock', attrs: { src: attrs.src } })
          },

      setImageBlockAlign:
        (align: string) =>
          ({ commands }) =>
            commands.updateAttributes('imageBlock', { align }),

      setImageBlockWidth:
        width =>
          ({ commands }) =>
            commands.updateAttributes('imageBlock', { width: `${Math.max(0, Math.min(100, width))}%` }),
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageBlockView)
  },
})

export default ImageBlock
