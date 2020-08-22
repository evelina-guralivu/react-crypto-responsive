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
  Badge,
  Button,
  Alert
} from "shards-react";
import withStorage from "./../../components/common/WithStorage";
import { publishPost, getAllEductionTopics, getPostTagSearch, updatePost } from './../../api';

class SidebarActions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      session: '',
      postCreated: false,
      publisherId: null,
      isHidden: false,
      isDraft: false,
      slug: '',
      tagLine: '',
      searchLine: '',
      tags: [],
      educationalTopics: [],
      educationalTopicsSelected: [],
      suggestedTopicsSearchResults: [],
      tagSuggestions: [],
      showError: false,
    };
  }

  componentDidMount = async () => {
    this.setState({
      profile: JSON.parse(localStorage.getItem("user")),
      publishers: JSON.parse(localStorage.getItem("publishers")),
      visibility: false,
    })
    let topics = await getAllEductionTopics();
    this.setState({ educationalTopics: topics.data });
  }

  componentWillReceiveProps = () => {
    const { post } = this.props;
    if(post && post.tags.length !== this.state.tags.length && this.state.tags.length === 0){
      this.setState({
        tags: post.tags
      })
    }
    if(post){
      this.setState({
        isDraft: post.isDraft
      })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { post } = this.props;
    if(post && post.educationTopics.length !== this.state.educationalTopicsSelected.length && this.state.educationalTopicsSelected.length === 0){
      this.setState({
        educationalTopicsSelected: post.educationTopics.map(t => t.id)
      })
    }
  }

  publish = async () => {
    const data = {
      "publisherId": this.state.publisherId,
      "contentAvailabilityId": this.state.visibility ? 2 : 1, // 1 - false/public, 2 - true/member
      "isHidden": this.state.isHidden,
      "postContentTypeId": this.props.type ? 2 : 1, // 1 - false/Blog, 2 - true/Video
      "isDraft": this.state.isDraft,
      "title": this.props.title,
      "slug": this.state.slug,
      "excerpt": this.props.description,
      "content": this.props.content,
      "embeddedVideo": this.props.video,
      "image": this.props.image,
      "tags": this.state.tags.map(t => t.name),
      "suggestedPostIds": this.props.suggested.map(t => t.id),
      "educationTopicIds": this.state.educationalTopicsSelected
    };
    const res = await publishPost(data);
    if(res.status === 422){
      let errorString = '';
      if(!!res.data.validationErrors){
        Object.values(res.data.validationErrors).map(v => {
          errorString += v;
        })
      }
      this.setState({
        showError: true,
        errorText: errorString === '' ? res.data.error : errorString
      })
    }else{
      this.setState({
        postCreated: true,
        showError: false});
    }
  }

  selectEducational = (event, id) => {
    if (this.state.educationalTopicsSelected.includes(id)) {
      let temp = this.state.educationalTopicsSelected;
      const index = temp.indexOf(id);
      temp.splice(index, 1);
      this.setState({ educationalTopicsSelected: temp });
    } else {
      let temp = this.state.educationalTopicsSelected;
      temp.push(id);
      this.setState({ educationalTopicsSelected: temp });
    }
  }

  update = async () => {
    const data = {
      "title": this.props.title,
      "excerpt": this.props.description,
      "content": this.props.content,
      "tags": this.state.tags.map(t => t.name),
      "isDraft": this.state.isDraft,
      "suggestedPostIds": this.props.suggested.map(t => t.id),
      "educationTopicIds": this.state.educationalTopicsSelected,
    }
    //if(this.props.image.indexOf("http") === -1){
      data["image"] = this.props.image;
   // }
    const res = await updatePost(this.props.post.id, data);
    if(res.status === 422){
      let errorString = '';
      if(!!res.data.validationErrors){
        Object.values(res.data.validationErrors).map(v => {
          errorString += v;
        })
      }
      this.setState({
        showError: true,
        errorText: errorString === '' ? res.data.error : errorString
      })
    }else{
      this.setState({
        postUpdated: true,
        showError: false});
    }
  }

  visibility = () => {
    this.setState({ visibility: !this.state.visibility });
  }

  isHidden = () => {
    this.setState({ isHidden: !this.state.isHidden });
  }

  changePublisher = (event) => {
    this.setState({ publisherId: event.target.value });
  }

  setTags = async (event) => {
    const tag = event.target.value;
    this.setState({
      tagLine: tag,
    });
    let res = await getPostTagSearch(tag);
    if (res !== undefined) {
      this.setState({ tagSuggestions: res.data });
    }
  }

  clearTags = () => {
    this.setState({
      tagLine: '',
      tagSuggestions: []
    });
  }

  addTag = (tag) => {
    let tags = this.state.tags;
    tags.push(tag);
    this.setState({ tags: tags });
    this.clearTags();
  }

  tagKeyPress = (e) => {
    if(e.keyCode === 13){
      let val = e.target.value;
      this.addTag({
        name: val});
    }
  }

  removeTag = (tag) => {
    console.log(tag);
    let tags = this.state.tags;
    tags = tags.filter(t => t.name !== tag.name);
    this.setState({ tags: tags });
  }

  changeStatus = (event) => {
    this.setState({ isDraft: event.target.value === 'true'});
  }

  render() {
    const user = this.props.load("user");
    return (
      <React.Fragment>
        <Card className="mb-3">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Options</h6>
          </CardHeader>
          <CardBody className="p-0">
            <ListGroup flush>
              {user && user.userRoleId === 1 && <ListGroupItem className="p-3">
                <span className="d-flex mb-2">
                  <i className="material-icons mr-1">money</i>
                  <strong className="mr-1">Content Availability:</strong>{" "}
                  <FormCheckbox toggle small checked={this.state.visibility} onChange={this.visibility}>
                    {this.state.visibility ? "Paid" : "Free"}
                  </FormCheckbox>
                </span>
                <span className="d-flex mb-2">
                  <i className="material-icons mr-1">visibility</i>
                  <strong className="mr-1">Is Hidden:</strong>{" "}
                  <FormCheckbox toggle small checked={this.state.isHidden} onChange={this.isHidden}>
                    {this.state.isHidden ? "Hidden" : "Visible"}
                  </FormCheckbox>
                </span>
                <span className="d-flex mb-2">
                  <label htmlFor="feInputState">Publish on behalf of</label>
                  <FormSelect id="feInputState" onChange={this.changePublisher}>
                    <option>Choose...</option>
                    {this.state.publishers && this.state.publishers.map((publisher) => (
                      <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
                    ))}
                  </FormSelect>
                </span>
              </ListGroupItem>}
              
              <ListGroupItem className="p-3">
              <label htmlFor="feInputState">Status</label>
              <span className="d-flex mb-2">
                <FormSelect id="feInputState" onChange={this.changeStatus}>
                  <option selected={this.state.isDraft === true} value={true}>Draft</option>
                  <option selected={this.state.isDraft === false} value={false}>Published</option>
                </FormSelect>
              </span>
              <label htmlFor="feInputState">Tags</label>
              <InputGroup seamless>
                <FormInput size="lg"  placeholder="Search ..." onKeyDown={this.tagKeyPress} onChange={this.setTags} value={this.state.tagLine} />
                <InputGroupAddon type="append">
                  <InputGroupText onClick={this.clearTags}>
                    <i className="material-icons">clear</i>
                  </InputGroupText>
                </InputGroupAddon>
                </InputGroup>
                <ListGroup small flush className="list-group-small">
                  {this.state.tagSuggestions.map((tag) => (
                    <ListGroupItem key={tag.id} className="d-flex px-3" onClick={() => this.addTag(tag)}>
                      <span className="text-semibold text-fiord-blue">{tag.name}</span>
                    </ListGroupItem>
                  ))}
                </ListGroup>
                <br />
                {this.state.tags.map((tag) => (
                  <Badge pill className={`card-post__category badge-content-tag`}><i class="material-icons mr-1 tag-remove" onClick={() => this.removeTag(tag)}>close</i> {tag.name}</Badge>
                ))}
                <br />
              </ListGroupItem>
              <ListGroupItem className="d-flex px-3 border-0">
                {!this.props.post && <Button theme="accent" size="sm" className="ml-auto" onClick={this.publish}>
                  <i className="material-icons">file_copy</i> Publish
                </Button>}
                {!!this.props.post && <Button theme="accent" size="sm" className="ml-auto" onClick={this.update}>
                  <i className="material-icons">file_copy</i> Update
                </Button>}
              </ListGroupItem>
            </ListGroup>
          </CardBody>
          {this.state.postCreated && <Alert className="mb-0">
            <i className="fa fa-info mx-2"></i> Post created!
      </Alert>}
      {this.state.postUpdated && <Alert className="mb-0">
            <i className="fa fa-info mx-2"></i> Post updated!
      </Alert>}
      {this.state.showError && <Alert className="mb-0">
            <i className="fa fa-error mx-2"></i>{this.state.errorText}
      </Alert>}
        </Card>
        
        <Card className="mb-3">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Education</h6>
          </CardHeader>
          <CardBody className="p-0">
            <ListGroup flush>
              <ListGroupItem className="p-3">
                <fieldset>
                  {this.state.educationalTopics.map((topic) => (
                    <FormCheckbox checked={this.state.educationalTopicsSelected.includes(topic.id)} key={topic.id} value={topic.id} onChange={e => this.selectEducational(e, topic.id)}>{topic.name}</FormCheckbox>
                  ))}
                </fieldset>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
};

export default withStorage(SidebarActions);
