import React, { Component } from 'react'

export default class Other extends Component {

	render(){
			{/* -------React - Routing(match object)-------- */}
		let { path, url } = this.props.match
		return (
			<div>
				<h1>Hello, you have successfully opened this page</h1>
			<h2>this is the path on match object</h2>
				{path}
				<h3>this is the url on match object</h3>{url}
			</div>
		)
	}
}