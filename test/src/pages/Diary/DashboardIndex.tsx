import React from 'react'
import DiaryComponent from './DiaryComponents'
const Product = [
  {
      "key": 1,
      "name1": "SimulatorWorld",
      "name2": "LL",
      "url_img": "https://thebiaslistcom.files.wordpress.com/2022/07/newjeans-attention.jpg?w=640",
      "link_figma": "https://thebiaslistcom.files.wordpress.com/2022/07/newjeans-attention.jpg?w=640"
  },
  {
      "key": 2,
      "name1": "SimulatorWorld",
      "name2": "LL111",
      "url_img": "https://thebiaslistcom.files.wordpress.com/2022/07/newjeans-attention.jpg?w=640",
      "link_figma": "https://thebiaslistcom.files.wordpress.com/2022/07/newjeans-attention.jpg?w=640"
  },
  {
      "key": 3,
      "name1": "SimulatorWorld",
      "name2": "LL",
      "url_img": "https://thebiaslistcom.files.wordpress.com/2022/07/newjeans-attention.jpg?w=640",
      "link_figma": "https://thebiaslistcom.files.wordpress.com/2022/07/newjeans-attention.jpg?w=640"
  },
  {
      "key": 4,
      "name1": "SimulatorWorld",
      "name2": "LL",
      "url_img": "https://thebiaslistcom.files.wordpress.com/2022/07/newjeans-attention.jpg?w=640",
      "link_figma": "https://thebiaslistcom.files.wordpress.com/2022/07/newjeans-attention.jpg?w=640"
  },
  {
      "key": 5,
      "name1": "SimulatorWorld",
      "name2": "LL",
      "url_img": "https://thebiaslistcom.files.wordpress.com/2022/07/newjeans-attention.jpg?w=640",
      "link_figma": "https://thebiaslistcom.files.wordpress.com/2022/07/newjeans-attention.jpg?w=640"
  },
  {
      "key": 6,
      "name1": "SimulatorWorld",
      "name2": "LL",
      "url_img": "https://thebiaslistcom.files.wordpress.com/2022/07/newjeans-attention.jpg?w=640",
      "link_figma": "https://thebiaslistcom.files.wordpress.com/2022/07/newjeans-attention.jpg?w=640"
  }
]

const DashboardIndex = () => {
  return (
    <div className="container m-auto grid grid-cols-1 md:grid-cols-6 gap-10">
      {/* <div className="col-span-1"></div> */}
      <div className="col-span-6 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7 mt-6">
        {Product.map((pr) => (
          <DiaryComponent {...pr} />
        ))}
        {/* {Product.map((pr) => (
          <DiaryComponent {...pr} />
        ))}
        {Product.map((pr) => (
          <DiaryComponent {...pr} />
        ))} */}
      </div>
      {/* <div className="col-span-1"></div> */}
    </div>
  )
}

export default DashboardIndex