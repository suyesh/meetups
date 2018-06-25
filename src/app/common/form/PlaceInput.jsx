import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete from 'react-places-autocomplete';
import { googleApiKey } from '../../../config';

class PlaceInput extends Component {
  state = {
    scriptloaded: false
  }

  handleScriptLoaded = () => {
    this.setState({scriptLoaded: true})
  }

  render(){
    const { input, width, onSelect, placeholder, options, meta: {touched, error}} = this.props
    return(
      <Form.Field error={touched && !!error} width={width}>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`}
          onLoad={this.handleScriptLoaded}
        />
        {this.state.scriptLoaded &&
          <PlacesAutocomplete
            inputProps={{ ...input, placeholder}}
            options={options}
            onSelect={onSelect}
          />
        }
        {touched && error && <Label basic color='red'>{error}</Label>}
      </Form.Field>
    )
  }
}

export default PlaceInput
