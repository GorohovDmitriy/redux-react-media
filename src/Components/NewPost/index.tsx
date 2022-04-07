import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  FcPicture,
  FcVideoCall,
  FcCheckmark,
  FcAddressBook,
} from "react-icons/fc";

import Field from "../../UI/Field";
import NewPostForm from "../NewPostForm";
import ImageView from "../../UI/ImageView";
import VideoView from "../../UI/VideoView";
import EmbedView from "../../UI/EmbedView";
import Spiner from "../Spiner";

import { storage } from "../../firebase";
import { addPost } from "../../redux/actions/postsActions";

import "./index.scss";

const NewPost: FC = () => {
  const dispatch = useDispatch();

  const [loaded, setloaded] = useState(false);
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
      setloaded(true);
      await uploadBytes(videoRef, event.target.files[0]).then(() => {
        getDownloadURL(videoRef).then((url) => {
          setDocument(url);
          setloaded(false);
        });
      });
    }
  };

  const handleChangeVideo = async (event: any) => {
    if (event.target.files[0]) {
      const videoRef = ref(storage, event.target.files[0].name);
      setloaded(true);
      await uploadBytes(videoRef, event.target.files[0]).then(() => {
        getDownloadURL(videoRef).then((url) => {
          setVideo(url);
          setloaded(false);
        });
      });
    }
  };

  const handleChangePicture = async (event: any) => {
    if (event.target.files[0]) {
      const imageRef = ref(storage, event.target.files[0].name);
      setloaded(true);
      await uploadBytes(imageRef, event.target.files[0]).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setUrl(url);
          setloaded(false);
        });
      });
    }
  };

  return (
    <div className="post">
      <NewPostForm
        changeHandler={changeHandler}
        emptyField={emptyField}
        value={value}
        submitHandler={submitHandler}
      />
      {loaded && <Spiner />}
      {url && <ImageView url={url} className="post__image" />}
      {video && <VideoView video={video} className="post__video" />}
      {document && <EmbedView embed={document} />}
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
};

export default NewPost;
