import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  InputGroupText,
  InputGroup,
  FormCheckbox,
  InputGroupAddon,
  FormSelect,
  FormInput,
  Row,
  Col,
  Button,
  Container,
  Form
} from "shards-react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";
import SidebarActions from "../components/add-new-post/SidebarActions";
import JoditEditor from "jodit-react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { getWistiaConfig, getPost, getEducationalPosts } from "../api";
import "react-quill/dist/quill.snow.css";
import "../assets/quill.css";

const editorConfig = {
  uploader: {
    url: 'https://beta.api.bitcoin.live/api/post/content-image'
  },
  readOnly: false
}

class AddNewPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      content: '',
      image: '',
      contentType: false,
      wistiaConfig: null,
      embeddedVideo: null,
      publishers: [],
      suggestedPosts: [],
      suggestedPublisher: '',
      suggestedPostsSearchResults: [],
      src: null,
      modal: false,
      crop: {
        unit: '%',
        width: 30,
        aspect: 16 / 9,
      },
    };
  }

  componentDidMount = async () => {
    const postId = this.props.match.params.postId;
    let post;
    if(!!postId){
      post = await getPost(postId);
      const posts = post.data.suggestedPostIds.map(async (postId) => {
        let suggestedData = await getPost(postId);
        return suggestedData.data;
      })
      const suggestedPostsData = await Promise.all(posts);
      this.setState({
        post: post.data,
        postId: postId,
        title: post.data.title,
        description: post.data.excerpt,
        content: post.data.content,
        tags: post.data.tags,
        croppedImageUrl: post.data.image.original,
        suggestedPosts: suggestedPostsData
      })
    }
    const wistiaConfig = await getWistiaConfig();
    this.setState({
      wistiaConfig: wistiaConfig.data,
    });
  }

  addPost = (post) => {
    let posts = this.state.suggestedPosts;
    posts.push(post);
    this.setState({ suggestedPosts: posts});
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    let publishers = this.props.load("publishers")
    if (prevState.publishers.length === 0 && publishers && publishers.length !== 0) {
      this.setState({ publishers: publishers });
    }
  }

  clearSuggested = () => {
    this.setState({searchLine: '',
    suggestedPostsSearchResults: []});
  }

  searchSuggested = async (search) => {
    this.setState({
      searchLine: search.target.value,
    });
    let data = {
        "publisherIds": this.state.suggestedPublisher !== '' ? [this.state.suggestedPublisher] : [] ,
        "educationOnly": false,
        "searchString": search.target.value
    }
    const res = await getEducationalPosts(data, 10, 0);
    this.setState({ suggestedPostsSearchResults: res.data });
  }
  
  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  changeSuggestedPublisher = (event) => {
    this.setState({ suggestedPublisher: parseInt(event.target.value) }, () => {
      this.searchSuggested({
        target: {
          value: ''
        }
      });
    });
    
  }

  setTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  setDescription = (event) => {
    this.setState({ description: event});
  }

  contentType = () => {
    this.setState({ contentType: !this.state.contentType }, () => {
      if(this.state.contentType){
        this.initVideoUpload(this.state.wistiaConfig);
      }
    });
  }

  setContent = (event) => {
    this.setState({ content: event });
  }

  setSlug = (event) => {
    this.setState({ slug: event.target.value });
  }

  setImage = (event) => {
    var self = this;
    var files = event.target.files;
    var file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => { self.setState({ image: reader.result }) };
  }

  initVideoUpload = (config) => {
    var self = this;
    window._wapiq = window._wapiq || [];
    window._wapiq.push((W) => {
      window.wistiaUploader = new W.Uploader({
        accessToken: config.accessToken,
        dropIn: "wistia_uploader",
        projectId: config.projectId,
        projectName: config.projectName
      });
      window.wistiaUploader.bind('uploadembeddable', (file, media, embedCode, oembedResponse) => {
        self.setState({
          embeddedVideo: {
            mediaId: media.id,
            thumbnailUrl: media.thumbnail.url,
            embedCode: embedCode
          }
        })
      });
    });
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      const base64Image = canvas.toDataURL('image/jpeg');
      resolve(base64Image);
    });
  }

  removeSuggestedPost = (id) => {
    const posts = this.state.suggestedPosts.filter(p => p.id !== id);
    this.setState({
      suggestedPosts: posts
    })
  }

  render() {
    const { postId } = this.props.match.params;
    const { post, crop, croppedImageUrl, src } = this.state;
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          {!postId && <PageTitle sm="4" title={`Add New ${this.state.contentType ? 'Video' : 'Text'} Post`} subtitle="Blog Posts" className="text-sm-left" />}
          {postId && !!post && <PageTitle sm="4" title={`Editing ${this.state.post.title}`} subtitle="Blog Posts" className="text-sm-left" />}
        </Row>

        <Row>
          {/* Editor */}
          <Col lg="8" md="12">
            <Card className="mb-3">
              <CardBody>
                <Form className="add-new-post">
                  {!post && <span className="d-flex mb-2">
                    <strong className="mr-1">Content type:</strong>{" "}
                    <FormCheckbox toggle small checked={this.state.contentType} onChange={this.contentType}>
                      {this.state.contentType ? "Video" : "Text"}
                    </FormCheckbox>
                  </span>}
                  <FormInput size="lg" className="mb-3" placeholder="Your Post Title" onChange={this.setTitle} value={this.state.title} />
                  {!post && <FormInput size="lg" className="mb-3" placeholder="Slug" onChange={this.setSlug} value={this.state.slug} />}
                  Content
                  {!this.state.contentType && <JoditEditor
            	        ref={null}
                      value={this.state.content}
                      config={editorConfig}
		                  tabIndex={1} // tabIndex of textarea
		                  onBlur={newContent => this.setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={newContent => {}}
                  />}
                  {this.state.contentType && <div id="wistia_uploader" ></div>}
                  <br/>
                  Excerpt
                  <ReactQuill className="add-new-post__editor mb-1" onChange={this.setDescription} value={this.state.description} />
                  <br/>
                  <div className="custom-file mb-3">
                    <input type="file" className="custom-file-input" id="customFile2" onChange={this.onSelectFile} />
                    <label className="custom-file-label" htmlFor="customFile2">
                      Select image ...
                    </label>
                    {src && (
                      <ReactCrop
                        src={src}
                        crop={crop}
                        ruleOfThirds
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                      />
                    )}
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Card className="mb-3">
            <CardHeader className="border-bottom">
            <h6 className="m-0">Header Preview</h6>
          </CardHeader>
            <CardBody className="p-0">
            {croppedImageUrl && (
                      <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                    )}
                    <br/><br/>
              </CardBody>
            </Card>
            <Card className="mb-3">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Suggested Posts</h6>
          </CardHeader>
          <CardBody>
          <Row>
            <Button onClick={() => {this.setState({modal: true})}}>Search</Button>
          </Row>
          <Row>
          <ListGroup small flush className="list-group-small">
                {this.state.suggestedPosts.map((post) => (
                  <ListGroupItem key={post.id} className="d-flex px-3" >
                    <div key={post.id} className="blog-comments__item d-flex p-3">
                    <i className="material-icons suggested-remove" onClick={() => this.removeSuggestedPost(post.id)}>clear</i>
                    <div className="blog-comments__avatar mr-3">
                      <img src={post.image.small} alt={post.image.small} />
                    </div>
                    <div className="blog-comments__content">
                      <div className="blog-comments__meta text-mutes">
                        <Link className="text-secondary" to={post.url}>
                          {post.title}
                        </Link>
                      </div>
                      <p className="m-0 my-1 mb-2 text-muted">Published by {post.publisher.name} on {post.publishedAt}</p>
                      </div>
                      </div>
                    </ListGroupItem>
                ))}
              </ListGroup>
            </Row>
          </CardBody>
        </Card>
          </Col>

          {/* Sidebar Widgets */}
          <Col lg="4" md="12">
            <SidebarActions suggested={this.state.suggestedPosts} post={this.state.post} title={this.state.title} description={this.state.description} content={this.state.content} image={this.state.croppedImageUrl === undefined ? this.state.url : this.state.croppedImageUrl} type={this.state.contentType} video={this.state.embeddedVideo}  />
          </Col>
        </Row>

        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Suggested Post Selection</ModalHeader>
          <ModalBody>
          <ListGroup flush>
              <ListGroupItem className="p-3">
                  <span className="d-flex mb-2">
                  <FormSelect id="feInputState" onChange={this.changeSuggestedPublisher}>
                    <option>Choose publisher ...</option>
                    {this.state.publishers.map((publisher) => (
                      <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
                    ))}
                  </FormSelect>
                </span>
                <InputGroup seamless>
                <FormInput size="lg" placeholder="Search term ..." onChange={this.searchSuggested} value={this.state.searchLine}/>
                  <InputGroupAddon type="append">
                  <InputGroupText onClick={this.clearSuggested}>
                    <i className="material-icons">clear</i>
                  </InputGroupText>
                </InputGroupAddon>
                </InputGroup>
              </ListGroupItem>
              <br />
              <ListGroupItem className="p-3">
              <ListGroup small flush className="list-group-small">
                  {this.state.suggestedPostsSearchResults.map((post) => (
                    <ListGroupItem key={post.id} className="d-flex px-3" >
                      <div key={post.id} className="blog-comments__item d-flex p-3">
                    <FormCheckbox className="mb-1" onChange={() => this.addPost(post)} checked={this.state.suggestedPosts.map(t => t.id).indexOf(post.id) !== -1}></FormCheckbox>
                    <div className="blog-comments__avatar mr-3">
                      <img src={post.image.small} alt={post.image.small} />
                    </div>
                    {/* Content */}
                    <div className="blog-comments__content">
                      {/* Content :: Title */}
                      <div className="blog-comments__meta text-mutes">
                        <Link className="text-secondary" to={post.url}>
                          {post.title}
                        </Link>
                      </div>
                      <p className="m-0 my-1 mb-2 text-muted">Published by {post.publisher.name} on {post.publishedAt}</p>
                      </div>
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </ListGroupItem>
            </ListGroup>
          </ModalBody>
        </Modal>
      </Container>
    )
  }
};

export default AddNewPost;
