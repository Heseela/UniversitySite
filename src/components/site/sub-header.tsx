import { Mail, Phone } from 'lucide-react';
import React from 'react';

interface CompanyInfo {
    phones: string[];
    emails: string[];
    highlightAnnouncement?: string;
}

interface SubHeaderProps {
    siteData: CompanyInfo;
}

function SubHeader({ siteData }: SubHeaderProps) {
    const phoneNumbers = siteData?.phones || [];
    const emailAddresses = siteData?.emails || [];
    const announcement = siteData?.highlightAnnouncement;

    return (
        <div className="bg-primary text-white">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 py-3">
                {/* Announcement Section */}
                <div className="flex items-center overflow-hidden whitespace-nowrap flex-1 mr-4 w-full">
                    <span className="bg-pinkish font-bold mr-4 text-base px-4 py-2 rounded-full text-white">
                        ANNOUNCEMENT
                    </span>
                    <div className="relative w-full max-w-[500px] overflow-hidden">
                        <div className="animate-marquee inline-block whitespace-nowrap text-sm font-medium">
                            {announcement}
                        </div>
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:flex items-center gap-4 text-sm">
                    <div className="font-semibold flex items-center gap-2">
                        <Phone size={16} />
                        <div className="flex gap-1">
                            {phoneNumbers.length > 0 ? (
                                phoneNumbers.map((number, index) => (
                                    <React.Fragment key={index}>
                                        <span>{number}</span>
                                        {index < phoneNumbers.length - 1 && <span>,</span>}
                                    </React.Fragment>
                                ))
                            ) : (
                                <span>Contact Us</span>
                            )}
                        </div>
                    </div>

                    <div className="font-semibold flex items-center gap-2">
                        <Mail size={16} />
                        <div className="flex gap-1">
                            {emailAddresses.length > 0 ? (
                                emailAddresses.map((email, index) => (
                                    <React.Fragment key={index}>
                                        <span>{email}</span>
                                        {index < emailAddresses.length - 1 && <span>,</span>}
                                    </React.Fragment>
                                ))
                            ) : (
                                <span>Email Us</span>
                            )}
                        </div>
                    </div>

                    {/* <Link href="/student-login">
                        <button className="flex gap-2 bg-[var(--pinkish)] hover:bg-pink-400 text-white px-6 py-2 rounded-full font-medium transition duration-300">
                            <Lock size={16} />
                            <span>Portal Login</span>
                        </button>
                    </Link> */}
                </div>
            </div>
        </div>
    );
}

export default SubHeader;