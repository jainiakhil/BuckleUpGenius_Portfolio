import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SubmitRocket from './SubmitRocket';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: 'Graphic Designing',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;
        setIsSubmitting(true);
    };

    const handleAnimationComplete = () => {
        setIsSubmitting(false);
        setIsSent(true);
        setFormData({ name: '', email: '', projectType: 'Graphic Designing', message: '' });
    };

    const inputBase = "w-full bg-white text-ink-black border-4 border-black px-3 py-2 font-bold text-base outline-none transition-all placeholder:text-gray-400";
    const focusStyle = "focus:shadow-[4px_4px_0px_#FACC15] focus:-translate-y-0.5 focus:-translate-x-0.5";

    return (
        <div className="relative bg-white p-5 border-4 border-black shadow-[8px_8px_0px_#000000] w-full max-w-lg mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500">
            {/* Comic Header Badge */}
            <div className="absolute -top-5 -left-3 bg-comic-yellow border-4 border-black px-3 py-0.5 -rotate-2 shadow-[2px_2px_0px_#000] z-20">
                <span className="font-sans font-black uppercase text-xs tracking-widest">Secure Line</span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-1">

                {/* Row 1: Name & Email */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                        <label className="font-sans font-black uppercase text-xs mb-1 block tracking-wider">Identity</label>
                        <input
                            type="text"
                            placeholder="Name"
                            className={`${inputBase} ${focusStyle}`}
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            disabled={isSubmitting || isSent}
                        />
                    </div>

                    <div className="w-full">
                        <label className="font-sans font-black uppercase text-xs mb-1 block tracking-wider">Frequency</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className={`${inputBase} ${focusStyle}`}
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            disabled={isSubmitting || isSent}
                        />
                    </div>
                </div>

                {/* Type */}
                <div>
                    <label className="font-sans font-black uppercase text-xs mb-1 block tracking-wider">Mission</label>
                    <div className="relative">
                        <select
                            className={`${inputBase} ${focusStyle} appearance-none pr-10`}
                            value={formData.projectType}
                            onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                            disabled={isSubmitting || isSent}
                        >
                            <option>Graphic Designing</option>
                            <option>Video Editing</option>
                            <option>Web Designing</option>
                            <option>Content Writing</option>
                            <option>Copyediting</option>
                            <option>Coding</option>
                            <option>Other</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-black stroke-[3]" />
                    </div>
                </div>

                {/* Message */}
                <div>
                    <label className="font-sans font-black uppercase text-xs mb-1 block tracking-wider">Objectives</label>
                    <textarea
                        rows={3}
                        placeholder="Briefing details..."
                        className={`${inputBase} ${focusStyle} resize-none`}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        disabled={isSubmitting || isSent}
                    />
                </div>

                <div className="pt-1">
                    <SubmitRocket isSubmitting={isSubmitting} onAnimationComplete={handleAnimationComplete} />
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
