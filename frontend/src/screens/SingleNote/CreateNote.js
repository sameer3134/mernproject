import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateNote({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  console.log(note);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/record");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create  Record">
      <Card>
        <Card.Header>Create new Patient Record

        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the Name"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Age</Form.Label>
              <Form.Control
                
                value={content}
                placeholder="Enter the Age"
                
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          

            <Form.Group controlId="content">
              <Form.Label>Medical History</Form.Label>
              <Form.Control
                type="content"
                as="textarea"
                value={category}
                rows={4}
                placeholder="Enter the Previous History"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
