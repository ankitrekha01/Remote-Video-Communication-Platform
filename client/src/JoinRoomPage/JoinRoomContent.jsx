import React, { useState } from "react";
import JoinRoomInputs from "./JoinRoomInputs";
// import ErrorMessage from "./ErrorMessage";
import { connect } from "react-redux";
// import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";
import {
  setConnectOnlyWithAudio,
  setIdentity,
  setRoomId,
} from "../store/actions";
import JoinRoomButton from "./JoinRoomButton";
import { useNavigate } from "react-router-dom";
import { getRoomExists } from "../utils/api";
import { toast } from "react-toastify";

const JoinRoomContent = (props) => {
  const {
    isRoomHost,
    // setConnectOnlyWithAudio,
    // connectOnlyWithAudio,
    setIdentityAction,
    setRoomIdAction,
  } = props;
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  // const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    setIdentityAction(nameValue);
    //joining the room
    if (isRoomHost) {
      createRoom();
    } else {
      await joinRoom();
    }
  };

  const joinRoom = async () => {
    const responseMessage = await getRoomExists(roomIdValue);

    const { roomExists, full } = responseMessage;

    if (roomExists) {
      if (full) {
        toast.warn("Meeting is full.Try again later.",{
          position: "bottom-center",
        })
      } else {
        //join meeting
        //saving meeting id in redux store
        setRoomIdAction(roomIdValue);
        navigate("/room");
      }
    } else {
      toast.error("Meeting not found.",{
        position: "bottom-center",
      })
      // setErrorMessage("Meeting not found. Check your meeting ID");
    }
  };

  const createRoom = () => {
    navigate("/room");
  };
  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setNameValue={setNameValue}
        nameValue={nameValue}
        setRoomIdValue={setRoomIdValue}
        isRoomHost={isRoomHost}
      />
      {/* <OnlyWithAudioCheckbox
        setConnectOnlyWithAudio={setConnectOnlyWithAudio}
        connectOnlyWithAudio={connectOnlyWithAudio}
      /> */}
      {/* <ErrorMessage errorMessage={errorMessage} /> */}
      <JoinRoomButton handleJoinRoom={handleJoinRoom} isRoomHost={isRoomHost} />
    </>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setConnectOnlyWithAudio: (onlyWithAudio) =>
      dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
    setIdentityAction: (identity) => dispatch(setIdentity(identity)),
    setRoomIdAction: (roomId) => dispatch(setRoomId(roomId)),
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(JoinRoomContent);
