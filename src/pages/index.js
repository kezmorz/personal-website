import Typography from "@mui/material/Typography";
import Layout from "@/components/Layout";

const Home = () => {
  return (
    <div>
      <Typography variant="h1">Hello</Typography>
    </div>
  );
};

Home.getLayout = (page) => {
  return (
    <Layout>
      <main>{page}</main>
    </Layout>
  );
};

export default Home;
