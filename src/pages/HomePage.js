import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Pagination,
  PaginationItem,
  TextField,
  Stack,
  Link,
} from "@mui/material";

const BASE_URL = "http://hn.algolia.com/api/v1/search?";

const HomePage = (props) => {
  const [post, setPost] = useState([]);
  const [query, setQuery] = useState("react");
  const [page, setPage] = useState(
    parseInt(props.location.search?.split("=")[1] || 1)
  );
  const [pageQty, setPageQty] = useState(0);

  useEffect(() => {
    axios.get(`${BASE_URL}query=${query}&page=${page - 1}`).then(({ data }) => {
      setPost(data.hits);
      setPageQty(data.nbPages);

      if (data.nbPages < page) {
        setPage(1);
        props.history.replace("/");
      }
    });
  }, [query, page, props.history]);
  return (
    <>
      <TextField
        fullWidth
        label="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Stack spacing={2}>
        {!!pageQty && (
          <Pagination
            count={pageQty}
            page={page}
            onChange={(_, number) => setPage(number)}
            showFirstButton
            showLastButton
            sx={{ marginY: 3, marginX: "auto" }}
            renderItem={(item) => (
              <PaginationItem
                component={NavLink}
                to={`/?page=${item.page}`}
                {...item}
              />
            )}
          />
        )}

        {post.map(({ objectID, url, title, story_title }) => (
          <Link key={objectID} href={url}>
            {title || story_title}
          </Link>
        ))}
      </Stack>
    </>
  );
};

export default HomePage;
