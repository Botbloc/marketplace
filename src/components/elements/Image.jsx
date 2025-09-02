import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string
}

const defaultProps = {
  src: undefined,
  width: undefined,
  height: undefined,
  alt: undefined
}

class Image extends React.Component {

  state = {
    isLoaded: false,
  };

  image = React.createRef();

  componentDidMount() {
    const placeholderImage = document.createElement('img');
    this.handlePlaceholder(this.image.current, placeholderImage);
  }

  placeholderSrc = (w, h) => {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" style="fill:%23cccccc"%3E%3Crect width="${w}" height="${h}" /%3E%3C/svg%3E`;

  }

  handlePlaceholder = (img, placeholder) => {
    img.style.display = 'none';
    img.before(placeholder);
    placeholder.src = this.placeholderSrc(
      img.getAttribute('width') || 100,
      img.getAttribute('height') || 100
    );
    placeholder.width = img.getAttribute('width');
    placeholder.height = img.getAttribute('height');
    placeholder.style.opacity = '0';
    img.className && placeholder.classList.add(img.className);
    //console.log("img.className",img.className);
    //console.log("placeholder.classList",placeholder.classList);

    img.addEventListener('load', () => {
      placeholder.remove();
      img.style.display = '';
      this.setState({
        isLoaded: true
      })
    });

    img.addEventListener('error', (e) => {
      console.log("Error loading image:", e);
    });
  }

  render() {
    

    const {
      className,
      src,
      width,
      height,
      alt,
      ...props
    } = this.props;
   // {console.log("source: ",src)}

    return (
      <img
        {...props}
        ref={this.image}
        className={className}
        src={src}
        width={width}
        height={height}
        alt={alt} />
    );
  }
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;