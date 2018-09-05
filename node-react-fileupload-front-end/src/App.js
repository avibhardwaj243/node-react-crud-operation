import React, { Component } from 'react';

import './App.css';

class App extends Component {
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

		fetch('http://localhost:4000/user/upload', {
			method: 'POST',
			body: data
		}).then(response => {
			response.json().then(body => {
				this.setState({ imageURL: `http://localhost:4000/${body.file}` });
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
export default App;
