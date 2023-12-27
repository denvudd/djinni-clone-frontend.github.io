import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CandidateLayoutProps {
  children: React.ReactNode;
}

const CandidateLayout: React.FC<CandidateLayoutProps> = ({ children }) => (
  <>
    <Navbar />
    <main>
      <div className="container">{children}</div>
    </main>
    <Footer />
  </>
);

export default CandidateLayout;
