import React from 'react'
import VideoButtons from './VideoButtons'

const BottomSection = ({ roomId,connectOnlyWithAudio }) => {
  return (
    <div className="bottom_section_container">
      <VideoButtons
        connectOnlyWithAudio={connectOnlyWithAudio}
        roomId={roomId}
        // isParticipantOrChat={isParticipantOrChat}
        // setIsParticipantOrChat={setIsParticipantOrChat}
      />
    </div>
  )
}

export default BottomSection;
