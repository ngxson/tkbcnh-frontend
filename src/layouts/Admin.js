import React from 'react';
import AdminUpload from './AdminUpload'

class Admin extends React.Component {
  constructor(props) {
    super()
    this.props = props
    this.state = {}
  }

  doUpload(data) {
    console.log(data)
  }

  render() {
    return (
      <AdminUpload doUpload={this.doUpload} />
    );
  }
}

export default Admin