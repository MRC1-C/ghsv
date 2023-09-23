import { setOpenSibar } from '@/stores/features/appStateSlice'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div className='p-2 flex justify-between items-center bg-white'>
            <div className='flex items-start'>
                <MenuUnfoldOutlined className='text-black font-bold text-2xl cursor-pointer' onClick={() => dispatch(setOpenSibar(true))}/>
                {/* <Button onClick={() => dispatch(setOpenSibar(true))}>
                </Button> */}
                <p className='font-bold text-lg pl-2 cursor-pointer' onClick={() => navigate('/')}>CJ</p>
            </div>
            <div className='font-mono hidden sm:block text-[#7b5ea6] italic'>Trời xanh sắc chờ cơn mưa phùn như ta đang chờ đợi nàng</div>
        </div>
    )
}

export default Header