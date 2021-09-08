import Plyr from 'plyr';

(function () {
    const videos = document.querySelectorAll('.video-player') || [];
    const videoModalsIframe = document.querySelectorAll('.modal-video') || [];
    let currentModalPlyr;

    // Handle playback of videos inside Bootstrap Modal
    const playVideoInsideModal = (event, modal) => {
        const value = event && event.relatedTarget && event.relatedTarget.dataset && event.relatedTarget.dataset.pixrVideoIframe ? event.relatedTarget.dataset.pixrVideoIframe : false;
        const plyr = modal.querySelector('.modal-video-player');

        if ( value && plyr) {
            setIframeSRCValue({ modal, value });

            const options = event.relatedTarget.dataset.plyr ? JSON.parse(event.relatedTarget.dataset.plyr) : {};
            currentModalPlyr = new Plyr(plyr, options);
        }
    }

    // update SRC value for iframe inside Youtube and Vimeo modals
    const setIframeSRCValue = ({ modal, value = '' }) => {
        const iframe = modal.querySelector('iframe');
        if (iframe) {
            iframe.src = value;
        }
    }

    videos.forEach((video) => {
        const options = video.dataset.plyr ? JSON.parse(video.dataset.plyr) : {};
        const player = new Plyr(video, options);
    });

    videoModalsIframe.forEach((modal) => {
        modal.addEventListener('show.bs.modal', function(event) {
            playVideoInsideModal(event, modal);
        });

        modal.addEventListener('hide.bs.modal', function(event) {
            currentModalPlyr.destroy();
        });

        modal.addEventListener('hidden.bs.modal', function(event) {
            setIframeSRCValue({ modal });
        });
    });
})();