import React, { useState, useEffect } from 'react';
import { MytourResister } from 'api/Mypage/MyGuide';
import styles from './TourRegist.module.css';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function TourRegist() {
  const [images, setImages] = useState([]); //투어 이미지
  const [selectedImages, setSelectedImages] = useState([]);
  const [showImages, setShowImages] = useState([]);

  var formData = new FormData();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('images check', images);
    const data = {
      title: '확인',
      content: '확인내용',
      price: 100,
      languages: ['한국어', '중국어'],
      howManyDay: ['2', '3'],
      location: [{ title: '광안리', coordinates: [16.234, 122.0485] }],
      themeIds: [4],
      availableDates: ['2023-10-15']
    };
    // formData.append('tourProductRequest', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    // images.forEach((image, index) => {
    //   formData.append('files', image);
    //   // console.log(image);
    // });
    formData.append('tourProductRequest', data);
    formData.append('files', images);
    MytourResister(formData);
    // navigate('/tour/tourlist');
  };

  const onShowImagesHandler = (event) => {
    const imagesList = event.target.files;
    console.log('이미지 뭐야', event);
    const showlist = [...showImages];
    const list = [...images];

    if (imagesList.length + showlist.length > 10) {
      alert('이미지는 10개까지 등록 가능합니다.');
      return;
    }

    for (let i = 0; i < imagesList.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(imagesList[i]);
      list.push([imagesList[0]]);
      setImages(list);
      reader.onload = (e) => {
        const imageURL = e.target.result;
        // const base64data = reader.result;

        if (showlist.includes(imageURL)) {
          alert('이미 선택된 이미지입니다');
        } else {
          showlist.push(imageURL);
          setShowImages(showlist);
          // list.push(base64data);
          setSelectedImages([...selectedImages], { imgPath: imageURL });
        }
      };
    }
    // handleImageChange(event);
  };

  // const handleImageChange = (e) => {
  //   const files = e.target.files;
  //   const allFiles = Array.from(files);
  //   // console.log('files', files);
  //   // console.log('allFiles', allFiles);
  //   // console.log('images', images);

  //   Promise.all(
  //     allFiles.map((file) => {
  //       return new Promise((resolve, reject) => {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file);
  //         reader.onload = () => resolve(reader.result);
  //         reader.onerror = (error) => reject(error);
  //       });
  //     })
  //   )
  //     .then((base64Files) => {
  //       setImages(base64Files);
  //     })
  //     .catch((e) => {
  //       console.error('file reading error', e);
  //     });
  // };

  const onRemoveImage = (index) => {
    const deleteImage = [...showImages];
    deleteImage.splice(index, 1);
    setShowImages(deleteImage);
  };
  return (
    <div style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container" style={{ padding: '70px 0' }}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.content}>
              <div className={styles.subtitle}>투어 대표 이미지</div>
              {/* 이미지  */}
              <label htmlFor="input-file" className="inputfile">
                <WallpaperIcon />
                <span style={{ margin: '5px' }}>업로드 이미지 선택</span>
                <input
                  type="file"
                  multiple
                  id="input-file"
                  style={{ display: 'none' }}
                  accept=".jpg,.jpeg,.png"
                  onChange={onShowImagesHandler}
                />
              </label>
            </div>
            {/* 미리보기 이미지 렌더링 */}
            <div className={styles.imageRow}>
              {showImages.length > 0 &&
                showImages?.map((image, index) => (
                  <div key={index} className={styles.imageContainer}>
                    <RemoveCircleOutlineIcon
                      style={{ paddingTop: '5px', paddingLeft: '5px', color: 'red' }}
                      onClick={() => onRemoveImage(index)}
                    />
                    <img src={image} alt={`Preview ${index}`} className={styles.image} />
                  </div>
                ))}
            </div>
            <div className={styles.flex}>
              <button type="submit" className={styles.submit}>
                글 작성하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TourRegist;
