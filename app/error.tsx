"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="section-pad"><h1>A brief pause.</h1><p>The website content is temporarily unavailable. Please try again shortly.</p><button className="button" onClick={reset}>Try again</button><p><a href="mailto:jeremyoliver@att.net">Contact Jeremy directly</a></p></main>;
}
