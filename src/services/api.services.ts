const base_url=process.env.NEXT_PUBLIC_API_DOMAIN as string;
const base_key=process.env.NEXT_PUBLIC_API_KEY as string;

export const  API_REQUEST={
    trending:`${base_url}/trending/all/week?api_key=${base_key}&language=en-US`,
};