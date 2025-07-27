import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import MainBanner from '../components/MainBanner'
import Features from '../components/Features'
import Faqs from '../components/Faqs'

export default function Home() {

    const location = useLocation();

    useEffect(() => {
        const scrollToId = location.hash?.replace('#', '');
        if (scrollToId) {
            const el = document.getElementById(scrollToId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <>
            <section>
                <MainBanner />
            </section>
            <section id="features">
                <Features />
            </section>
            <section id="faqs">
                <Faqs />
            </section>
        </>
    )
}
