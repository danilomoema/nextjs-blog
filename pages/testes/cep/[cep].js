import { useRouter } from 'next/router';
import Index from '.';

export default function Cep() {

    
    const { query } = useRouter();       

    return <Index value={query.cep}/>;
}