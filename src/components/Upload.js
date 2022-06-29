import React, { useState } from 'react'

/* ライブラリ */
import { uploadImage } from "../lib/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUpload } from '@fortawesome/free-solid-svg-icons';

function Upload({ userImage, onSletctedImage }) {
    const [isModal, setIsModal] = useState(false);
    const active = isModal ? "is-active" : "";
    const [imageUrl, setImageUrl] = useState(userImage);

    const handleImage = async event => {
        const image = event.target.files[0];
        const imageUrl = await uploadImage(image);
        onSletctedImage(imageUrl);
        setImageUrl(imageUrl);
    };

    const handleClick = () => {
        setIsModal(!isModal);
    };

    const ImageViewer = () => {
        if (!imageUrl) {
            return <FontAwesomeIcon icon={faUser} />
        } else {
            return (
                <div>
                    <img src={imageUrl} alt="/" />
                </div>
            )
        }
    }

    return (
        <div className="App">
            <div className={`modal ${active}`}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="file is-boxed" >
                        <label className="file-label">
                            <input className="file-input" type="file" name="resume" onChange={handleImage} />
                            <span className="file-cta">
                                <span className="file-icon">
                                    <FontAwesomeIcon icon={faUpload} />
                                </span>
                                <span className="file-label">画像を選択してください</span>
                            </span>
                        </label>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={handleClick}></button>
                </div>
            </div>
            <button onClick={handleClick} className="button is-primary is-inverted">
                <span className="icon">
                    <ImageViewer />
                </span>
            </button>
        </div >
    );
}

export default Upload