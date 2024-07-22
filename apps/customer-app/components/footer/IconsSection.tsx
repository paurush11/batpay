import { Button } from '@repo/ui';
import React from 'react'
import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaTwitter,
    FaLinkedin
} from "react-icons/fa";
const IconsSection = () => {
    const items = [
        { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
        { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
        { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
        { name: "LinkedIn", icon: FaLinkedin, link: "https://www.linkedin.com/in/pbatish/" },
        { name: "Github", icon: FaGithub, link: "https://github.com/paurush11" },
    ];

    return (
        <div className="flex flex-col p-20 text-center">
            <p className="py-4">2022 Workflow, LLC. All rights reserved</p>
            <div className="flex justify-between  pt-4 text-4xl px-8">
                {items.map((x, index) => {
                    return <Button key={index} variant={"ghost"} size={"icon"} onClick={() => {
                        window.open(x.link, "_blank");
                    }}>
                        <x.icon className="w-6 h-6" />
                    </Button>
                })}
            </div>
        </div>
    )
}

export default IconsSection
