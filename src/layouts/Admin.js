import React from 'react';
import AdminUpload from './AdminUpload'
import AdminPreview from './AdminPreview'
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
      uploadedData: {},
      uploadedKey: ''
    }
    this.dialog = React.createRef()
    console.log(Config)
  }

  doUpload(data) {
    this.setState({screen: 'loading'})
    axios.post(`${Config.BACKEND}/tkbcnh/upload`, data).then(res => {
      if (res.data.error === 'auth') {
        this.showError('Bạn nhập sai mật khẩu')
        this.setState({screen: 'upload'})
      } else if (!res.data.key) {
        this.showError('Hãy kiểm tra lại các thông tin')
        this.setState({screen: 'upload'})
      } else {
        this.setState({
          screen: 'preview',
          uploadedData: data,
          uploadedKey: res.data.key,
        })
      }
    }).catch(() => {
      this.showError('Lỗi mạng, không thể kết nối tới máy chủ')
      this.setState({screen: 'upload'})
    })
  }

  doPublish() {
    this.setState({screen: 'loading'})
    let data = {
      password: this.state.uploadedData.password,
      key: this.state.uploadedKey,
      publishDate: this.state.uploadedData.publishDate,
      grade: this.state.uploadedData.grade,
    }
    axios.post(`${Config.BACKEND}/tkbcnh/publish`, data).then(res => {
      if (res.data.error) {
        this.setState({screen: 'preview'})
        this.showError('Lỗi máy chủ, xin hãy thông báo với lập trình viên')
      } else {
        this.dialog.current.show({
          title: 'Thành công',
          text: 'TKB mới đã được phát hành',
          onClose: () => window.location.href = '/admin'
        })
      }
    }).catch(() => {
      this.setState({screen: 'preview'})
      this.showError('Lỗi mạng, không thể kết nối tới máy chủ')
    })
  }

  showError(msg) {
    this.dialog.current.show({
      title: 'Có lỗi xảy ra',
      text: msg
    })
  }

  render() {
    var screens = {
      upload: <AdminUpload doUpload={this.doUpload.bind(this)} dialog={this.dialog} />,
      loading: <center>
        <br/><br/><br/><br/>
        <CircularProgress />
        <br/><br/>
        <p>Xin chờ...</p>
      </center>,
      preview: <AdminPreview doPublish={this.doPublish.bind(this)} dialog={this.dialog} parent={this.state} />
    }

    return (<div>
      {screens[this.state.screen]}
      <AlertDialog ref={this.dialog} />
    </div>)
  }
}

export default Admin