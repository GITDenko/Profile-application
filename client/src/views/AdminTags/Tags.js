import React, { useState } from "react";
import { Stack, Table, Button } from "react-bootstrap";
import { DeleteModal, EditModal, PostModal } from "./modalTags";
import "../../index.css";
import { Input, Icon } from "semantic-ui-react";
import { handleTagShow } from "./TagGlobalStates";

const showDel = "showTagDelete";
const showEdit = "showTagEdit";
const showPost = "showTagPost";

const Tags = (props) => {
  const [filteredTags, setTagFilter] = useState("");
  const [postData, setPostData] = useState(null);
  const getPostData = (val) => {
    setPostData(val.target.value);
  };
  return (
    <div className="container">
      <h2>{props.title}</h2>
      <Table striped bordered>
        <tbody>
          <tr>
            <th>Search</th>
            <th>Create</th>
          </tr>
          <tr>
            <td>
              <Input
                id="filteredTags"
                name="filteredTags"
                type="text"
                placeholder="Search"
                value={filteredTags}
                onChange={(input) => setTagFilter(input.target.value)}
                icon={"search"}
              />
            </td>
            <td>
              <Stack direction="horizontal" gap={3}>
                <Input icon placeholder="Create" onChange={getPostData}></Input>
                <Button variant="success">
                  <Icon
                    name="add"
                    onClick={() => handleTagShow(showPost, postData)}
                  />
                </Button>
              </Stack>
            </td>
          </tr>
        </tbody>
      </Table>
      <Table striped bordered responsive="sm">
        <thead>
          <tr>
            <th scope="col">Total: {props.tags.length}</th>
            <th scope="col">{props.type}</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.tags
            .filter(
              (f) =>
                f.name.toLowerCase().includes(filteredTags.toLowerCase()) ||
                filteredTags === ""
            )
            .map((tag, i) => (
              <tr key={i}>
                <th scope="row">{tag.id}</th>
                <td>{tag.name}</td>
                <td>
                  <Button
                    variant="dark"
                    onClick={() => handleTagShow(showEdit, tag.name, tag.id)}
                  >
                    <Icon name="edit" />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleTagShow(showDel, tag.name, tag.id)}
                  >
                    <Icon name="trash alternate" />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <PostModal url={props.url} showPost={showPost} />
      <EditModal url={props.url} showEdit={showEdit} />
      <DeleteModal url={props.url} showDel={showDel} />
    </div>
  );
};

export default Tags;
