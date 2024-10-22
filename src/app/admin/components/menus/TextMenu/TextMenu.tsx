import { useTextmenuCommands } from './hooks/useTextmenuCommands'
import { useTextmenuStates } from './hooks/useTextmenuStates'
import { Editor } from '@tiptap/react'
import { memo } from 'react'
import { FontFamilyPicker } from './components/FontFamilyPicker'
import { useTextmenuContentTypes } from './hooks/useTextmenuContentTypes'
import { ContentTypePicker } from './components/ContentTypePicker'
import { EditLinkPopover } from './components/EditLinkPopover'
import { Toolbar } from '../../ui/Toolbar'
import { Icon } from '../../ui/Icon'

const MemoButton = memo(Toolbar.Button)
const MemoFontFamilyPicker = memo(FontFamilyPicker)
const MemoContentTypePicker = memo(ContentTypePicker)

export type TextMenuProps = {
  editor: Editor
}

export const TextMenu = ({ editor }: TextMenuProps) => {
  const commands = useTextmenuCommands(editor)
  const states = useTextmenuStates(editor)
  const blockOptions = useTextmenuContentTypes(editor)

  return (
    <Toolbar.Wrapper className='relative z-[2] mb-2 !border-white'>
      <MemoContentTypePicker options={blockOptions} />
      <MemoFontFamilyPicker onChange={commands.onSetFont} value={states.currentFont || ''} />
      <Toolbar.Divider />
      <MemoButton tooltip="Image" onClick={commands.onImageUpload} active={states.isBold}>
        <Icon name="Image" />
      </MemoButton>
      <Toolbar.Divider />
      <MemoButton tooltip="Bold" tooltipShortcut={['Mod', 'B']} onClick={commands.onBold} active={states.isBold}>
        <Icon name="Bold" />
      </MemoButton>
      <MemoButton
        tooltip="Italic"
        tooltipShortcut={['Mod', 'I']}
        onClick={commands.onItalic}
        active={states.isItalic}
      >
        <Icon name="Italic" />
      </MemoButton>
      <MemoButton
        tooltip="Underline"
        tooltipShortcut={['Mod', 'U']}
        onClick={commands.onUnderline}
        active={states.isUnderline}
      >
        <Icon name="Underline" />
      </MemoButton>
      <MemoButton
        tooltip="Strikehrough"
        tooltipShortcut={['Mod', 'Shift', 'S']}
        onClick={commands.onStrike}
        active={states.isStrike}
      >
        <Icon name="Strikethrough" />
      </MemoButton>
      <MemoButton tooltip="Code" tooltipShortcut={['Mod', 'E']} onClick={commands.onCode} active={states.isCode}>
        <Icon name="Code" />
      </MemoButton>
      <EditLinkPopover onSetLink={commands.onLink} />
      <MemoButton
        tooltip="Subscript"
        tooltipShortcut={['Mod', '.']}
        onClick={commands.onSubscript}
        active={states.isSubscript}
      >
        <Icon name="Subscript" />
      </MemoButton>
      <MemoButton
        tooltip="Superscript"
        tooltipShortcut={['Mod', ',']}
        onClick={commands.onSuperscript}
        active={states.isSuperscript}
      >
        <Icon name="Superscript" />
      </MemoButton>
      <Toolbar.Divider />
      <MemoButton
        tooltip="Align left"
        tooltipShortcut={['Shift', 'Mod', 'L']}
        onClick={commands.onAlignLeft}
        active={states.isAlignLeft}
      >
        <Icon name="AlignLeft" />
      </MemoButton>
      <MemoButton
        tooltip="Align center"
        tooltipShortcut={['Shift', 'Mod', 'E']}
        onClick={commands.onAlignCenter}
        active={states.isAlignCenter}
      >
        <Icon name="AlignCenter" />
      </MemoButton>
      <MemoButton
        tooltip="Align right"
        tooltipShortcut={['Shift', 'Mod', 'R']}
        onClick={commands.onAlignRight}
        active={states.isAlignRight}
      >
        <Icon name="AlignRight" />
      </MemoButton>
      <MemoButton
        tooltip="Justify"
        tooltipShortcut={['Shift', 'Mod', 'J']}
        onClick={commands.onAlignJustify}
        active={states.isAlignJustify}
      >
        <Icon name="AlignJustify" />
      </MemoButton>

    </Toolbar.Wrapper>
  )
}
