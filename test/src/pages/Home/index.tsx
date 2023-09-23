import { Button, Carousel, QRCode } from "antd"
import logo from '@/assets/logo.png'

const Home = () => {
  return (
    <div>
      <Carousel>
      <div>
          <div
            style={{
              height: '80vh',
              backgroundImage: 'url("https://wallpapercave.com/wp/wp6183625.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: "flex",
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className='container h-1/2 flex flex-col justify-end items-start p-4 gap-4'
            >
              <iframe className="w-1/3 rounded-md" height="315" src="https://www.youtube.com/embed/pgN-vvVVxMA" title="YouTube video player" allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
              <p className="font-bold text-[20px] font-mono text-white">XXXTENTACION</p>
              <p className="text-white">He was alone , i was alone </p>
              <Button type="primary">Now</Button>
            </div>
          </div>
        </div>

        <div>
          <div
            style={{
              height: '80vh',
              backgroundImage: 'url("https://i.pinimg.com/originals/39/4b/74/394b74903a0f569fc3d291e7b42e442f.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: "flex",
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className='container h-1/2 flex flex-col justify-end items-start p-4 gap-4'
            >
              <p className="font-bold text-[20px] font-mono">Sets two background images for the</p>
              <p>and Wireless System R & D Laboratory, Toshiba. Fi-Mi relies on lightweigh</p>
              <Button type="primary">Now</Button>
            </div>
          </div>
        </div>

        

        <div>
          <div style={{
            height: '80vh',
            backgroundImage: `url(${logo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center'
          }}
          >
            <div className='container h-1/2 flex flex-col justify-end items-start p-4 gap-4'
            >
              <h1 className="font-bold text-[20px] font-mono text-white">P - NLTHTCD</h1>
              <p className="text-white">and Wireless System R & D Laboratory, Toshiba. Fi-Mi relies on lightweigh</p>
              <Button type="primary">Now</Button>
            </div>
          </div>
        </div>
      </Carousel>
      <div className="colums-1 lg:columns-3 container mx-auto my-4">
        <div className="w-full h-[200px] p-2">
          <div className="w-full bg-white flex items-start p-2 rounded-md shadow-xl">
            <div className="h-full">
              <QRCode value='https://www.youtube.com/watch?v=lWA2pjMjpBs&list=RDlWA2pjMjpBs&start_radio=1' />
            </div>
            <div className="w-full p-3">
              <h1>Qr code</h1>
              <p>
                count automatically adjusting to accommodate that value.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[200px] p-2">
          <div className="w-full bg-white flex items-start p-2 rounded-md shadow-xl">
            <div className="h-full">
              <img className="h-[160px] w-[160px] object-cover"
                src="https://mts.ai/wp-content/uploads/Manin_bg_new-4.png"></img>
            </div>
            <div className="w-full p-3">
              <h1>AI</h1>
              <p>
                count automatically adjusting to accommodate that value.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[200px] p-2">
          <div className="w-full bg-white flex items-start p-2 rounded-md shadow-xl">
            <div className="h-full">
              <img src="https://aie.com.vn/wp-content/uploads/2020/09/in-3d-hop-kim-nhom.jpg"
                className="w-[160px] h-[160px] object-cover"></img>
            </div>
            <div className="w-full p-3">
              <h1>3D</h1>
              <p>
                count automatically adjusting to accommodate that value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home