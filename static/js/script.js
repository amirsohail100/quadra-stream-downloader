// Quadra Stream Downloader - Real API Client Script

document.addEventListener('DOMContentLoaded', () => {
    const videoUrlInput = document.getElementById('videoUrl');
    const clearBtn = document.getElementById('clearBtn');

    videoUrlInput.addEventListener('input', () => {
        clearBtn.style.display = videoUrlInput.value ? 'block' : 'none';
    });

    clearBtn.addEventListener('click', () => {
        videoUrlInput.value = '';
        clearBtn.style.display = 'none';
        document.getElementById('resultSection').style.display = 'none';
    });
});

function extractVideoID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

async function processVideo() {
    const urlInput = document.getElementById('videoUrl').value.trim();
    const videoId = extractVideoID(urlInput);

    if (!videoId) {
        showToast('Please enter a valid YouTube Video URL!');
        return;
    }

    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loaderText');
    const resultSection = document.getElementById('resultSection');

    loaderText.innerText = "Extracting video metadata via Quadra Backend API...";
    loader.style.display = 'block';
    resultSection.style.display = 'none';

    try {
        const response = await fetch('/api/fetch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlInput })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('videoThumbnail').src = data.thumbnail;
            document.getElementById('videoTitle').innerText = data.title;
            document.getElementById('channelName').innerHTML = `<i class="fa-solid fa-circle-check"></i> ${data.channel}`;
            document.getElementById('viewCount').innerText = data.views;
            document.getElementById('videoDuration').innerText = data.duration;
            document.getElementById('uploadDate').innerText = data.upload_date;

            loader.style.display = 'none';
            resultSection.style.display = 'block';
            showToast('Video processed successfully!');
        } else {
            throw new Error(data.detail || 'Failed to process video link.');
        }
    } catch (error) {
        loader.style.display = 'none';
        showToast('Error: ' + error.message);
    }
}

async function triggerDownload(type, quality) {
    const urlInput = document.getElementById('videoUrl').value.trim();
    showToast(`Generating direct ${type.toUpperCase()} stream (${quality})...`);

    try {
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: urlInput,
                type: type,
                quality: quality
            })
        });

        const data = await response.json();

        if (response.ok && data.download_url) {
            showToast(`Starting download for ${type.toUpperCase()} (${quality})`);
            
            const tempAnchor = document.createElement('a');
            tempAnchor.href = data.download_url;
            tempAnchor.target = '_blank';
            tempAnchor.download = data.filename || `download.${type === 'video' ? 'mp4' : 'mp3'}`;
            document.body.appendChild(tempAnchor);
            tempAnchor.click();
            document.body.removeChild(tempAnchor);
        } else {
            throw new Error(data.detail || 'Extraction failed.');
        }
    } catch (error) {
        showToast('Download Error: ' + error.message);
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3500);
}
