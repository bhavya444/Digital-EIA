import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function App() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <div style={{ marginTop: 20 }}>
        <Editor
          apiKey="aevf4ad5215od998s8cf4aw8mlmd3s8eqlhkk2wy4pix1ad8"
          cloudChannel="dev"
          onInit={(evt, editor) => {
              editorRef.current = editor
          }}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 300,
            menubar: true,
            /* enable title field in the Image dialog*/
            image_title: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste image code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            file_picker_callback: function (cb, value, meta) {
              var input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");
              input.onchange = function () {
                var file = this.files[0];

                var reader = new FileReader();
                reader.onload = function () {
                  var id = "blobid" + new Date().getTime();
                  var blobCache = editorRef.current.editorUpload.blobCache;
                  var base64 = reader.result.split(",")[1];
                  var blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);

                  /* call the callback and populate the Title field with the file name */
                  cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
              };
              input.click();
            },
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <button onClick={log}>Log editor content</button>
      </div>
    </>
  );
}