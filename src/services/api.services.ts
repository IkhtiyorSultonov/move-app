const base_url=process.env.NEXT_PUBLIC_API_DOMAIN as string;
const base_key=process.env.NEXT_PUBLIC_API_KEY as string;

export const  API_REQUEST={
    trending:`${base_url}/trending/all/week?api_key=${base_key}&language=en-US`,
    top_rtted:`${base_url}/movie/top_rated?api_key=${base_key}&language=en-US`,
    tv_top_rated:`${base_url}/tv/top_rated?api_key=${base_key}&language=en-US`,
    popular:`${base_url}/movie/popular?api_key=${base_key}&language=en-US`,
    cartoon:`${base_url}/discover/movie?api_key=${base_key}&language=en-US&with_genres=16`,
    horor:`${base_url}/discover/movie?api_key=${base_key}&language=en-US&with_genres=27`,
   
};



