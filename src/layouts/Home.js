import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'

class Home extends React.Component {
  constructor(props) {
    super()
    this.state = {}
    this.schoolData = this.getSchoolData()
    this.gradeData = ['Khối 10', 'Khối 11', 'Khối 12']
  }

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          {this.gradeData.map((gradeName, grade) => {
            let ret = [<Grid item xs={12}><h3>{gradeName}</h3></Grid>]
            this.schoolData[grade].forEach(cla => {
              ret.push(<Grid item xs={12} md={4} lg={3}>
                <Card>
                  <CardHeader
                    action={
                      <Button>Xem</Button>
                    }
                    title={cla.name}
                    subheader={gradeName}
                  />
                </Card>
              </Grid>)
            })
            return ret
          })}
        </Grid>
      </div>
    );
  }

  getSchoolData() {
    return [
      [
        {code: '10toan1', name: '10 Toán 1'},
        {code: '10toan2', name: '10 Toán 2'},
        {code: '10ly1', name: '10 Lý 1'},
        {code: '10ly2', name: '10 Lý 2'},
        {code: '10hoa1', name: '10 Hóa 1'},
        {code: '10hoa2', name: '10 Hóa 2'},
        {code: '10tin', name: '10 Tin'},
        {code: '10sinh', name: '10 Sinh'},
        {code: '10van', name: '10 Văn'},
        {code: '10su', name: '10 Sử'},
        {code: '10dia', name: '10 Địa'},
        {code: '10anh1', name: '10 Anh 1'},
        {code: '10anh2', name: '10 Anh 2'},
        {code: '10phap', name: '10 Pháp'},
        {code: '10nga', name: '10 Nga'},
      ], [
        {code: '11toan1', name: '11 Toán 1'},
        {code: '11toan2', name: '11 Toán 2'},
        {code: '11ly1', name: '11 Lý 1'},
        {code: '11ly2', name: '11 Lý 2'},
        {code: '11hoa1', name: '11 Hóa 1'},
        {code: '11hoa2', name: '11 Hóa 2'},
        {code: '11tin', name: '11 Tin'},
        {code: '11sinh', name: '11 Sinh'},
        {code: '11van', name: '11 Văn'},
        {code: '11su', name: '11 Sử'},
        {code: '11dia', name: '11 Địa'},
        {code: '11anh1', name: '11 Anh 1'},
        {code: '11anh2', name: '11 Anh 2'},
        {code: '11phap', name: '11 Pháp'},
        {code: '11nga', name: '11 Nga'},
      ], [
        {code: '12toan1', name: '12 Toán 1'},
        {code: '12toan2', name: '12 Toán 2'},
        {code: '12ly1', name: '12 Lý 1'},
        {code: '12ly2', name: '12 Lý 2'},
        {code: '12hoa1', name: '12 Hóa 1'},
        {code: '12hoa2', name: '12 Hóa 2'},
        {code: '12tin', name: '12 Tin'},
        {code: '12sinh', name: '12 Sinh'},
        {code: '12van', name: '12 Văn'},
        {code: '12su', name: '12 Sử'},
        {code: '12dia', name: '12 Địa'},
        {code: '12anh1', name: '12 Anh 1'},
        {code: '12anh2', name: '12 Anh 2'},
        {code: '12phap', name: '12 Pháp'},
        {code: '12nga', name: '12 Nga'},
      ]
    ]
  }
}

export default Home
