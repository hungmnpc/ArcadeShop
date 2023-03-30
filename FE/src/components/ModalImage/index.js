import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ModalUploadImage from "../ModalUploadImage";
import MyModal from "../MyModal";
import style from "./ModalImage.module.scss";
import toast from 'react-hot-toast'
import { get, uploadImage } from "../../utils/request";

const cx = classNames.bind(style);

function ModalImage({ open, onOk, onCancel, value, setValue }) {

  const [imageStore, setImageStore] = useState([]);

  const [choosed, setChoosed] = useState([]);


  useEffect(() => {
    if (open) {
      get("/api/v1/images?availableString=true").then(response => {
        setImageStore(response.data)
      })
    }
  }, [open])

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

  const onOke = () => {
    
    const imageIds = choosed.map(image => image.id)
    setChoosed([])
    onOk(imageIds);
    onCancel();
  }



  const onUploadImage = (image) => {
    toast.promise(uploadImage(image), {
      loading: "Uploading...",
      success: 'Successfull!',
      error: "Error. Try again!"
    }).then(response => {
      setOpenModalUpload(false);
      get("/api/v1/images?availableString=true").then(response => {
        setImageStore(response.data)
      })

    }).catch(error => console.log(error))
  }


  return (<MyModal
    title="Choose Images"
    centered
    open={open}
    onOk={onOke}
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
                <img src={`data:image/jpeg;base64,${image.imageBase64}`} alt='child' />
              </div>
            )
          })
        }
      </div>
    </div>
    <ModalUploadImage open={openModalUpload} onOk={onUploadImage} onCancel={onCloseModalUpload} />
  </MyModal>);
}

export default ModalImage;