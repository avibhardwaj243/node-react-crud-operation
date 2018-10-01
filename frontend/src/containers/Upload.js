import React, { Component } from 'react';
import '../App.css';
import constant from '../Environment/Constants.js';

class Upload extends Component {
	constructor(props) {
		super(props);

		this.state = {
			imageURL: ''
		};

		this.handleUploadImage = this.handleUploadImage.bind(this);
	}

	handleUploadImage(ev) {
            ev.preventDefault();
            const data = new FormData();
            data.append('file', this.uploadInput.files[0]);
            data.append('filename', this.fileName.value);
            
            const requestURL = constant.BACKEND_URL + 'user/upload';
            fetch(requestURL, {
                    method: 'POST',
                    body: data
            }).then(response => {
                response.json().then(body => {
                    this.setState({ imageURL: constant.BACKEND_URL+`${body.file}` });
                });
            });
        }

	render() {
		return (
			<div className="App">
				<h1 className="display-3">FileUploads</h1>
				<form onSubmit={this.handleUploadImage}>
					<div>
						<input multiple ref={ref => {this.uploadInput = ref;}} type="file"/>
					</div>
					<br />
					<div>
						<input ref={ref => {this.fileName = ref;}} type="text" placeholder="Enter the desired name of file" />
					</div>
					<br />
					<div>
						<button className="btn btn-success">Upload</button>
					</div>
					<hr />
					<p>Uploaded Image:</p>
					<img src={this.state.imageURL} alt="img" />
				</form>
			</div>
		);
	}
}
export default Upload;
