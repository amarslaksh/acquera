import { Component } from "react";
import axios from "axios";
import Resident from "./Resident";
import Pagination from "./Pagination";

class Planets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planets: [],
            residents: [],
            currentPage: 1,
            totalPages: 1
        }
    }

    componentDidMount() {
        this.getPlanetData();
    }    

    getPlanetData() {
        const URL = `https://swapi.dev/api/planets/?page=${this.state.currentPage}&format=json`;
        axios.get(URL).then(response => {

            const planets = response.data.results.map((planet, index) => {
                return {
                    ...planet,
                    id: index
                }
            });
            
            this.setState({
                planets: planets,
                totalPages: Math.ceil(response.data.count / 10) 
            });

        }).catch(error => {
            throw error;
        })
    }

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage }, () => {
            this.getPlanetData(); // Fetch data for the new page
        });
    }

    getResidentData(planet) {
        // Fetch resident data for the current planet
        const residents = planet.residents.map(residentURL => axios.get(residentURL));
        return Promise.all(residents)
            .then(axios.spread((...responses) => {
                const residentData = responses.map(response => response.data);
                console.log('Resident data:', residentData); // Log the fetched resident data
                console.log('state', this.state.planets);
                const updatedPlanets = this.state.planets.map(p => {

                    if (p === planet ) {
                        return { ...p, residents: residentData };
                    }
                    return p;
                });
                console.log('Updated planets:', updatedPlanets); // Log the updated planets state
                this.setState({ planets: updatedPlanets });
            }))
            .catch(error => {
                console.error('Error fetching resident data:', error);
            });
    }
    
    fetchNextPage = () => {
        const nextPage = this.state.currentPage + 1;
        this.setState({ currentPage: nextPage });
        this.getPlanetData(nextPage);
    };


    render() {
        const planets = this.state.planets.map(planet => {
            return (
                <div key={planet.id} className="mt-3 w-auto">
                    <div className="shadow border p-1 mx-3 min-h-40">
                        <div className="p-1 mx-1">
                            Planet Name: {planet.name}
                        </div >
                        <div className="p-1 mx-1">
                            Planet Climate: {planet.climate}
                        </div>
                        <div className="p-1 mx-1">
                            Planet Population: {planet.population}
                        </div>
                        <div className="p-1 mx-1">
                            Planet Terrain: {planet.terrain}
                        </div>
                        <div className="p-1 mx-1">
                        <h4>Planet Residents:</h4>
                        <Resident residents={planet.residents} />
                    </div>
                    </div>
                </div>
                
            )
        })
        return(
            <div>
                <div className="w-auto">
                    <div className="flex flex-wrap">{planets}</div>
                </div>
                <div>
                    <Pagination onPageChange={this.handlePageChange} />
                </div>
            </div>
        )
    }
}

export default Planets;