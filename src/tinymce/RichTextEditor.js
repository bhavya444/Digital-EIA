import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RichTextEditor() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };


  var demo = '<h1><span style="background-color: #ced4d9;">hello world. &nbsp;<img src="https://dlsdatapfusprd.blob.core.windows.net/fulcrum-files/002a92f3-b4b1-45ce-a48f-329d747db48e/02b3c3e9-5d4f-439b-8ff8-a0a89d97e778-thumb" alt="" width="118" height="118" /></span></h1>'
  return (
    <>
      <Editor
       apiKey="aevf4ad5215od998s8cf4aw8mlmd3s8eqlhkk2wy4pix1ad8"
       cloudChannel="5-dev"
       onInit={(evt, editor) => {
           editorRef.current = editor
       }}
       initialValue={demo}
       init={{
         height: 300,
         menubar: true,
         /* enable title field in the Image dialog*/
         image_title: true,
         plugins: [
           "advlist autolink lists link image code charmap print preview anchor",
           "searchreplace visualblocks code fullscreen",
           "insertdatetime media table paste image code help wordcount template",
         ],
         toolbar:
           "undo redo | formatselect | " +
           "bold italic backcolor | alignleft aligncenter " +
           "alignright alignjustify | bullist numlist outdent indent | " +
           "link image |" +
           "template |" +
           "removeformat | help",
           templates: [
            {title: 'Some title 1', description: 'Some desc 1', content: 'My content'},
            {title: 'Some title 2', description: 'Some desc 2', url: 'development.html'}
          ],
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}