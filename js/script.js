// Main JavaScript Logic

document.addEventListener('DOMContentLoaded', () => {
    const videoUrlInput = document.getElementById('videoUrl');
    const clearBtn = document.getElementById('clearBtn');

    // Toggle clear button visible
    videoUrlInput.addEventListener('input', () => {
        clearBtn.style.display = videoUrlInput.value ? 'block' : 'none';
    });

    clearBtn.addEventListener('click', () => {
        videoUrlInput.value = '';
        clearBtn.style.display = 'none';
        document.getElementById('resultSection').style.display = 'none';
    });
});

// Helper function to extract YouTube Video ID
function extractVideoID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Process YouTube URL
function processVideo() {
    const urlInput = document.getElementById('videoUrl').value.trim();
    const videoId = extractVideoID(urlInput);

    if (!videoId) {
        showToast('कृपया एक सही YouTube Video URL दर्ज करें!');
        return;
    }

    // Show loader and hide old results
    document.getElementById('loader').style.display = 'block';
    document.getElementById('resultSection').style.display = 'none';

    // Simulate API Fetch Delay (1.5s)
    setTimeout(() => {
        // Set Preview Details dynamically using Youtube Thumbnail API
        document.getElementById('videoThumbnail').src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        document.getElementById('videoTitle').innerText = "YouTube Video #" + videoId + " - High Definition Media";
        document.getElementById('channelName').innerHTML = `<i class="fa-solid fa-circle-check"></i> Creator Channel`;
        document.getElementById('viewCount').innerText = (Math.floor(Math.random() * 900) + 100) + "K";
        document.getElementById('uploadDate').innerText = "हाल ही में अपलोड किया गया";

        document.getElementById('loader').style.display = 'none';
        document.getElementById('resultSection').style.display = 'block';
        showToast('वीडियो सफलतापूर्वक प्रोसेस हो गया है!');
    }, 1500);
}

// Handle Download Trigger
function triggerDownload(type, quality) {
    showToast(`डाउनलोड शुरू हो रहा है: ${type.toUpperCase()} (${quality})`);
    
    // Demo Download simulation
    setTimeout(() => {
        showToast(`आपका ${type} (${quality}) फ़ाइल सफलतापूर्वक डाउनलोड हो गया!`);
    }, 2000);
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}
