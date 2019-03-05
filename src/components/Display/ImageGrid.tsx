import * as React from "react";
import { Component } from "react";

export interface Props {
  images: Array<any>;
}

export interface State {
  images: Array<any>;
}

/* const platsListStyles = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  justifyContent: "Center"
};
 */
const platCardStyle = {
  maxWidth: "30%",
  minWidth: "150px",
  flex: "1",
  margin: "5px"
};

class ImageGrid extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentWillUpdate(nextProps: Props, nextState: State) {
    if (nextProps.images !== this.props.images) {
      this.setState({
        images: nextProps.images
      });
    }
  }

  render() {
    //const isVisible = this.state.isVisible ? 'block' : 'hidden';
    const { images } = this.state;
    //console.log("ImageGrid", images);
    return (
      <div style={{
        textAlign: 'center',
      }}>
        <div className="col-sm-10 col-lg-11">
          <div className="row" style={{ maxHeight: "35vh", overflow: "auto" }}>
            {images.map((image, i) => {
              return (
                <div
                  key={i}
                  style={platCardStyle}
                  className="bp3-card bp3-elevation-0 bp3-interactive"
                >
                  <img
                    src={image.url}
                    style={{
                      minWidth: "100px",
                      maxWidth: "90%",
                      maxHeight: "100px"
                    }}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageGrid;
