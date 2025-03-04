function downloadVideo(quality = 'HD') {
    const videoUrl = document.getElementById('videoUrl').value;
    const isHD = quality === 'HD';
    const apiUrl = `https://delirius-apiofc.vercel.app/download/facebook?url=${videoUrl}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.urls) {
                const hdUrl = data.urls["0"].hd;
                const sdUrl = data.urls["1"].sd;
                const downloadUrl = isHD ? hdUrl : sdUrl;

                // Create a temporary anchor element to initiate the download
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = `FBVideo_${quality}.mp4`; // Setting the desired file name
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                document.getElementById('downloadLink').innerText = `Downloading (${quality})...`;
            } else {
                document.getElementById('downloadLink').innerText = 'Failed to download video. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('downloadLink').innerText = 'Failed to download video. Please try again.';
        });
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('btnDownloadHD').addEventListener('click', () => downloadVideo('HD'));
    document.getElementById('btnDownloadSD').addEventListener('click', () => downloadVideo('SD'));
    // Auto-trigger HD download when URL is entered
    document.getElementById('videoUrl').addEventListener('input', () => downloadVideo('HD'));
});
