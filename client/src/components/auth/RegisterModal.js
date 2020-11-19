import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, ModalBody, ModalHeader, NavLink } from "reactstrap";
import { CLEAR_ERROR_REQUEST, REGISTER_REQUEST } from "../../redux/types";

function RegisterModal() {
  const [modal, setModal] = useState(false);
  const [form, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [localMsg, setLocalMsg] = useState("");
  const { errorMsg } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST,
    });

    setModal(!modal);
  };

  const onChange = () => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    e.preventDefault();
    const { name, email, password } = form;
    const newUser = { name, email, password };
    console.log("newUser", newUser);
    dispatch({
      type: REGISTER_REQUEST,
      payload: newUser,
    });
  };

  useEffect(() => {
    try {
      setLocalMsg(errorMsg);
    } catch (e) {
      console.log(e);
    }
  }, [errorMsg]);

  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>회원가입</ModalHeader>
        <ModalBody>
          {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={onChange}
            />

            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={onChange}
            />

            <Label for="name">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={onChange}
            />

            <Button color="dark" className="mt-2" block>
              Register
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default RegisterModal;
