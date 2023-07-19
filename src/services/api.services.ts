const base_url=process.env.NEXT_PUBLIC_API_DOMAIN as string;
const base_key=process.env.NEXT_PUBLIC_API_KEY as string;
const public_domin=process.env.NEXT_PUBLIC_DOMAIN as string
export const  API_REQUEST={
    trending:`${base_url}/trending/all/week?api_key=${base_key}&language=en-US`,
    top_rtted:`${base_url}/movie/top_rated?api_key=${base_key}&language=en-US`,
    tv_top_rated:`${base_url}/tv/top_rated?api_key=${base_key}&language=en-US`,
    popular:`${base_url}/movie/popular?api_key=${base_key}&language=en-US`,
    cartoon:`${base_url}/discover/movie?api_key=${base_key}&language=en-US&with_genres=16`,
    horor:`${base_url}/discover/movie?api_key=${base_key}&language=en-US&with_genres=27`,
    history: `${base_url}/discover/movie?api_key=${base_key}&language=en-US&with_genres=36`,
    family: `${base_url}/discover/movie?api_key=${base_key}&language=en-US&with_genres=10751`,
   products_list:`${public_domin}/api/products`,
   subscraption:`${public_domin}/api/subscraption`
};



