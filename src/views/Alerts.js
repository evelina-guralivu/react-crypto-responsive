/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  FormSelect,
  Row,
  Col,
  FormInput,
  Container,
  Card,
  CardBody,
  FormCheckbox,
  ListGroup,
  ListGroupItem,
  Button,
  Alert,
} from "shards-react";
import { Link } from "react-router-dom";
import Author from "../components/common/author";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import JoditEditor from "jodit-react";
import { getTradingUnit, createAlert, createFavoriteAlert, removeFavoriteAlert, getMemberAlerts, getWistiaConfig, createAlertUpdate, getMixedAlerts } from '../api';
import ReactCrop from 'react-image-crop';
import { Carousel } from 'react-responsive-carousel';
import 'react-image-crop/dist/ReactCrop.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const editorConfig = {
  uploader: {
    url: 'http://localhost:8181/pictureUpload'
  },
  toolbarAdaptive:false,
  buttons: [
      'source',
      '|',
      'bold',
      'strikethrough',
      'underline',
      'italic',
      'eraser',
      '|',
      'superscript',
      'subscript',
      '|',
      'ul',
      'ol',
      '|',
      'outdent',
      'indent',
      '|',
      'font',
      'fontsize',
      'brush',
      'paragraph',
      '|',
      'align',
      'undo',
      'redo',
  ],
  readOnly: false
}

