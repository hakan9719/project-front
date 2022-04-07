import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Api Restaurant</title>
        <meta name="description" content="Api Restaurant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(https://api.lorem.space/image/fashion?w=1000&h=800)`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div className="flex gap-2 justify-center">
              <Link href="/commandes" className="btn btn-primary">
                <a className="btn btn-primary">Commander</a>
              </Link>
              <Link href="/reservations" className="btn btn-primary">
                <a className="btn btn-primary">Reserver</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
