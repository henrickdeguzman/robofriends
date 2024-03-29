export const SearchBox = ({ searchChange }) => {
    return (
        <div className="pa2">
            <input
                className="pa3 ba b-light-blue"
                type="search"
                placeholder="Search robots"
                onChange={searchChange}>
            </input>
        </div>
    );
}