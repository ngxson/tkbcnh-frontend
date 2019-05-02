import React from 'react';
import TextField from '@material-ui/core/TextField'
import example from '../assets/example.jpg'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import Resizer from 'react-image-file-resizer'

class Admin extends React.Component {
  constructor(props) {
    super()
    this.props = props
    this.state = {
      password: '',
      grade: '',
      publishDate: '2019-01-01',
      image: false
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  doUpload() {
    if (!this.state.image) {
      return this.props.dialog.current.show({
        open: true,
        title: 'Có lỗi xảy ra',
        text: 'Bạn chưa chọn file để upload'
      })
    }
    if (this.image === '' || this.state.grade === '' || this.state.publishDate === '2019-01-01') {
      return this.props.dialog.current.show({
        open: true,
        title: 'Có lỗi xảy ra',
        text: 'Bạn chưa điền đầy đủ thông tin'
      })
    }

    this.props.doUpload({
      password: this.state.password,
      grade: parseInt(this.state.grade),
      publishDate: (new Date(this.state.publishDate)).getTime(),
      image: this.state.image,
    })
  }

  onFileAdded(event) {
    var fileInput = false
    if (event.target.files[0]) {
        fileInput = true
    }
    if (fileInput) {
      let height = Math.floor(860 * 1.5)
      let width = Math.floor(1400 * 1.5)
      Resizer.imageFileResizer(
        event.target.files[0],
        width, height, 'JPEG', 100, 0,
        uri => {
          uri = uri.replace(/data:image\/[a-z]+;base64,/, '')
          this.setState({image: uri})
        }, 'base64'
      )
    }
  }

  render() {
    var classes = {
      input: {
        marginBottom: '20px',
        width: '500px',
        maxWidth: '100%'
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      }
    }

    return (
      <div>
        <h1>Upload thời khóa biểu</h1>
        <TextField
          label="Password"
          type="password"
          value={this.state.password}
          style={classes.input}
          onChange={this.handleChange('password')}
          margin="normal"
          required
        />
        <br />
        <FormControl required className={classes.formControl} style={classes.input}>
          <InputLabel htmlFor="age-required">Khối</InputLabel>
          <Select
            onChange={this.handleChange('grade')}
            value={this.state.grade}
            name="grade"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={0}>Khối 10</MenuItem>
            <MenuItem value={1}>Khối 11</MenuItem>
            <MenuItem value={2}>Khối 12</MenuItem>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <br />
        <TextField
          id="date"
          label="Có hiệu lực từ ngày"
          type="date"
          style={classes.input}
          defaultValue={this.state.publishDate}
          onChange={this.handleChange('publishDate')}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <br />
        <p>Lưu ý, phần mềm sẽ cắt ảnh thành 15 x 6 ô bằng nhau, tương ứng với 15 lớp và 6 ngày học. Vì vậy, trước khi upload, bạn phải cắt hết các phần thừa ngoài bảng đi.<br/>
        Bạn nên sử dụng ứng dụng <b>CamScanner</b> để làm việc này. Ảnh sau khi cắt sẽ như sau: <a href={example} target='_blank' rel="noopener noreferrer">[ Xem ví dụ ]</a></p>
        <p>Chọn ảnh để upload:</p>
        <input type="file" onChange={this.onFileAdded.bind(this)}/>
        <br />
        <br />
        <br />
        <br />
        <Button variant="contained" color="primary" onClick={this.doUpload.bind(this)}>
          Tải lên
        </Button>
      </div>
    );
  }
}

export default Admin