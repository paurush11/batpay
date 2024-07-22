"use client";
import Link from "next/link";
import { cn } from "../../lib/utils";
import EmailMe from "./EmailMe";
import IconsSection from "./IconsSection";
const sections = [
    {
        title: "Solutions",
        items: ["Marketing", "Analytics", "Commerce", "Data", "Cloud"],
    },
    {
        title: "Support",
        items: ["Pricing", "Documentation", "Guides", "API Status"],
    },
    {
        title: "Company",
        items: ["About", "Blog", "Jobs", "Press", "Partners"],
    },
    {
        title: "Legal",
        items: ["Claims", "Privacy", "Terms", "Policies", "Conditions"],
    },
];



const Footer = () => {

    return (
        <div className="w-full bg-primary-foreground ">
            <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-6 " >
                {sections.map((section, index) => (
                    <div key={index}>
                        <h6 className="font-bold uppercase py-4 px-10 text-xl">{section.title}</h6>
                        <ul>
                            {section.items.map((item, i) => (
                                <li key={i} className={cn("py-2 text-gray-500 px-10",)} style={{
                                    color: "rgb(107 114 128 / var(--tw-text-opacity))"
                                }}>
                                    <Link href={"/"} key={i}>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <EmailMe />

            </div>

            <IconsSection />
        </div>
    );
};

export default Footer;