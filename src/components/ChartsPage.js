import { QueryClient, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

async function fetchWorldData() {
  const response = await fetch('https://disease.sh/v3/covid-19/all');
  const data = await response.json();
  return data;
}

async function fetchCountryData() {
  const response = await fetch('https://disease.sh/v3/covid-19/countries');
  const data = await response.json();
  return data;
}

async function fetchGraphData() {
  const response = await fetch(
    'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
  );
  const data = await response.json();
  return data;
}


const ChartsPage = () => {
    const worldDataQuery = useQuery('worldData', fetchWorldData);
    const countryDataQuery = useQuery('countryData', fetchCountryData);
    const graphDataQuery = useQuery('graphData', fetchGraphData);
  
    if (worldDataQuery.isLoading || countryDataQuery.isLoading || graphDataQuery.isLoading) {
      return <div>Loading...</div>;
    }
  
    if (worldDataQuery.isError || countryDataQuery.isError || graphDataQuery.isError) {
      return <div>Error fetching data</div>;
    }
  
    const worldData = worldDataQuery.data;
    const countryData = countryDataQuery.data;
    const graphData = graphDataQuery.data;
    console.log(worldData, countryData, graphData);
    return(
        <div>
            <h1>ChartsPage</h1>
            <ReactQueryDevtools initialIsOpen={false} />
        </div>
    )
}

export default ChartsPage;