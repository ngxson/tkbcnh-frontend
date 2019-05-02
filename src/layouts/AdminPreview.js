import React from 'react'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Config from '../Config'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

class AdminPreview extends React.Component {
  constructor(props) {
    super()
    this.props = props
    this.state = {
      images: null
    }

    this.getImages().then(images => {
      this.setState({images})
    })
  }

  btnCancel() {
    window.location.href = '/admin'
  }

  btnPublish() {
    this.props.dialog.current.show({
      open: true,
      title: 'Bạn có chắc chắn muốn publish?',
      text: 'Bấm OK để xác nhận',
      onClose: this.props.doPublish
    })
  }

  async getImages() {
    var images = await axios.get(`${Config.FIREBASE_URL}/upload/${this.props.parent.uploadedKey}/image.json`)
    var result = []
    if (images.data.error) {
        this.props.dialog.current.show({
        title: 'Có lỗi xảy ra',
        text: images.data.error.toString()
      })
    } else {
      result = Object.keys(images.data).map(classCode => {
        return {
          code: classCode,
          image: images.data[classCode]
        }
      })
    }
    return result
  }

  render() {
    var styles = {
      img: {
        width: '500px',
        maxWidth: '100%',
      }
    }

    return (
      <div>
        <h2>Hãy kiểm tra kết quả</h2>
        <p>Hãy kiểm tra chắc chắn rằng:<br />
          1. Ảnh không bị lệch<br />
          2. Thứ tự các lớp đúng<br />
          3. Ảnh bạn upload đã đúng với khối này chưa?<br /><br />
          Sau khi đã kiểm tra kỹ tất cả, hãy bấm nút <b>Publish</b> ở cuối trang<br />
          Hoặc nếu có sai sót, hãy bấm nút <b>Hủy bỏ</b> để upload lại cái mới
        </p>
        {
          this.state.images === null ? <center><CircularProgress /></center>
          : this.state.images.map(data => {
            return <div key={data.code}>
              <p>
                __________________________<br />
                <b>{data.code} :</b>
              </p>
              <img src={data.image} style={styles.img} />
            </div>
          })
        }
        {this.state.images !== null
          ? <div><br /><br />
            <Button variant="contained" color="secondary" onClick={this.btnCancel.bind(this)}>
              <DeleteIcon />&nbsp;&nbsp;
              Hủy bỏ
            </Button>&nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="primary" onClick={this.btnPublish.bind(this)}>
              <CloudUploadIcon />&nbsp;&nbsp;
              Publish
            </Button>
          </div>
          : null}
      </div>
    )
  }
}

export default AdminPreview