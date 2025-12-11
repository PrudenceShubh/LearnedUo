const { fetchTranscript } = require("youtube-transcript-plus");

const transcriptFetcher = async (req, res) => {
    try {
        // Get video ID from URL params or request body
        const video_id = req.params.videoId || req.body.videoId || req.body.id;
        
        if (!video_id) {
            return res.status(400).json({
                success: false,
                error: "Video ID is required"
            });
        }
        
        // Fetch transcript data
        const transcriptdata = await fetchTranscript(video_id, { lang: 'en' });
        
        // Send response
        res.json({
            success: true,
            videoId: video_id,
            transcript: transcriptdata,
            message: "Transcript fetched successfully"
        });
        
    } catch (error) {
        console.error("Transcript fetch error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch transcript",
            details: error.message
        });
    }
};

module.exports = transcriptFetcher;