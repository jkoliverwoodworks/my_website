import Link from "next/link";
import { Header, Footer } from "@/components/site-chrome";

export default function NotFound() {
  return <><Header /><main id="main-content" className="not-found section-pad"><span className="eyebrow">404 / A little off the path</span><h1 className="not-found-title">Let’s find your way home.</h1><p>That page isn’t here. There’s still plenty of beautiful work to explore.</p><Link className="button button-dark" href="/work">Explore our work <span aria-hidden="true">↗</span></Link></main><Footer /></>;
}
