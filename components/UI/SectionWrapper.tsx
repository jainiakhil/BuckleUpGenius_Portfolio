import React, { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className = '', id }) => {
  return (
    <section id={id} className={`relative w-full py-20 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden snap-start snap-always ${className}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;