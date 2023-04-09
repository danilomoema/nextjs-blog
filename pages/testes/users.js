import useSWR from 'swr';
import Layout from '../../components/layout';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useUsers () {
  const { data, error, isLoading } = useSWR("https://jsonplaceholder.typicode.com/users", fetcher)
 
  return {
    users: data,
    isLoading,
    isError: error
  }
}

function Contact({
    name = "Steve Jobs",
    email = "steve@apple.com",
    tagline = "Stay hungry, stay foolish",
  }) {
    return (
      <div className="contact">
        <h5 className="contact__name">{name}</h5>
        <h6 className="contact__email">{email}</h6>
        <p className="contact__tagline">{tagline}</p>
      </div>
    );
  }

  export default function Users() {
    const { users, isError, isLoading } = useUsers();
  
  if (isError) return <p>An error occurred</p>;
  if (isLoading) return <p>Loading</p>;

  return (
    <Layout>
    <p>Teste aqui</p>
      {users.map(({ id, name, email, company }) => (
        <Contact
          key={id}
          name={name}
          email={email}
          tagline={company.catchPhrase}
        />
      ))}       
     </Layout>
  );
}