import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useState } from "react";
import { images } from "../../assets/images";
import ModalUploadImage from "../ModalUploadImage";
import MyModal from "../MyModal";
import style from "./ModalImage.module.scss";

const cx = classNames.bind(style);

function ModalImage({ open, onOk, onCancel, value, setValue }) {

  const imageStore = [images.accessories.blaze_wireless_mouse, images.bannerImage, images.consoles.gameflow,
  images.consoles.playbox_xz, images.consoles.gameflow, images.couponImage1, images.accessories.mach_gaming_chair, images.controllers.raptor, images.consolesImage,
images.consoles.veritas_vr_set, images.gameStack];

  const [choosed, setChoosed] = useState([]);

  const onChoosed = (image) => {
    if (choosed.includes(image)) {
      setChoosed(choosed.filter(imageChoosed => imageChoosed !== image))
    } else {
      setChoosed([...choosed, image]);
    }
  }

  const [openModalUpload, setOpenModalUpload] = useState(false);  

  const onCloseModalUpload = () => {
    setOpenModalUpload(false);
  }


  return (<MyModal
    title="Choose Images"
    centered
    open={open}
    onOk={onOk}
    onCancel={onCancel}
    width={1500}
  >
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div onClick={() => setOpenModalUpload(true)} className={cx('image', 'new-image')}>
          <div>
            <span>
              <FontAwesomeIcon icon={faPlus} />
            </span>

          </div>

        </div>
        {
          imageStore.map((image, index) => {

            const isChoose = choosed.includes(image);

            return (
              <div onClick={() => { onChoosed(image) }} key={index} className={cx('image', [isChoose ? 'choosed' : ''])}>
                <span className={cx('choose-box')}>
                  <FontAwesomeIcon icon={isChoose ? faSquareCheck : faSquare} />
                </span>
                <img src={image} alt='child' />
              </div>
            )
          })
        }
      </div>
    </div>
    <ModalUploadImage open={openModalUpload} onOk={onCloseModalUpload} onCancel={onCloseModalUpload} />
  </MyModal>);
}

export default ModalImage;