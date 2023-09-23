import { useNavigate } from "react-router-dom";
import logo from '@/assets/logo.png'


type DiaryProps = {
    name1: string,
    name2: string,
    url_img: string
}

const DiaryComponent = (props: DiaryProps) => {
    const { name1, name2, url_img } = props
    const navigate = useNavigate();
    return (
        <div
            className="p-4 w-full shadow-xl shadow-primary rounded-lg transition ease-in-out delay-100 hover:scale-105 bg-white cursor-pointer"
            onClick={() => navigate("/diary/" + name1)}
        >
                <img
                    src={url_img}
                    alt="product"
                    className="w-full h-[246px] rounded-lg object-cover"
                />
                <div className="flex justify-between items-center pt-3">
                    <div>
                        <p className="text-[18px] text-[#111029] font-bold pt-3">{name1}</p>
                        <p className="text-[18px] text-[#111029] font-light">{name2}</p>
                    </div>
                    <img src={logo} className="object-cover rounded-[50%]" height={30} width={30} />
                </div>
        </div>
    );
};

export default DiaryComponent