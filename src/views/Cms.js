import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup,
} from "shards-react";
import { Link } from 'react-router-dom'; 
import { getPostShortList, deletePost } from "../api";

class Cms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        posts: []
    };
  }

  componentDidMount = async () => {
    this.fetchPosts();
  }

  fetchPosts = async () => {
    const posts = await getPostShortList();
    this.setState({posts: posts ? posts.data : []})
  }

  deletePost = async (postId) => {
    const res = await deletePost(postId);
    this.setState({
      postDeleted: true
    })
    this.fetchPosts();
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
        <Col lg={12}>
        
        </Col>
        <Col lg={12}>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0"><Link to={`/add-new-post`}>Create New Post</Link></h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" className="border-0">
                    Title
                  </th>
                  <th scope="col" className="border-0">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.posts.map((post, idx) => (
                    <tr>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>
                            <ButtonGroup size="sm">
                                {/*<Button theme="white">
                                <span className="text-success">
                                    <i className="material-icons">check</i>
                                </span>{" "}
                                Publish
                                </Button>*/}
                                <Button theme="white" onClick={() => this.deletePost(post.id)}>
                                  <span className="text-danger">
                                      <i className="material-icons">clear</i>
                                  </span>{" "}
                                  Delete
                                </Button>
                                <Button theme="white">
                                <span className="text-light">
                                    <i className="material-icons">more_vert</i>
                                </span>{" "}
                                <Link to={`/edit-post/${post.id}`}>Edit</Link>
                                </Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
        </Col>
        </Row>
      </Container>
    );
  }
}

export default Cms;
