"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="mx-auto w-1/2">
      <DotLottieReact src="/Animation - 1735390896186.lottie" loop autoplay />
      <main className="text-center">
        <h2>Fant ikke siden du ser etter...</h2>
        <p>
          Go tilbake til{" "}
          <Link href="/">
            <strong>Dashbord</strong>
          </Link>
        </p>
      </main>
    </div>
  );
}
