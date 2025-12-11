import React from "react";
import { useState, useEffect } from "react";
import { fetchYouTubeTranscript } from "../services/transcript";
import LearningRight from "../components/learningRight";

const Learningpage = () => {
  const [link, setLink] = useState("");
  const [submittedLink, setSubmittedLink] = useState("");
  const [transcript, setTranscript] = useState([]);
  const [isLoadingTranscript, setIsLoadingTranscript] = useState(false);
  const [transcriptError, setTranscriptError] = useState("");
  const [videoId, setVideoId] = useState("");

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('learningPageData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setSubmittedLink(parsedData.submittedLink || "");
        setTranscript(parsedData.transcript || []);
        setVideoId(parsedData.videoId || "");
        setLink(parsedData.originalLink || "");
        setTranscriptError(parsedData.transcriptError || "");
      } catch (error) {
        console.log("Error loading saved data:", error);
        localStorage.removeItem('learningPageData');
      }
    }
  }, []);

  // Save data to localStorage whenever important state changes
  useEffect(() => {
    if (submittedLink || transcript.length > 0) {
      const dataToSave = {
        submittedLink,
        transcript,
        videoId,
        originalLink: link,
        transcriptError,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('learningPageData', JSON.stringify(dataToSave));
    }
  }, [submittedLink, transcript, videoId, link, transcriptError]);

  // Format time function for proper HH:MM:SS display
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    } else {
      return `${minutes}:${String(secs).padStart(2, '0')}`;
    }
  };

  // Clear saved data function
  const clearSavedData = () => {
    localStorage.removeItem('learningPageData');
    setSubmittedLink("");
    setTranscript([]);
    setVideoId("");
    setLink("");
    setTranscriptError("");
  };

  const handleChange = (e) => {
    setLink(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (link.trim() === "") {
  //     alert("Please paste a valid link!");
  //     return;
  //   }else if(link.startsWith("https:")){
  //     setSubmittedLink(link); 
  //     console.log("Submitted link:", link); 
  //   }else{
  //     console.log("You have entered wrong link")
  //   }
  // };



  // another try 


  //   const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (link.trim() === "") {
  //     alert("❌ Please paste a valid link!");
  //     return;
  //   } else if (link.startsWith("https://")) {
  //     // convert YouTube watch link → embed link
  //     let embedLink = link;
  //     if (link.includes("watch?v=")) {
  //       const videoId = link.split("watch?v=")[1].split("&")[0];
  //       embedLink = `https://www.youtube.com/embed/${videoId}`;
  //     }
  //     setSubmittedLink(embedLink);
  //   } else {
  //     alert("⚠️ Please enter a valid YouTube link (https://...)");
  //   }
  // };

  //anoter 


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (link.trim() === "") {
      alert("❌ Please paste a valid link!");
      return;
    }

    let embedLink = "";
    let extractedVideoId = "";

    // case 1: normal YouTube link
    if (link.includes("watch?v=")) {
      extractedVideoId = link.split("watch?v=")[1].split("&")[0];
      embedLink = `https://www.youtube.com/embed/${extractedVideoId}`;
    }
    // case 2: youtu.be short link
    else if (link.includes("youtu.be/")) {
      extractedVideoId = link.split("youtu.be/")[1].split("?")[0];
      embedLink = `https://www.youtube.com/embed/${extractedVideoId}`;
    }
    // case 3: mobile YouTube link (m.youtube.com)
    else if (link.includes("m.youtube.com/watch?v=")) {
      extractedVideoId = link.split("watch?v=")[1].split("&")[0];
      embedLink = `https://www.youtube.com/embed/${extractedVideoId}`;
    }

    if (embedLink && extractedVideoId) {
      setSubmittedLink(embedLink);
      setVideoId(extractedVideoId);
      
      // Fetch transcript
      setIsLoadingTranscript(true);
      setTranscriptError("");
      setTranscript([]);
      
      try {
        const transcriptData = await fetchYouTubeTranscript(extractedVideoId);
        if (transcriptData.success && transcriptData.transcript) {
          setTranscript(transcriptData.transcript);
        } else {
          setTranscriptError("No transcript available for this video");
        }
      } catch (error) {
        setTranscriptError("Failed to load transcript: " + error.message);
      } finally {
        setIsLoadingTranscript(false);
      }
    } else {
      alert("⚠️ Please paste a valid YouTube video link!");
    }
  };

  return (
    <div className="h-screen w-full">
      {!submittedLink ? (
        <div className="  h-screen flex gap-5 items-center flex-col  justify-center ">
        <div className="flex flex-col gap-3 items-center ">
          <p className="text-5xl font-bold">Hello Learners </p>
          <p className="text-2xl">Paste your link to get instant summery with personalized quizes</p>
        </div>
        <div className="flex flex-col items-center gap-2 ">
          <input onChange={handleChange} type="text" placeholder="Paste Your Link here" className=" rounded bg-green-500 border p-2 text-2xl w-130 h-13" />
          <button onClick={handleSubmit} className=" text-2xl font-semibold  bg-gray-500 hover:bg-gray-600 w-40 rounded p-2 text-center ">Submit </button> 
        </div>
      </div>
      ):(
        <div className="flex ">
          <div className="w-[75%]  h-screen">
            <div className="h-160 ">
               <div className=" h-full w-full">
                <iframe
               width="100%"
              height="100%"
              disablekb="0"
              controls="1"  
              src={submittedLink}
              title="Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe> 
               </div>
            </div>
            <div className="p-6 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Video Transcript</h2>
                <button 
                  onClick={clearSavedData}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  📹 New Video
                </button>
              </div>
              
              {isLoadingTranscript && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-3 text-gray-600">Loading transcript...</span>
                </div>
              )}
              
              {transcriptError && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                  <div className="flex">
                    <div className="text-red-400">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{transcriptError}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {transcript.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <div className="space-y-3">
                    {transcript.map((item, index) => (
                      <div key={index} className="bg-white rounded-md p-3 shadow-sm border-l-4 border-blue-500">
                        <div className="flex items-start justify-between">
                          <p className="text-gray-800 leading-relaxed flex-1">
                            
                            {item.text}
                          </p>
                          {item.start && (
                            <span className="text-xs text-gray-500 ml-3 whitespace-nowrap">
                              {formatTime(item.start)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {!isLoadingTranscript && !transcriptError && transcript.length === 0 && submittedLink && (
                <div className="text-center py-8 text-gray-500">
                  <p>No transcript data available for this video.</p>
                  <p className="text-sm mt-2">Try another video with available captions.</p>
                </div>
              )}
              
              {!submittedLink && (
                <div className="text-center py-8 text-gray-400">
                  <p>Submit a YouTube video link above to view its transcript here.</p>
                </div>
              )}
            </div>
          </div>
          <div className=" w-[25%]">
            <LearningRight/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learningpage;


