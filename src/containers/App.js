import { Component } from "react";
import { CardList } from "../components/CardList";
import { SearchBox } from "../components/SearchBox";
import { Scroll } from "../components/Scroll";
import { ErrorBoundry } from "../components/ErrorBoundry";
import "./App.css";
import { connect } from "react-redux";
import { setSearchField, requestRobots } from "../actions";
import { constRobots } from "../components/robots";

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(class App extends Component {

    componentDidMount() {
        this.props.onRequestRobots();
    }

    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.concat(constRobots).filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        if (isPending) {
            return <h1>Loading</h1>
        }
        else {
            return (
                <div className="tc">
                    <h1 className="f1" >Robofriends</h1>
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            )
        }
    }
})