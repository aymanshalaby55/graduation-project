import { useVideoAnalysisContext } from '@/app/context/VideoAnalysisContext';

const ModelsResults = () => {
  const { videoAnalysisData, model }: any = useVideoAnalysisContext();

  return (
    <>
      <div className="border w-full h-[30rem] flex flex-col p-4 items-center gap-10">
        <h1 className="text-3xl">Model Results</h1>
        <div className="flex flex-col gap-5 justify-center items-center max-h-96 overflow-y-auto w-full">
          {model === 'vDetection' &&
            videoAnalysisData?.detected_frames &&
            // Render object model results
            videoAnalysisData.detected_frames.map((frame: any) => (
              <div key={frame.frame_number} className="frame-result">
                <h2>Frame {frame.frame_number}</h2>
                {frame.objects.map(({ object, index }: any) => (
                  <div key={index} className="object-info">
                    <p>Type: {object.type}</p>
                    <p>Confidence: {object.confidence.toFixed(2)}</p>
                  </div>
                ))}
                <p>Time: {frame.time}</p>
              </div>
            ))}

          {model === 'fDetection' && videoAnalysisData && (
            // Render fight detection results
            <div className="fight-result">
              <p>Detection Time: {videoAnalysisData?.detection_time}</p>
              {videoAnalysisData.fight_frames?.map(({ frame, index }: any) => (
                <div key={index} className="">
                  <h2>Frame Number: {frame?.frame_number}</h2>
                  <h2>Frame Time: {frame?.timestamp}</h2>
                </div>
              ))}
              {/* Add fight_percentage if you want to display it */}
              <p>
                Fight Percentage:{' '}
                {videoAnalysisData?.fight_percentage?.toFixed(2)}%
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModelsResults;
