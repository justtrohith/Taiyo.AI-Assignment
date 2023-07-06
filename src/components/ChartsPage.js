import { QueryClient, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import LineChart from './LineChart';
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
        <>
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold my-4">COVID-19 Cases</h1>
              <LineChart data={graphData} />
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    )
}

export default ChartsPage;