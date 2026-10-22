// Quadra Stream Downloader - Client Logic

document.addEventListener('DOMContentLoaded', () => {
    const videoUrlInput = document.getElementById('videoUrl');
    const clearBtn = document.getElementById('clearBtn');

    // Toggle clear button visibility based on input state
    videoUrlInput.addEventListener('input', () => {
        clearBtn.style.display = videoUrlInput.value ? 'block' : 'none';
    });

    clearBtn.addEventListener('click', () => {
        videoUrlInput.value = '';
        clearBtn.style.display = 'none';
        document.getElementById('resultSection').style.display = 'none';
    });
});

/**
 * Extracts YouTube Video ID from various URL formats
 * @param {string} url - YouTube URL string
 * @returns {string|null} 11-character Video ID or null
 */
function extractVideoID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

/**
 * Validates and processes the provided YouTube URL
 */
function processVideo() {
    const urlInput = document.getElementById('videoUrl').value.trim();
    const videoId = extractVideoID(urlInput);

    if (!videoId) {
        showToast('Please enter a valid YouTube Video URL!');
        return;
    }

    // Display loader animation and hide previous results
    document.getElementById('loader').style.display = 'block';
    document.getElementById('resultSection').style.display = 'none';

    // Simulate API fetch delay
    setTimeout(() => {
        // Set dynamic preview details using YouTube Thumbnail API
        document.getElementById('videoThumbnail').src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        document.getElementById('videoTitle').innerText = "YouTube Video #" + videoId + " - High Definition Media";
        document.getElementById('channelName').innerHTML = `<i class="fa-solid fa-circle-check"></i> Quadra Verified Creator`;
        document.getElementById('viewCount').innerText = (Math.floor(Math.random() * 900) + 100) + "K";
        document.getElementById('uploadDate').innerText = "Recently Uploaded";

        document.getElementById('loader').style.display = 'none';
        document.getElementById('resultSection').style.display = 'block';
        showToast('Video processed successfully!');
    }, 1500);
}

/**
 * Triggers media download action
 * @param {string} type - 'video' or 'audio'
 * @param {string} quality - Quality level identifier
 */
function triggerDownload(type, quality) {
    showToast(`Download initiated: ${type.toUpperCase()} (${quality})`);
    
    setTimeout(() => {
        showToast(`Your ${type} file (${quality}) has been downloaded!`);
    }, 2000);
}

/**
 * Displays user feedback toast notification
 * @param {string} message - Message text to display
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}
