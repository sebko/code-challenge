import { InfoWindow } from 'react-google-maps'
import React, { Component } from 'react'

class Marker extends Component {
  state = {
    isInfoWindowOpen: false,
  }
  toggleInfoWindow = () => {
    this.setState(({ isInfoWindowOpen }) => ({
      isInfoWindowOpen: !isInfoWindowOpen,
    }))
  }
  render() {
    const { isInfoWindowOpen } = this.state
    return (
      <Marker {...this.props}>
        <div>
          {isInfoWindowOpen && (
            <InfoWindow onCloseClick={this.toggleInfoWindow}>
              <div>hello</div>
            </InfoWindow>
          )}
        </div>
      </Marker>
    )
  }
}

export default Marker
