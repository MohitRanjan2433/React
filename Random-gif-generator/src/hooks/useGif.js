import { useState } from "react";

const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

const useGif = (tag) => {
    const [gif, setGif] = useState('')
    const [loading, setLoading] = useState('false');

    
};

export default useGif;
