export async function getStaticProps(context) {
    return {
      redirect: {
        destination: '/redirecionamento/vocefoiredirecionado',
        permanent: true, // triggers 308
      },
    };
  }
  

  export default function SejaRedirecionado() {
    return <h1>Você vai ser redirecionado</h1>;
  }