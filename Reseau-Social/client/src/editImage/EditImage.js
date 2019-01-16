import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import path from 'path'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

class EditImage extends Component {

    _crop(){
      }

    render() {

        return(
            <div>
                <Cropper
                    ref='cropper'
                    src={'/uploads/' + path.basename(this.props.history.location.pathname)}
                    style={{height: 600, width: 600, marginLeft: '25%'}}
                    // Cropper.js options
                    aspectRatio={16 / 16}
                    guides={false}
                    crop={this._crop.bind(this)}
                    />
            </div>
        )

    }

}

export default withRouter(EditImage)
