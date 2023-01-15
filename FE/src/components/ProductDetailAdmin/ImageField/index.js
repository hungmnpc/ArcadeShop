import { faImages } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import style from "./ImageField.module.scss";

const cx = classNames.bind(style);


function ImageField({images}) {
    return ( <div className={cx('wrapper')}>
        <div className={cx('title')}>
            <span>Images</span>
        </div>
        <div className={cx('contents')}>
            {
                images.length === 0 ? (<div className={cx('image-btn')}>
                <FontAwesomeIcon icon={faImages} className={cx('icon')} />
                <span>Add Images</span>
            </div>) : (<div className={cx('images')}>
                <div className={cx('main-image')}>
                    <img src={images[0]} alt="main"/>
                </div>
                <div className={cx('child-images')}>
                    {
                        images.slice(1).map((image, index) => {
                            return (
                                <div className={cx('child-image')} key={index}>
                                    <img src={image} alt='child' />
                                </div>
                            )
                        })
                    }
                    {
                        images.slice(1).length < 8 && 
                        <div className={cx('image-btn-small')}>
                            <div>
                                <span>

                                    <FontAwesomeIcon icon={faPlus} />
                                </span>

                            </div>
                        </div>
                    }
                </div>
            </div>)
            }
            
        </div>
    </div> );
}

export default ImageField;