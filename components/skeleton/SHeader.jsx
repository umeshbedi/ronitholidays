import React from 'react'
import {Skeleton, Row, Col} from 'antd'
export default function SHeader() {
  return (
    <div style={{ padding: '1% 5%', backgroundColor: 'white', }}>

      <Row>
        <Col span={18} push={6}>
          <Skeleton.Button active block />
        </Col>
        <Col span={6} pull={18} style={{}}>
        <Skeleton.Button active/>
        </Col>
      </Row>



    </div>
  )
}
