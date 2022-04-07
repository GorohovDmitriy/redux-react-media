import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  FcPicture,
  FcVideoCall,
  FcCheckmark,
  FcAddressBook,
} from "react-icons/fc";

import Field from "../../UI/Field";
import Input from "../../UI/Input";

import { storage } from "../../firebase";
import { addPost } from "../../redux/actions/postsActions";
import { RootState } from "../../redux/store";

import "./index.scss";

const NewPost: FC = React.memo(() => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [emptyField, setEmptyField] = useState(false);
  const [url, setUrl] = useState<any>(null);
  const [video, setVideo] = useState<any>(null);
  const [document, setDocument] = useState<any>(null);
  const [value, setValue] = useState("");

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (value.trim() !== "") {
      dispatch(addPost(value, url, video, document));
      setValue("");
      setUrl(null);
      setVideo(null);
      setDocument(null);
    } else {
      setEmptyField(true);
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (value.trim() !== "") {
      setEmptyField(false);
    }
  };

  const handleChangeDocument = async (event: any) => {
    if (event.target.files[0]) {
      const videoRef = ref(storage, event.target.files[0].name);
      await uploadBytes(videoRef, event.target.files[0])
        .then(() => {
          getDownloadURL(videoRef)
            .then((url) => {
              setDocument(url);
            })
            .catch((error) =>
              console.log(error.message, "error missing the image url")
            );
        })
        .catch((error) => console.log(error.message));
    }
  };

  const handleChangeVideo = async (event: any) => {
    if (event.target.files[0]) {
      const videoRef = ref(storage, event.target.files[0].name);
      await uploadBytes(videoRef, event.target.files[0])
        .then(() => {
          getDownloadURL(videoRef)
            .then((url) => {
              setVideo(url);
            })
            .catch((error) =>
              console.log(error.message, "error missing the image url")
            );
        })
        .catch((error) => console.log(error.message));
    }
  };

  const handleChangePicture = async (event: any) => {
    if (event.target.files[0]) {
      const imageRef = ref(storage, event.target.files[0].name);
      await uploadBytes(imageRef, event.target.files[0])
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setUrl(url);
            })
            .catch((error) =>
              console.log(error.message, "error missing the image url")
            );
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <div className="post">
      <form className="post__form" onSubmit={submitHandler}>
        <img src={`${user?.image}`} alt={`${user?.displayName}`} />
        <Input
          value={value}
          onChange={changeHandler}
          type="text"
          placeholder="Start a post"
          className={!emptyField ? "post__input" : "post__input__empty"}
        />
      </form>
      {url && <img src={url} alt="New" className="post__image" />}
      {video && <video className="post__video" src={video} controls autoPlay />}
      {document && <embed src={document} className="post__image" />}
      <div className="post__group">
        <Field
          svg={<FcVideoCall size={20} />}
          className="post__file"
          type="file"
          accept="video/*"
          onChange={handleChangeVideo}
        />
        <Field
          svg={<FcPicture size={25} />}
          className="post__file"
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleChangePicture}
        />
        <Field
          svg={<FcAddressBook size={25} />}
          className="post__file"
          type="file"
          accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleChangeDocument}
        />
        <div className="post__file__send">
          <p onClick={submitHandler}>
            <FcCheckmark size={25} />
          </p>
        </div>
      </div>
    </div>
  );
});

export default NewPost;
