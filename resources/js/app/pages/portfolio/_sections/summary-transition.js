export const PORTRAIT_IMAGE = '/images/mark-harvey-leduna.png';

// Progress values (0–1) across the pinned #summary-track scroll distance.
export const SUMMARY_TIMELINE = {
    breakApart: [0, 0.12],
    assemble: [0.04, 0.6],
    photoIn: [0.56, 0.68],
    particlesOut: [0.64, 0.74],
    revealText: 0.76,
};

export function getSummaryTransition() {
    const track = document.querySelector('#summary-track');
    if (!track) return { flight: 0, assemble: 0 };

    const scrollY = window.scrollY;
    const trackTop = track.getBoundingClientRect().top + scrollY;
    const pinDistance = track.offsetHeight - window.innerHeight;
    const flight = Math.min(1, Math.max(0, scrollY / Math.max(1, trackTop)));
    const assemble = pinDistance > 1
        ? Math.min(1, Math.max(0, (scrollY - trackTop) / pinDistance))
        : Number(flight >= 1);

    return { flight, assemble };
}

// Anchor navigation lands after the portrait has assembled, not at the start of the pin.
export function scrollToSummary() {
    const track = document.querySelector('#summary-track');
    const pinDistance = track ? track.offsetHeight - window.innerHeight : 0;
    if (!track || pinDistance <= 1) {
        document.querySelector('#summary')?.scrollIntoView({ behavior: 'smooth' });
        return;
    }

    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
        top: trackTop + pinDistance * Math.min(1, SUMMARY_TIMELINE.revealText + 0.06),
        behavior: 'smooth',
    });
}
