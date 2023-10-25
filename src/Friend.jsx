import React from "react";
import { AvatarGenerator } from 'random-avatar-generator';

export function Friend({ hash, name, nightLight }){
    const generator = new AvatarGenerator();
    return (
        <div className="flex gap-2 py-1 px-3 font-epilogue">
            <img src={generator.generateRandomAvatar(hash)} className="w-8" alt="" />
            <div className="flex flex-col">
                <p className="flex text-[18px]">{name}</p>
                <p className="text-gray-600 text-[8px] ">{hash.slice(0, 20) + "......."}
                </p>
            </div>
        </div>
    )
}