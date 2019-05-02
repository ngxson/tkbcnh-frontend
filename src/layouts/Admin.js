import React from 'react';
import AdminUpload from './AdminUpload'
import axios from 'axios'
import Config from '../Config'
import CircularProgress from '@material-ui/core/CircularProgress'
import AlertDialog from '../components/AlertDialog'

class Admin extends React.Component {
  constructor(props) {
    super()
    this.props = props
    this.state = {
      screen: 'upload',
      uploaded: {}
    }
    this.dialog = React.createRef()
  }

  doUpload(data) {
    this.setState({screen: 'loading'})
    axios.post(`${Config.BACKEND}/tkbcnh/upload`, data).then(res => {
      if (res.error === 'auth') {
        this.dialog.current.show({
          title: 'Có lỗi xảy ra',
          text: 'Bạn nhập sai mật khẩu'
        })
        this.setState({screen: 'upload'})
      } else if (!res.key) {
        this.dialog.current.show({
          title: 'Có lỗi xảy ra',
          text: 'Hãy kiểm tra lại các thông tin'
        })
        this.setState({screen: 'upload'})
      } else {
        this.setState({
          screen: 'preview',
          uploaded: data,
          uploadedKey: res.key,
        })
      }
    })
  }

  render() {
    var screens = {
      upload: <AdminUpload doUpload={this.doUpload} dialog={this.dialog} />,
      loading: <center>
        <br/><br/><br/><br/>
        <CircularProgress />
        <br/><br/>
        <p>Xin chờ...</p>
      </center>
    }

    return (<div>
      {screens[this.state.screen]}
      <AlertDialog ref={this.dialog} />
    </div>)
  }
}

export default Admin