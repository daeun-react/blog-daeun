import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Progress,
} from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Myinit from "../../components/editor/UploadAdapter";
import { POST_UPLOADING_REQUEST } from "../../redux/types";

function PostWrite() {
  const { isAuth, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [form, setValues] = useState({
    title: "",
    contents: "",
    fileUrl: "",
    creator: userId,
    category: "",
  });

  const onChange = (e) => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { title, contents, fileUrl, category, creator } = form;

    const token = localStorage.getItem("token");
    const body = { title, contents, fileUrl, category, creator, token };
    console.log("Body", body);
    dispatch({
      type: POST_UPLOADING_REQUEST,
      payload: body,
    });
  };

  const getDataFromCKEditor = (event, editor) => {
    const data = editor.getData();
    console.log("data", data);

    if (data && data.match("<img src=")) {
      const whereImg_start = data.indexOf("<img src=");
      let whereImg_end = "";
      let ext_name_find = "";
      let result_Img_Url = "";

      const ext_name = ["jpeg", "png", "jpg", "gif"];

      for (let i = 0; i < ext_name.length; i++) {
        if (data.match(ext_name[i])) {
          ext_name_find = ext_name[i];
          whereImg_end = data.indexOf(`${ext_name[i]}`);
        }
      }

      if (ext_name_find === "jpeg") {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
      } else {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
      }

      console.log(result_Img_Url, "result_Img_Url");
      setValues({
        ...form,
        fileUrl: result_Img_Url,
        contents: data,
      });
    } else {
      setValues({
        ...form,
        fileUrl: process.env.REACT_APP_BASIC_IMAGE_URL,
        contents: data,
      });
    }
  };

  return (
    <div>
      {isAuth ? (
        <Form onSubmit={onSubmit}>
          <FormGroup className="mb-3">
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="category">Category</Label>
            <Input
              type="text"
              name="category"
              id="category"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="content">Content</Label>

            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              onReady={Myinit}
              onBlur={getDataFromCKEditor}
            />
            <Button
              color="success"
              block
              className="mt-3 col-md-2 offset-md-10 mb-3"
            >
              제출하기
            </Button>
          </FormGroup>
        </Form>
      ) : (
        <Col width={50} className="p-5 m-5">
          <Progress animated color="info" value={100} />
        </Col>
      )}
    </div>
  );
}

export default PostWrite;
