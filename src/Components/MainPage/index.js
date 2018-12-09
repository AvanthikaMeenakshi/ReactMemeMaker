import React from 'react';
import Gallery from 'react-photo-gallery';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';


const photos = [
  { src: '/images/vict-baby.png', width: 4, height: 3 },
  { src: '/images/ned.jpeg', width: 5, height: 3 },
  { src: '/images/devilgirl.jpg', width: 4, height: 3 },
  { src: '/images/trump.jpg', width: 4, height: 3 }
];


class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
      modalIsOpen: false,
      toptext: "",
      bottomtext: ""
    };
  }

  changeText = (event) => {
    console.log(event.currentTarget.name, event.currentTarget.value)
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    }, () => {
      this.drawImageInCanvas();
    });
  }

  openImage = (event, obj) => {
    this.setState(prevState => ({
      currentImage: obj.index,
      toptext: "",
      bottomtext: "",
      modalIsOpen: !prevState.modalIsOpen
    }));
  }

  toggle = () => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }));
  }

  drawImageInCanvas = () => {
    const canvas = document.getElementById('image');
    if (canvas) {
      const context = canvas.getContext('2d');
      const image = photos[this.state.currentImage];
      const base_image = new Image();
      base_image.src = image.src;
      var wrh = base_image.width / base_image.height;
      var newWidth = canvas.width;
      var newHeight = newWidth / wrh;
      const { toptext, bottomtext } = this.state;
      console.log(toptext)
      base_image.onload = function(){
        context.canvas.height = newHeight;
        context.drawImage(base_image, 0, 0, newWidth, newHeight);
        context.font = "55px Impact";
        context.fillText(toptext, 0, 50);
      }
    }
  }

  render() {
    return (
      <div>
        <Gallery photos={photos} onClick={this.openImage} />
        <Modal className="meme-gen-modal" onOpened={this.drawImageInCanvas} isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <canvas width="600" id="image"></canvas>
          </ModalBody>
          <FormGroup>
            <Label for="toptext">Top Text</Label>
            <input type="text" name="toptext" id="toptext" placeholder="Add text to the top" onChange={this.changeText} />
          </FormGroup>
          <FormGroup>
            <Label for="bottomtext">Bottom Text</Label>
            <input type="text" name="bottomtext" id="bottomtext" placeholder="Add text to the bottom" onChange={this.changeText} />
          </FormGroup>
        </Modal>
      </div>
    )
  }
}

export default MainPage;
