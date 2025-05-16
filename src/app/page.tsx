import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SUPABASE_URL } from "@/constants";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-[#F8F1E7] relative">
      {/* Name at the top, left-aligned */}
      <div className="text-left w-full max-w-xs mb-6">
        <h1 className="uppercase text-2xl font-mono tracking-wide text-black">
          <a href="https://github.com/elios-cama" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            ELIOS CAMA
          </a>
        </h1>
      </div>

      {/* Images in a grid-like layout with increased sizes */}
      <div className="relative w-full max-w-xs mx-auto h-[520px]">
        {/* Image 1 - Tadz */}
        <Link href="/tada" className="absolute left-[5%] top-[8%] group z-10">
          <div className="transition-transform duration-300 group-hover:scale-110 transform rotate-[-5deg] relative">
            <div className="relative">
              {/* Regular Tadz (shown by default) */}
              <Image
                src={`${SUPABASE_URL}/images/homepage/tada_off.png`}
                alt="Tadz"
                width={130}
                height={130}
                className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] object-contain transition-opacity duration-300 group-hover:opacity-0"
                priority
              />
              {/* Alternative Tadz (shown on hover) */}
              <Image
                src={`${SUPABASE_URL}/images/homepage/tada_on.png`}
                alt="Tada Alternative"
                width={130}
                height={130}
                className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] object-contain absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                priority
              />
            </div>
            <span className="absolute top-0 right-2 text-xs font-mono text-black">01</span>
          </div>
        </Link>

        {/* Image 2 - Loralab */}
        <Link href="/loralab" className="absolute right-[3%] top-[5%] group z-10">
          <div className="transition-transform duration-300 group-hover:scale-110 transform rotate-[7deg] relative">
            <div className="relative">
              {/* Regular Loralab (shown by default) */}
              <Image
                src={`${SUPABASE_URL}/images/homepage/loralab_off.png`}
                alt="Loralab"
                width={115}
                height={115}
                className="w-[95px] h-[95px] sm:w-[115px] sm:h-[115px] object-contain transition-opacity duration-300 group-hover:opacity-0"
                priority
              />
              {/* Duplicates Loralab (shown on hover) */}
              <Image
                src={`${SUPABASE_URL}/images/homepage/loralab_on.png`}
                alt="Loralab Duplicates"
                width={115}
                height={115}
                className="w-[95px] h-[95px] sm:w-[115px] sm:h-[115px] object-contain absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                priority
              />
            </div>
            <span className="absolute top-0 right-2 text-xs font-mono text-black">02</span>
          </div>
        </Link>

        {/* Image 3 - Twitter */}
        <Link href="https://x.com/eli__cama" target="_blank" rel="noopener noreferrer" className="absolute left-[2%] top-[38%] group z-10">
          <div className="transition-transform duration-300 group-hover:scale-110 transform rotate-[-8deg] relative">
            <div className="relative">
              {/* Regular Twitter (shown by default) */}
              <Image
                src={`${SUPABASE_URL}/images/homepage/twitter_off.png`}
                alt="Twitter"
                width={105}
                height={105}
                className="w-[85px] h-[85px] sm:w-[105px] sm:h-[105px] object-contain transition-opacity duration-300 group-hover:opacity-0"
                priority
              />
              {/* Angry Bird Twitter (shown on hover) */}
              <Image
                src={`${SUPABASE_URL}/images/homepage/twitter_on.png`}
                alt="Angry Bird"
                width={105}
                height={105}
                className="w-[85px] h-[85px] sm:w-[105px] sm:h-[105px] object-contain absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                priority
              />
            </div>
            <span className="absolute top-0 right-2 text-xs font-mono text-black">03</span>
          </div>
        </Link>

        {/* Image 4 - LinkedIn */}
        <Link href="https://www.linkedin.com/in/elios-cama/" target="_blank" rel="noopener noreferrer" className="absolute right-[4%] top-[35%] group z-10">
          <div className="transition-transform duration-300 group-hover:scale-110 transform rotate-[6deg] relative">
            <div className="relative">
              {/* Regular Elios (shown by default) */}
              <Image
                src={`${SUPABASE_URL}/images/homepage/elios_off.png`}
                alt="Elios"
                width={125}
                height={125}
                className="w-[105px] h-[105px] sm:w-[125px] sm:h-[125px] object-contain transition-opacity duration-300 group-hover:opacity-0"
                priority
              />
              {/* LinkedIn Elios (shown on hover) */}
              <Image
                src={`${SUPABASE_URL}/images/homepage/elios_on.png`}
                alt="Elios LinkedIn"
                width={125}
                height={125}
                className="w-[105px] h-[105px] sm:w-[125px] sm:h-[125px] object-contain absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                priority
              />
            </div>
            <span className="absolute top-0 right-2 text-xs font-mono text-black">04</span>
          </div>
        </Link>

        {/* Image 5 - Backpack with hover animation */}
        <Link href="/backpack" className="absolute left-[5%] bottom-[6%] group z-10">
          <div className="transition-transform duration-300 group-hover:scale-110 transform rotate-[-4deg] relative">
            <div className="relative">
              {/* Closed backpack (shown by default) */}
              <Image
                src={`${SUPABASE_URL}/images/homepage/backpack_off.png`}
                alt="Backpack"
                width={140}
                height={140}
                className="w-[115px] h-[115px] sm:w-[140px] sm:h-[140px] object-contain transition-opacity duration-300 group-hover:opacity-0"
                priority
              />
              {/* Open backpack (shown on hover) */}
              <Image
                src={`${SUPABASE_URL}/images/homepage/backpack_on.png`}
                alt="Backpack Opened"
                width={140}
                height={140}
                className="w-[115px] h-[115px] sm:w-[140px] sm:h-[140px] object-contain absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                priority
              />
            </div>
            <span className="absolute top-0 right-2 text-xs font-mono text-black">05</span>
          </div>
        </Link>

        {/* Image 6 - Brain */}
        <Link href="/inspirations" className="absolute right-[5%] bottom-[8%] group z-10">
          <div className="transition-transform duration-300 group-hover:scale-110 transform rotate-[5deg] relative">
            <div className="relative">
              {/* Regular Brain (shown by default) */}
              <Image
                src={`${SUPABASE_URL}/images/homepage/brain_off.png`}
                alt="Brain"
                width={110}
                height={110}
                className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] object-contain transition-opacity duration-300 group-hover:opacity-0"
                priority
              />
              {/* Brain Explosion (shown on hover) */}
              <Image
                src={`${SUPABASE_URL}/images/homepage/brain_on.png`}
                alt="Brain Explosion"
                width={110}
                height={110}
                className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] object-contain absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                priority
              />
            </div>
            <span className="absolute top-0 right-2 text-xs font-mono text-black">06</span>
          </div>
        </Link>
      </div>

      {/* Links at the bottom on two lines */}
      <div className="absolute bottom-8 text-center font-mono text-xs text-black">
        <div className="mb-2">
          <Link href="/tada" className="hover:underline text-black">(01) ta-da</Link> {" "}
          <Link href="/loralab" className="hover:underline text-black">(02) loralab</Link> {" "}
          <a href="https://x.com/eli__cama" target="_blank" rel="noopener noreferrer" className="hover:underline text-black">(03) twitter</a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/elios-cama/" target="_blank" rel="noopener noreferrer" className="hover:underline text-black">(04) linkedin</a> {" "}
          <Link href="/backpack" className="hover:underline text-black">(05) backpack</Link> {" "}
          <Link href="/inspirations" className="hover:underline text-black">(06) inspirations</Link>
        </div>
      </div>
    </main>
  );
}
