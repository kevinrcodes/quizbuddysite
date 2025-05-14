// TODO add this section
// step 1: take screenshot (show initial app state)
// step 2: hit solve (show screenshot in queue)
// step 3: pick the right answer (show answer and explanation)

import { useEffect } from 'react';
import styles from './HowTo.module.css';
import { useVideoIntersection } from '../hooks/useVideoIntersection';

export default function HowTo() {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const videoRef1 = useVideoIntersection();
    const videoRef2 = useVideoIntersection();
    const videoRef3 = useVideoIntersection();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll(`.${styles.step}`).forEach(
            step => observer.observe(step)
        );

        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.howTo}>
            <div className={styles.container}>
                <div className={styles.steps}>
                    <div className={styles.step}>
                        <div className={styles.content}>
                            <h3 className={styles.stepTitle}>Take a Screenshot</h3>
                            <p className={styles.description}>
                                Simply take a screenshot of your quiz question. If the question is long, you may take multiple screenshots to capture the entire question.
                            </p>
                        </div>

                        <div className={styles.timeline}>
                            <div className={styles.timelineNumber}>1</div>
                        </div>

                        <div className={styles.imageContainer}>
                            <video
                                ref={videoRef1}
                                src={`https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto/v1/takescreenshot_elg5xv`}
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                loading="lazy"
                                className={styles.image}
                            />
                        </div>
                    </div>

                    <div className={styles.step}>
                        <div className={styles.imageContainer}>
                            <video
                                ref={videoRef2}
                                src={`https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto/v1/screenshot_s2ed6j`}
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                loading="lazy"
                                className={styles.image}
                            />
                        </div>

                        <div className={styles.timeline}>
                            <div className={styles.timelineNumber}>2</div>
                        </div>

                        <div className={styles.content}>
                            <h3 className={styles.stepTitle}>Hit Solve</h3>
                            <p className={styles.description}>
                                Click the solve button and watch as your question is analyzed. We process it automatically, preparing a detailed solution.
                            </p>
                        </div>
                    </div>

                    <div className={styles.step}>
                        <div className={styles.content}>
                            <h3 className={styles.stepTitle}>Get Your Answer</h3>
                            <p className={styles.description}>
                                Review the provided answer and explanation. We give you not just the solution, but also helps you understand the reasoning behind it.
                            </p>
                        </div>

                        <div className={styles.timeline}>
                            <div className={styles.timelineNumber}>3</div>
                        </div>

                        <div className={styles.imageContainer}>
                            <video
                                ref={videoRef3}
                                src={`https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto/v1/answer_g9mkgi`}
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                loading="lazy"
                                className={styles.image}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
