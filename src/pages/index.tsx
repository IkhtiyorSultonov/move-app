import Modal from "src/components/modal/modal";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { Header, Hero, Row } from "src/components";
import { AuthContext } from "src/context/auth.context";
import { IMove } from "src/interfaces/app.interfaces";
import { API_REQUEST } from "src/services/api.services";
import { useInfoStore } from "src/store";


export default function Home({
  tranding,
  topRated,
  TvTopRated,
  popular,
  cartoon,
  horor,
}: HomeProps): JSX.Element {
  // console.log(topRated);
  const {modal}=useInfoStore();
  const { isLoading } = useContext(AuthContext);
        if(isLoading)return <>{null}</>;

  // useEffect(()=>{
  //   fetch(API_REQUEST.trending)
  //   .then(res=>res.json())
  //   .then(data=>console.log(data)
  //   ).catch(data=>console.log('api xato')
  //   );

  // },[])

  return (
    <div className={`relative min-h-screen${modal&& "!h-screen overflow-hidden"}`}>
      <Head>
        <title>Home-MoveApp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg " />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Hero tranding={tranding} />
        <section>
          <Row title="Top Rated" movies={topRated} />
          <Row title="TV Show" movies={TvTopRated} isBig={true} />
          <Row title="Popuar" movies={popular} />
          <Row title="Cartoon" movies={cartoon} isBig={true} />
          <Row title="Horor" movies={horor} />
        </section>
      </main>
      {modal && <Modal/>}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {

  const [tranding,topRated,TvTopRated,popular,cartoon,horor]= await Promise.all([
    fetch(API_REQUEST.trending).then((res) => res.json()),
    fetch(API_REQUEST.top_rtted).then((res) => res.json()),
    fetch(API_REQUEST.tv_top_rated).then((res) =>res.json()),
    fetch(API_REQUEST.popular).then((res) => res.json()),
    fetch(API_REQUEST.cartoon).then((res) => res.json()),
    fetch(API_REQUEST.horor).then((res) => res.json())


  ]);
  // const tranding = await fetch(API_REQUEST.trending).then((res) => res.json());
  // const topRated = await fetch(API_REQUEST.top_rtted).then((res) => res.json());
  // const TvTopRated = await fetch(API_REQUEST.tv_top_rated).then((res) =>
  //   res.json()
  // );
  // const popular = await fetch(API_REQUEST.popular).then((res) => res.json());
  // const cartoon = await fetch(API_REQUEST.cartoon).then((res) => res.json());
  // const horor = await fetch(API_REQUEST.horor).then((res) => res.json());

  // if(tranding.results.length)
  // {
  //   //1
  //   return {
  //   //  redirect:{
  //   //   destination:"/account",
  //   //  }
  //   //2
  //     notFound:true
  //   }
  // }

  return {
    props: {
      tranding: tranding.results,
      topRated: topRated.results,
      TvTopRated: TvTopRated.results,
      popular: popular.results,
      cartoon: cartoon.results,
      horor: horor.results,
    },
  };
};

interface HomeProps {
  tranding: IMove[];
  topRated: IMove[];
  TvTopRated: IMove[];
  popular: IMove[];
  cartoon: IMove[];
  horor: IMove[];
}