export default class Alerts extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      alertType: true,
      units: [],
      selectedUnit: null,
      selectedDurability: 1,
      alerts: [],
      desc: '',
      image: '',
      currentPage: 0,
      contentType: false,
      wistiaConfig: null,
      updateMode: false,
      modal: false,
      attachments: [],
    };
  }

  componentDidMount = async () => {
    this.reloadData();
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  trackScrolling = async () => {
    const wrappedElement = document.getElementById('post-wrapper');
    if (this.isBottom(wrappedElement)) {
      let nextPage = this.state.currentPage + 1;
      let alerts;
      if(!this.state.user){
        alerts = await getMixedAlerts("*", "*", 10, nextPage);
      }else{
        alerts = await getMemberAlerts("*", "*", 10, nextPage);
      }
      let temp = this.state.alerts;
      let updated = temp.concat(alerts.data);
      this.setState({
        alerts: updated,
          currentPage: nextPage
      })
    }
  };

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  reloadData = async () => {
    let user;
    if(localStorage.getItem("user") !== null){
      user = JSON.parse(localStorage.getItem("user"));
    }
    let alerts;
    let units;
    let wistiaConfig;
    let publisherId = "*";
    if(this.props.location.state){
      publisherId = this.props.location.state.analyst;
    }
    if(user && (user.userRoleId === 1 || user.userRoleId === 3)){
      const res = await getWistiaConfig();
      wistiaConfig = res.data;
      alerts = await getMemberAlerts(publisherId, "*", 10, this.state.currentPage);
      units = await getTradingUnit();
      this.initVideoUpload(wistiaConfig);
    }
    if(user && user.userRoleId === 2){
      alerts = await getMemberAlerts(publisherId, "*", 10, this.state.currentPage);
    }
    if(!user){
      alerts = await getMixedAlerts(publisherId, "*", 10, this.state.currentPage);
    }
    this.setState({
      alerts: alerts.data,
      wistiaConfig: wistiaConfig,
      units: units ? units.data : null,
      user: user,
      attachments: [],
      desc: '',
      image: '',
      entry: '',
      target: '',
      stop: '',
    });
  }

  type = () => {
    this.setState({ alertType: !this.state.alertType });
  }

  publish = async () => {
    const data = {
      "alertDurabilityId": this.state.selectedDurability,
      "tradingUnitId": this.state.alertType ? this.state.selectedUnit : null,
      "isInformational": !this.state.alertType, 
      "entry": this.state.entry,
      "target": this.state.target,
      "stopLoss": this.state.stop,
      "content": this.state.desc,
      "attachments": this.state.attachments,
    }
    if(this.state.updateMode){
      data['alertId'] = this.state.updateAlert.id;
      let update = await createAlertUpdate(data);
      if(update.status === 200){
        this.setState({
          alertUpdated: true,
        })
      }
      this.reloadData();
    }else{
      const res = await createAlert(data);
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
          currentPage: 0,
          alertCreated: true,
          showError: false}, () => {
            this.reloadData();
          });
      }
    }
  }

  changeUnit = (event) => {
    this.setState({ selectedUnit: event.target.value });
  }

  changeType = (event) => {
    this.setState({ selectedDurability: event.target.value });
  }

  updateAlert = (alert) => {
    window.scrollTo(0,0);
    this.setState({
      updateMode: true,
      alertCreated: false,
      alertUpdated: false,
      entry: alert.entry,
      target: alert.target,
      stop: alert.stopLoss,
      updateAlert: alert,
      desc: alert.content,
      selectedUnit: alert.tradingUnit,
    })
  }

  initVideoUpload = (config) => {
    var self = this;
    window._wapiq = window._wapiq || [];
    window._wapiq.push((W) => {
      window.wistiaUploader = new W.Uploader({
        accessToken: config.accessToken,
        dropIn: "wistia_uploader-alt",
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
        this.state.attachments.push({
          alertAttachmentTypeId: 2,
          mediaId: media.id,
          thumbnailUrl: media.thumbnail.url,
          embedCode: embedCode
        })
      });
    });
  }

  setDescription = (event) => {
    this.setState({ desc: event });
  }

  clear = () => {
    this.setState({
      updateMode: false,
      entry: 0,
      target: 0,
      stop: 0,
      updateAlert: null,
      selectedUnit: 'Choose...'
    })
  }

  createFavoriteAlert = async (alert) => {
    this.state.alerts.forEach(a => {
      if(a.id === alert.id){
        a.isFavourite = alert.isFavourite ? false : true
      }
    })
    this.setState({
      alerts: this.state.alerts
    })
    if(alert.isFavourite){
      await removeFavoriteAlert(alert.id);
    }else{
      await createFavoriteAlert(alert.id);
    }
  }

  toggleUpdates = alert => {
    console.log(alert);
    this.state.alerts.forEach(a => {
      if(a.id === alert.id){
        a.updatesOpen = a.updatesOpen ? !a.updatesOpen : true;
      }
    })
    this.setState({
      alerts: this.state.alerts
    })
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

  confirmImage = () => {
    let attachment = {
      "alertAttachmentTypeId": 1,
      "title": "Image",
      "data": this.state.croppedImageUrl ? this.state.croppedImageUrl : this.state.src
    }
    this.state.attachments.push(attachment);
    this.setState({
      modal: false,
      attachments: this.state.attachments,
    }, () => {
      this.setState({
        src: null,
        croppedImageUrl: null,
      })
    })
  }

  removeAttachment = (att) => {
    if(att.alertAttachmentTypeId === 1){
      this.setState({
        attachments: this.state.attachments.filter(a => a.data !== att.data)
      })
    }
    if(att.alertAttachmentTypeId === 2){
      // handling to remove video
    }
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
      </Row>
      <Container className="main-content-container px-4" id={'post-wrapper'}>
          <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Image Upload</ModalHeader>
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
       {this.state.updateMode && <Alert className="mb-0">
            <i className="fa fa-info mx-2"></i>{`Updating alert created on ${this.state.updateAlert.createdAt}`}
            </Alert>}
       {this.state.user != null && this.state.user.userRoleId !== 2 && <Card small className="mb-3">
          <CardBody>
        <Row>
          <Col lg={6}>
            <FormCheckbox toggle small checked={this.state.alertType} onChange={this.type}>
              {this.state.alertType ? "Trade Alert" : "Informational"}
            </FormCheckbox>
            <JoditEditor
            	        ref={null}
                      value={this.state.desc}
                      config={editorConfig}
		                  tabIndex={1} // tabIndex of textarea
		                  onBlur={newContent => this.setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={newContent => {}}
                  />
          </Col>
          <Col lg={6}>
            <h6>Attachments</h6>
                <i className="fa fa-video mx-2 favorite-star"></i>
                <i className="fa fa-image mx-2 favorite-star" onClick={this.toggleModal}></i>
            <Row>
              <Col lg={12}>
                <div id="wistia_uploader-alt" ></div>
              </Col>
            </Row>
            <Row>
                <ListGroup small flush className="list-group-small">
                  {this.state.attachments.filter(att => att.alertAttachmentTypeId !== 2).map((att) => (
                    <ListGroupItem key={att.data.length} className="d-flex px-3" >
                      <div key={att.data.length} className="blog-comments__item d-flex p-3">
                      <i className="material-icons suggested-remove" onClick={() => this.removeAttachment(att)}>clear</i>
                      <div className="blog-comments__avatar mr-3">
                        <img src={att.data} alt={att.title} />
                      </div>
                      </div>
                      </ListGroupItem>
                  ))}
                </ListGroup>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <br />
            <label htmlFor="feInputState">Ticker</label>
            <FormSelect id="feInputState" onChange={this.changeUnit} value={this.state.selectedUnit}>
              <option>Choose...</option>
              {this.state.units.map((unit) => (
                <option key={unit.id} value={unit.id}>{unit.abbreviation}</option>
              ))}
            </FormSelect>
          </Col>
          <Col lg={3}>
            <br />
            <label htmlFor="feInputState">Type</label>
            <FormSelect id="feInputState" onChange={this.changeType}>
              <option>Choose...</option>
              <option value={2}>Short</option>
              <option value={1}>Long</option>
            </FormSelect>
          </Col>
        </Row>
        <Row>
          <Col lg={2}>
            <br />
            <label htmlFor="feInputState">Entry</label>
            <FormInput size="lg" className="mb-3" placeholder="0"
              value={this.state.entry}
              onChange={(text) => this.setState({ entry: text.target.value })}
            />
          </Col>
          <Col lg={2}>
            <br />
            <label htmlFor="feInputState">Target</label>
            <FormInput size="lg" className="mb-3" placeholder="0"
              value={this.state.target}
              onChange={(text) => this.setState({ target: text.target.value })} />
          </Col>
          <Col lg={2}>
            <br />
            <label htmlFor="feInputState">Stop Loss</label>
            <FormInput size="lg" className="mb-3" placeholder="0"
              value={this.state.stop}
              onChange={(text) => this.setState({ stop: text.target.value })} />
          </Col>
        </Row>
        </CardBody>
        <div className='area mb-2 mr-1'>
          <div className='buttons'>
          {this.state.updateMode && <Button
              theme=""
              className=''
              onClick={this.clear}>Clear</Button>}
            <Button
              theme="accent"
              className='btn-orange'
              onClick={this.publish}>Publish</Button>
          </div>
          </div>
          {this.state.showError && <Alert className="mb-0">
            <i className="fa fa-error mx-2"></i>{this.state.errorText}
      </Alert>}
      {this.state.alertUpdated && <Alert className="mb-0">
            <i className="fa fa-info mx-2"></i>Alert has been updated!</Alert>}
            {this.state.alertCreated && <Alert className="mb-0">
            <i className="fa fa-info mx-2"></i>Alert has been created!</Alert>}
        </Card>}
        <div className='add-comment'>
          <div className='comments'>
            {this.state.alerts.map((alert) => (
              <React.Fragment>
              <div className='comment-item white'>
                <Author
                  url={`/analyst/${alert.publisher.slug}`}
                  name={alert.publisher.name}
                  date={alert.createdAt}
                  avatar={alert.publisher.avatar.small}
                  badges={[
                    {
                      title: alert.publisher.isFeaturedContributor === 1 ? 'Featured contributor' : 'Analyst',
                      badge: alert.publisher.isFeaturedContributor === 1 ? 'badge-featured-analyst' : 'badge-analyst'
                    },
                    {
                      title: alert.isInformational ? 'Informational' : 'Alert',
                      badge: alert.isInformational ? 'badge-featured-analyst' : 'badge-analyst'
                    },
                ]}
                />

                <div className='comment-status'>
                  {alert.alertDurabilityId === 1 && <Button size="xs" className="mb-2 mr-1 btn-green">LONG</Button>}
                  {alert.alertDurabilityId === 2 && <Button size="xs" className="mb-2 mr-1 btn-red">SHORT</Button>}
                  {alert.tradingUnit && <Button outline size="xs" theme="dark" className="mb-2 mr-1">{`${alert.tradingUnit.abbreviation} - ${alert.tradingUnit.name}`}</Button>}
                  {this.state.user && alert.alertStatusId === 1 && <Button size="xs" className="mb-2 mr-1 btn-green">OPEN</Button>}
                  {this.state.user && alert.alertStatusId === 2 && <Button size="xs" className="mb-2 mr-1 btn-red">CLOSED</Button>}
                  {this.state.user && alert.publisher.id === this.state.user.id && <Button size="xs" theme="danger" className="mb-2 mr-1" onClick={() => this.updateAlert(alert)}>UPDATE</Button>}
                </div>
                <div className='comment-body'>
                <br/>
                  <p className='comment-text'>
                    {!this.state.user && <React.Fragment><br/><br/>
                        <div className="alerts-premium">Alerts are available only to registered members. Please check prices below.</div>
                        <Link to={'/prices'} className="alerts-premium-linear">
                          Become A Member 
                        </Link>
                        </React.Fragment>}
                      {this.state.user && !alert.content && <React.Fragment><br/><br/>
                        <div className="alerts-premium">Please renew your membership to be able to read the alerts.</div>
                        <Link to={'/user-profile'} className="alerts-premium-linear">
                          My Billing Area
                        </Link>
                        </React.Fragment>}
                    {this.state.user && alert.content && <React.Fragment><br/><br/><div dangerouslySetInnerHTML={{__html: alert.content}}></div></React.Fragment>}
                  </p>
                  <Carousel showArrows={true}>
                    {this.state.user && alert.attachments && alert.attachments.map((att) => (
                        <div>
                          {att.alertAttachmentTypeId === 1 && <img src={att.url} alt={att.title}></img>}
                          {att.alertAttachmentTypeId === 2 && <div className={"wistia_embed wistia_async_" + att.mediaId}></div>}
                        </div>
                    ))}
                  </Carousel>
                  <div>
                    <br/><br/><br/>
                    {alert.entry && <div className="alert-show-case">
                      <div className="d-flex flex-wrap">
                      <div class="mr-5 mt-2">
                          <label className="bl-label">Entry</label>
                          <input
                            className="bl-input"
                            disabled="" 
                            readonly="" 
                            value={alert.entry}
                          />
                           </div>
                           <div class="mr-5 mt-2">
                           <label className="bl-label">Target</label>
                          <input
                          className="bl-input"
                          disabled="" 
                          readonly="" 
                            value={alert.target}
                          />
                          </div>
                          <div class="mr-5 mt-2">
                            <label className="bl-label">Stop Loss</label>
                            <input
                            className="bl-input"
                            disabled="" 
                            readonly="" 
                              value={alert.stopLoss}
                            />
                            </div>
                      </div>
                    </div>}
                    <Row>
                      <div className='social alert-favorite pull-right'>
                      <span className='add-favorite'>
                        {this.state.user && <div className='link-social'>
                          <div class="rating">
                              {alert.isFavourite ? <span className="selected" onClick={() => this.createFavoriteAlert(alert)}>★</span> : <span onClick={() => this.createFavoriteAlert(alert)}>☆</span>}Favorite
                          </div>
                          </div>}
                      </span>
                      </div>
                    </Row>
                  </div>
                </div>
                </div>
                <React.Fragment>
                {this.state.user && alert.updates && alert.updates.length > 0 && <div className="show-hide-updates">
                      <div className="d-flex justify-content-center flex-wrap">
                      <div class="text-center toogle-update"><button class="btn-transparent" onClick={() => this.toggleUpdates(alert)}>{alert.updatesOpen ? "-Hide All Updates" : "+Show All Updates"}</button></div>
                      </div>
                    </div>}
                {this.state.user && alert.updates && alert.updatesOpen && alert.updates.map((update) => (
                  <Card className="update-container">
                    <Col lg={{ size: 12, offset: 0 }} >
                      <p><b>{update.createdAt}</b></p>
                      <p className='comment-text' dangerouslySetInnerHTML={{__html: update.content}}></p>
                      <Carousel showArrows={true}>
                        {update.attachments.map((att) => (
                          <div>
                                {att.alertAttachmentTypeId === 1 && <img src={att.url} alt={att.title}></img>}
                                {att.alertAttachmentTypeId === 2 && <div className={"wistia_embed wistia_async_" + att.mediaId}></div>}
                          </div>
                        ))}
                      </Carousel>
                      <br/><br/><br/>
                      <div className="alert-show-case">
                      <div className="d-flex flex-wrap">
                      <div class="mr-5 mt-2">
                          <label className="bl-label">Entry</label>
                          <input
                            className="bl-input"
                            disabled="" 
                            readonly="" 
                            value={update.entry}
                          />
                           </div>
                           <div class="mr-5 mt-2">
                           <label className="bl-label">Target</label>
                          <input
                          className="bl-input"
                          disabled="" 
                          readonly="" 
                            value={update.target}
                          />
                          </div>
                          <div class="mr-5 mt-2">
                            <label className="bl-label">Stop Loss</label>
                            <input
                            className="bl-input"
                            disabled="" 
                            readonly="" 
                              value={update.stopLoss}
                            />
                            </div>
                      </div>
                    </div>
                      </Col>
                    </Card>
                ))}
                </React.Fragment>
                </React.Fragment>
            ))}
          </div>
        </div>
      </Container>
      </Container>
    )
  }
};