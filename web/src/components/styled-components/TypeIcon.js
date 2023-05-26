import { BiCategoryAlt, BiBook } from 'react-icons/bi';
import { IoFastFoodOutline, IoPeopleOutline, IoAirplaneOutline } from 'react-icons/io5';
import { MdWorkOutline } from 'react-icons/md';
import { CgGym } from 'react-icons/cg';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function TypeIcon(props) {
  return <>
    {(() => {
      switch (props.type) {
        case 1: return <BiCategoryAlt {...props} />;
        case 2: return <IoFastFoodOutline {...props} />;
        case 3: return <MdWorkOutline {...props} />;
        case 4: return <IoPeopleOutline {...props} />;
        case 5: return <BiBook {...props} />;
        case 6: return <AiOutlineShoppingCart {...props} />;
        case 7: return <IoAirplaneOutline {...props} />;
        case 8: return <CgGym {...props} />;
        default: return <></>;
      }
    })()}
  </>
};
