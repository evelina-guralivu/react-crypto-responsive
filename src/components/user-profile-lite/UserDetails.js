import React from "react";
import {
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  Container,
  Button
} from "shards-react";
import classnames from 'classnames';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import withStorage from "./../../components/common/WithStorage";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { uploadAvatar, getUser } from "../../api";

class UserDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      modal: false,
    }
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
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

  uploadAvatar = async () => {
    const data = {
      "cropProperties": {
        "x": 0,
        "y": 0,
        "width": 80,
        "height": 80
      },
      "original": this.state.croppedImageUrl ? this.state.croppedImageUrl : this.state.src,
      "medium": this.state.croppedImageUrl ? this.state.croppedImageUrl : this.state.src,
      "small": this.state.croppedImageUrl ? this.state.croppedImageUrl : this.state.src
    }
    let res = await uploadAvatar(this.state.user.id, data);
    if(res.status === 200){
      this.setState({
        updateOk: true
      })
      let userRes = await getUser(this.state.user.id);
      if(userRes.status === 200){
        localStorage.setItem("user", JSON.stringify(userRes.data));
      }
    }
  }

  confirmImage = () => {
    this.uploadAvatar();
    this.setState({
      modal: false,
      src: null,
      croppedImageUrl: null,
    })
  }

  render() {
  const {activeTab, toggleTab} = this.props;
  const { crop, croppedImageUrl, src } = this.state;
  return (
    <Container fluid className='px-4 user-profile-card'>
      <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Change Avatar</ModalHeader>
            <ModalBody>
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
                    {src && <Button className="btn-orange btn btn-accent" onClick={this.confirmImage}>Confirm</Button>  }
                </div>
            </ModalBody>
        </Modal>
      <Row className='align-center'>
        <Col lg="1" className='photo-top'>
          <div className="mx-auto">
            <img
              className="rounded-circle"
              src={localStorage.getItem("user") !== null && JSON.parse(localStorage.getItem("user")).avatar !== undefined ? JSON.parse(localStorage.getItem("user")).avatar.small : require("./../../images/avatars/0.jpg")}
              alt={this.state.user.name}
              width="80"
              height="80"
            />
            <img onClick={this.toggleModal} className="user-avatar-change" src="https://www.pngfind.com/pngs/m/70-704184_png-file-svg-pencil-edit-icon-png-transparent.png" alt="overlay" height="40" width="40"></img>
          </div>
        </Col>
        <Col lg='4'>
          <h4 className="mb-0">{this.state.user.name}</h4>
        </Col>
      </Row>
      <Row>
      <Col lg='12'>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'profile' })}
              onClick={() => { toggleTab('profile'); }}
            >
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'billing' })}
              onClick={() => { toggleTab('billing'); }}
            >
              Billing
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'change_pwd' })}
              onClick={() => { toggleTab('change_pwd'); }}
            >
              Change password
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'notifications' })}
              onClick={() => { toggleTab('notifications'); }}
            >
              Notifications
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'favorites' })}
              onClick={() => { toggleTab('favorites'); }}
            >
              Favorites
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'analysts' })}
              onClick={() => { toggleTab('analysts'); }}
            >
              Analyst Ratings
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
      </Row>
    </Container>
  )}
};

export default withStorage(UserDetails);