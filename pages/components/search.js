import {
    Input,
    IconButton,
    InputGroup,
  } from "@chakra-ui/react";
  import { SearchIcon } from "@chakra-ui/icons";

 /**
 * search box component
 * searches for matching names
 * @return {object} SearchBox component
 */
const SearchBox = ({query, setQuery, handleSubmit }) => {
  
    return (
        <form onSubmit={handleSubmit} className="max-w-xs">
        <InputGroup pb="1rem">
            <Input
            placeholder="Search for Daturian ID"
            variant="ghost"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            onClick={handleSubmit}
            bg="black"
            color="white"
            />
        </InputGroup>
        </form>
    );
  };

export default SearchBox