import useSWR from 'swr';
import { useEffect, useState } from "react";
import Layout from '../../../components/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useCep (cep) {
  const { data, error, isLoading } = useSWR(`https://brasilapi.com.br/api/cep/v1/${cep}`, fetcher)
 
  return {
    cepInfo: data,
    isLoading,
    isError: error
  }
}

function CepInfo({Cep}) {

    if (!Cep) return <p>Preencha o CEP</p>;

    const { cepInfo, isError, isLoading } = useCep(Cep);
  
    if (isError) return <p>An error occurred</p>;
    if (isLoading) return <p>Loading</p>;

    return (
        <>
        {cepInfo && (
            <div>
                <p>CEP: {cepInfo.cep}</p>
                <p>Estado: {cepInfo.state}</p>
                <p>Cidade: {cepInfo.city}</p>
                <p>Bairro: {cepInfo.neighborhood}</p>
                <p>Rua: {cepInfo.street}</p>
                <p>Fonte: {cepInfo.service}</p>
            </div>
        )}
        </>
    )
}

export default function Index({value}) {

    const [cep, setCep] = useState("35604-000");           
    const router = useRouter();

    function handlerClick(){
        
        router.push(`/testes/cep/${cep}`);
    } 

    return (
        <Layout>        
            <input type="text" onChange={(e)=> setCep(e.target.value)}/>
            <button onClick={handlerClick}>Buscar Cep</button>            
            <CepInfo Cep={value}/>
        </Layout>
    );
}