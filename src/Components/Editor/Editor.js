import React, { useCallback, useMemo, useRef, useState } from 'react'
import { EditorState, convertToRaw, RichUtils } from 'draft-js'
import Editor, { composeDecorators } from '@draft-js-plugins/editor'
import createMentionPlugin, { defaultSuggestionsFilter } from '@draft-js-plugins/mention'
import createImagePlugin from '@draft-js-plugins/image'
import createAlignmentPlugin from '@draft-js-plugins/alignment'
import createFocusPlugin from '@draft-js-plugins/focus'
import createResizeablePlugin from '@draft-js-plugins/resizeable'
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop'
import createDragNDropUploadPlugin from '@draft-js-plugins/drag-n-drop-upload'
import editorStyles from './editorStyles.module.css'
import mockUpload from './mockUpload'
import '@draft-js-plugins/alignment/lib/plugin.css'
import { useHistory, useLocation, Redirect } from 'react-router-dom'

const ContentEditor = () => {
  let headers
  const location = useLocation()
  const ref = useRef(null)
  const history = useHistory()
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [open, setOpen] = useState(true)

  const focusPlugin = createFocusPlugin()
  const resizeablePlugin = createResizeablePlugin()
  const blockDndPlugin = createBlockDndPlugin()
  const alignmentPlugin = createAlignmentPlugin()
  const { AlignmentTool } = alignmentPlugin

  const decorator = composeDecorators(
    resizeablePlugin.decorator,
    alignmentPlugin.decorator,
    focusPlugin.decorator,
    blockDndPlugin.decorator
  )
  const imagePlugin = createImagePlugin({ decorator })

  const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
    handleUpload: mockUpload,
    addImage: imagePlugin.addImage
  })

  const { MentionSuggestions, mentionPlugin } = useMemo(() => {
    const mentionPlugin = createMentionPlugin()
    const { MentionSuggestions } = mentionPlugin
    return { mentionPlugin, MentionSuggestions }
  }, [])

  const plugins = [
    dragNDropFileUploadPlugin,
    blockDndPlugin,
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
    imagePlugin,
    mentionPlugin
  ]

  const [suggestions, setSuggestions] = useState([])

  const onOpenChange = useCallback((_open) => {
    setOpen(_open)
  }, [])

  const onSearchChange = useCallback(({ value }) => {
    setSuggestions(defaultSuggestionsFilter(value, headers))
  }, [])

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  if (location.state === undefined || location.state === null) {
    return <Redirect to='/csv' />
  } else {
    headers = location.state.headers
  }

  const onExtractData = () => {
    const contentState = editorState.getCurrentContent()
    console.log(contentState)
    const raw = convertToRaw(contentState)
    const blocks = raw.blocks
    for (let i = 0; i < blocks.length; i++) {
      console.log(blocks[i])
    }
    console.log(raw)
  }

  // const onPreview = () => {
  //   const contentState = editorState.getCurrentContent()
  //   const raw = convertToRaw(contentState)
  //   const blocks = raw.blocks
  //   blocks.forEach(block => {
  //     let s = ''
  //     let start = 0
  //     block.entityRanges.forEach(mention => {
  //       s = s + block.text.substring(start, mention.offset - 1) + ' ' + raw.entityMap[mention.key].data.mention.data[0]
  //       start = mention.offset + mention.length
  //     })
  //     s = s + block.text.substring(start, block.text.length - 1)
  //     console.log(s)
  //   })
  // }

  const onEditFooter = () => {
    history.push('/footer')
  }

  return (
    <>
      <div className='container'>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <input label='subject' type='text' id='subject' placeholder='Subject' style={{ width: '50%' }} />
        </div>
        <div className={editorStyles.editor} onClick={() => ref.current.focus()} style={{ width: '100%' }}>
          <Editor
            editorKey='editor'
            editorState={editorState}
            onChange={setEditorState}
            plugins={plugins}
            ref={ref}
            handleKeyCommand={handleKeyCommand}
            style={{ width: '75%' }}
          />
          <AlignmentTool />
          {/* <ImageAdd
            editorState={editorState}
            onChange={setEditorState}
            modifier={imagePlugin.addImage}
          /> */}
          <MentionSuggestions
            open={open}
            onOpenChange={onOpenChange}
            suggestions={suggestions}
            onSearchChange={onSearchChange}
            onAddMention={(mention) => {
              console.log(mention)
            }}
          />
        </div>
        <div>
          <button onClick={() => onExtractData()}>Extract data</button>
          <button onClick={() => onEditFooter()}>Edit Footer</button>
          {/* <button onClick={() => onPreview()} style={{ marginLeft: '100px' }}>Preview</button> */}
        </div>
      </div>
    </>
  )
}

export default ContentEditor
